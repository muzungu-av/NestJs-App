import MainLayout from "../../Layouts/MainLayout";
import { get } from "../../api/axiosInstance";
import bgImg from "../../assets/images/GroupBg.jpg";
import { OnePaintingSection } from "./oneSection";
import { useEffect, useState } from "react";

export const Paintings: React.FC = () => {
  const sc = import.meta.env.VITE_SCHEME;
  const bu = import.meta.env.VITE_BACKEND_URL.replace(/https?:\/\//g, "");
  const bp = import.meta.env.VITE_BACKEND_PORT;
  const ai = import.meta.env.VITE_API_IMAGE;
  const BACKEND_API =
    sc && bu && bp ? `${sc}://${bu}:${bp}` : "http://localhost-default:9000";

  const [paintings, setPaintings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const params = {
    fields: "description,dimension,imageUrl,miniImageUrl",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(BACKEND_API, `${ai}/`, false, false, params);
        setPaintings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching paintings:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      {" "}
      <div className="font-italiana  flex justify-center text-[64px] ">
        Gemälde
      </div>
      <div
        className="min-h-[335px] flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className=" text-white text-center font-apple text-2xl color-[#fff]">
          {" "}
          “ Die Farben sind die Tasten, die die <br />
          Künstler auf der Seele spielen ”
        </div>
      </div>
      {paintings.map((painting: any, index: number) => (
        <OnePaintingSection
          key={index}
          text={painting.description}
          imgURL={painting.miniImageUrl}
        />
      ))}
    </MainLayout>
  );
};
