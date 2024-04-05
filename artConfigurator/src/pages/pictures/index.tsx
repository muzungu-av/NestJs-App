import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useMemo, useState } from "react";
import { Delete, get } from "../../api/axiosInstance";
import DOMPurify from "dompurify";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const img = import.meta?.env?.VITE_API_IMAGE;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

type PicSectionProps = {
  uid: string;
  groupName: string;
  miniImageUrl: string;
  description: string;
};

const handleDeleteClick = async (uid: string) => {
  const userAnswer = window.confirm("Хотите выполнить действие?");

  if (userAnswer) {
    const response = await Delete(url + img, "/" + uid, true);
    console.log(uid);
    console.log(response);
    console.log("Действие выполнено!");
  } else {
    console.log("Действие отменено.");
  }
};

const PicSection: React.FC<PicSectionProps> = ({
  uid,
  groupName,
  miniImageUrl,
  description,
}) => {
  const sanitizedDescription = DOMPurify.sanitize(description); //безопасный текст, санитаризация
  return (
    <div className="flex justify-between py-[5%]">
      <img src={miniImageUrl} className="" />
      <div
        className="w-1/2"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      <div className="w-1/4 flex justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex gap-8">
            <p>Auf Seite posten: </p>
            <div>
              <div className="flex items-center mb-4">
                <input
                  id={groupName + "_P"}
                  type="radio"
                  value=""
                  name={groupName}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-[#895c06] dark:focus:ring-[#895c06] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={groupName + "_P"}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-[#895c06] dark:focus:ring-[#895c06] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={groupName + "_A"}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Atelier{" "}
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn-primary">ändern</button>
            <button
              className="btn-primary"
              onClick={() => handleDeleteClick(uid)}
            >
              löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchDataFromApi = async () => {
  try {
    const params = { fields: "uid,miniImageUrl,description" };
    console.log(url + img);
    const response = await get(undefined, url, img, false, params);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return null;
  }
};

export const Pictures = () => {
  const navigate = useNavigate();
  const handleAddNewClick = () => {
    navigate("/add-paint");
  };

  const [data, setData] = useState<PicSectionProps[] | null>(null);

  useEffect(() => {
    fetchDataFromApi().then((result) => setData(result));
  }, []);

  const memoizedData = useMemo(() => data, [data]) as PicSectionProps[];
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

        {Array.isArray(memoizedData) &&
          memoizedData.map((item) => (
            <PicSection
              key={item.uid}
              uid={item.uid}
              groupName={"pic_section_" + ++j}
              miniImageUrl={item.miniImageUrl}
              description={item.description}
            />
          ))}
      </div>
    </MainLayout>
  );
};
