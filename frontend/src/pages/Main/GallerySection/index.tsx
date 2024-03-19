import { useEffect, useState } from "react";
import MainPageBg from "../../../assets/images/MainPageBg.jpg";
import { get } from "../../../api/axiosInstance";

export const GallerySection = () => {
  const sc = import.meta.env.VITE_SCHEME;
  const bu = import.meta.env.VITE_BACKEND_URL.replace(/https?:\/\//g, "");
  const bp = import.meta.env.VITE_BACKEND_PORT;
  const ai = import.meta.env.VITE_API_IMAGE;
  const BACKEND_API =
    sc && bu && bp ? `${sc}://${bu}:${bp}` : "http://localhost-default:9000";
  const countImgs = 3;
  const params = { fields: "miniImageUrl" };
  const [paintings, setPaintings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(
          BACKEND_API,
          `${ai}/block/${countImgs}`,
          false,
          false,
          params
        );
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

  function generateImageBlock(paintings: any[], index: number) {
    if (index >= 0 && index < paintings.length) {
      const borderStyle = "border-[15px] border-[#240909]";
      const src = paintings[index].miniImageUrl;
      return <img className={borderStyle} src={src} />;
    } else {
      console.log("Invalid index or paintings array is empty.");
      return <></>;
    }
  }

  return (
    <div className="" style={{ backgroundImage: `url(${MainPageBg})` }}>
      <div className="py-[5%] px-[5%] flex justify-center gap-20 ">
        <div className="self-end">{generateImageBlock(paintings, 0)}</div>
        <div>{generateImageBlock(paintings, 1)}</div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h3 className="font-federo text-5xl whitespace-nowrap">
              Meine Galerie
            </h3>
            <button className="btn-primary">Mehr erfahren</button>
          </div>
          {generateImageBlock(paintings, 2)}
        </div>
      </div>
    </div>
  );
};
