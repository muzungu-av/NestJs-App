import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Delete, Get } from "../../api/axiosInstance";
import DOMPurify from "dompurify";
import { message } from "antd";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const img = import.meta?.env?.VITE_API_IMAGE;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

type PicSectionProps = {
  uid: string;
  groupName: string;
  typeOfImage: string;
  miniImageUrl: string;
  description: string;
};

const handleDeleteClick = async (uid: string) => {
  const userAnswer = window.confirm("Do u want to delete?");

  if (userAnswer) {
    await Delete(url + img, "/" + uid, true);
    message.success("Successfully deleted");
  }
};

const PicSection: React.FC<PicSectionProps> = ({
  uid,
  typeOfImage,
  groupName,
  miniImageUrl,
  description,
}) => {
  const navigate = useNavigate();
  const sanitizedDescription = DOMPurify.sanitize(description); //безопасный текст, санитаризация
  return (
    <div className="flex justify-between gap-6 py-[5%]">
      <img src={miniImageUrl} className="" />
      <div
        className="w-1/2 text-xl"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      <div className="w-1/4 flex justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex gap-8 text-xl">
            <p>Auf Seite posten: </p>
            <div>
              <div className="flex items-center mb-4">
                <input
                  id={groupName + "_P"}
                  type="radio"
                  value=""
                  defaultChecked={typeOfImage === "isPainting"}
                  name={groupName}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-[#895c06] dark:focus:ring-[#895c06] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={groupName + "_P"}
                  className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                >
                  Gemälde
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id={groupName + "_A"}
                  type="radio"
                  value=""
                  name={groupName}
                  defaultChecked={typeOfImage === "isAtelier"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-[#895c06] dark:focus:ring-[#895c06] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={groupName + "_A"}
                  className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300"
                >
                  Atelier{" "}
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              className="btn-primary w-28"
              onClick={() => {
                navigate(`/edit_paint/${uid}`);
              }}
            >
              ändern {/*Change*/}
            </button>
            <button
              className="btn-primary w-28"
              onClick={() => handleDeleteClick(uid)}
            >
              löschen {/*delete*/}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchDataFromApi = async () => {
  try {
    const params = { fields: "uid,miniImageUrl,description,typeOfImage" };
    const response = await Get(undefined, url, img, false, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return null;
  }
};

export const Pictures = () => {
  const navigate = useNavigate();
  const handleAddNewClick = () => {
    navigate("/add_paint");
  };

  const [data, setData] = useState<PicSectionProps[] | null>(null);

  useEffect(() => {
    fetchDataFromApi().then((result) => setData(result));
  }, []);

  let j = 0;
  return (
    <MainLayout>
      <div className="px-[5%] pt-[2%]">
        <h3 className="font-italiana text-5xl">
          Liste der Bilder auf der Website
        </h3>

        <button className="btn-primary mt-10" onClick={handleAddNewClick}>
          Neues Bild hinzufügen +
        </button>

        {Array.isArray(data) &&
          data.map((item) => (
            <PicSection
              key={item.uid}
              uid={item.uid}
              typeOfImage={item.typeOfImage}
              groupName={"pic_section_" + ++j}
              miniImageUrl={item.miniImageUrl}
              description={item.description}
            />
          ))}
      </div>
    </MainLayout>
  );
};