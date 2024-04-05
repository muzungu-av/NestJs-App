import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useMemo, useState } from "react";
import { get } from "../../api/axiosInstance";
import DOMPurify from "dompurify";

type PicSectionProps = {
  uid: string;
  groupName: string;
  miniImageUrl: string;
  description: string;
};

const PicSection: React.FC<PicSectionProps> = ({
  uid,
  groupName,
  miniImageUrl,
  description,
}) => {
  const handleDeleteClick = (uid: string) => {
    console.log(uid);
  };
  let i = 0;
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
                  id={groupName + "_" + ++i}
                  type="radio"
                  value=""
                  name={groupName + "_P"}
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
                  id={groupName + "_" + ++i}
                  type="radio"
                  value=""
                  name={groupName + "_A"}
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

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const IMG = import.meta?.env?.VITE_API_IMAGE;
const BURL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

const fetchDataFromApi = async () => {
  try {
    const params = { fields: "uid,miniImageUrl,description" };
    const response = await get(undefined, BURL, IMG, false, params);
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

  // useEffect(() => {
  //   fetchDataFromApi();
  // }, []);

  // const response = await post(headers, BURL, IMG, true, formData);
  //http://172.18.0.103:4001/api/image?fields=uid,miniImageUrl,description

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
              groupName="radio1"
              miniImageUrl={item.miniImageUrl}
              description={item.description}
            />
          ))}
      </div>
    </MainLayout>
  );
};
