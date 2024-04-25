import MainLayout from "../../layouts/MainLayout";
import { Get } from "../../api/axiosInstance";
import bgImgGemälde from "../../assets/images/GroupBg.jpg";
import bgImgAtelier from "../../assets/images/bgImgAtelier.jpg";
import bgImgKopien from "../../assets/images/bgImgKopien.jpg";
import { OnePaintingSection } from "./oneSection";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";

interface PaintingsProps {
  pageType: "Gemälde" | "Atelier" | "Kopien";
}

export const Paintings = ({ pageType }: PaintingsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
  const ai = import.meta?.env?.VITE_API_IMAGE;
  const BACKEND_API =
    sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

  const [paintings, setPaintings] = useState<any[]>([]);

  const getPictures = async () => {
    try {
      //todo есть метод /type чтобы не загружать всё

      let diffResponse;
      if (pageType === "Kopien") {
        // Выполнить новый запрос, если тип страницы "Kopien"
        const params = {
          typeOfImage: "isCopy",
          fields: "miniImageUrl,description,uid,typeOfImage",
        };
        diffResponse = await Get(
          undefined,
          BACKEND_API,
          `${ai}/type`,
          false,
          params
        );
      } else {
        // Иначе использовать существующий запрос
        diffResponse = await Get(undefined, BACKEND_API, `${ai}/`, false);
      }

      if (pageType === "Gemälde") {
        setPaintings(
          diffResponse.data.filter((item: any) => item.typeOfImage === type_P)
        );
      }
      if (pageType === "Atelier") {
        setPaintings(
          diffResponse.data.filter((item: any) => item.typeOfImage === type_A)
        );
      }
      if (pageType === "Kopien") {
        setPaintings(
          diffResponse.data.filter((item: any) => item.typeOfImage === "isCopy")
        );
      }
    } catch (error) {
      console.error("Error fetching paintings:", error);
      message.error("Error getting paintings");
    } finally {
    }
  };
  useEffect(() => {
    getPictures();
    console.log("paintings", paintings);
  }, [location.pathname]);

  return (
    <MainLayout>
      <>
        <div className="font-italiana py-8 flex justify-center lg:leading-tight text-4xl lg:text-[64px] ">
          {pageType}
        </div>
        <div
          className=" min-h-[300px] w-full  flex items-center justify-center"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: pageType != "Atelier" ? "round" : "no-repeat",
            backgroundImage:
              pageType === "Gemälde"
                ? `url(${bgImgGemälde})`
                : pageType === "Atelier"
                ? `url(${bgImgAtelier})`
                : `url(${bgImgKopien})`,
          }}
        >
          {" "}
          <div className=" text-white text-center font-apple leading-8 text-base lg:text-2xl color-[#fff] p-20">
            {pageType === "Gemälde"
              ? " “ Die Farben sind die Tasten, die die <br /> Künstler auf der Seele spielen ”"
              : pageType === "Atelier"
              ? " “ Was ist Zeichnen? Dies ist die Fähigkeit, die eiserne Mauer zu durchbrechen, die zwischen dem, was Sie fühlen, und dem, was Sie tun können, steht. ”"
              : " “ Malerei ist Poesie, die man sieht, und Poesie ist Malerei, die man hört. ”"}
          </div>
        </div>
        {paintings.map(
          (painting: any, index: number) => {
            return (
              <OnePaintingSection
                key={index}
                text={painting.description}
                imgURL={painting.miniImageUrl}
                id={painting.id}
                onClick={() => {
                  if (pageType === "Gemälde") {
                    navigate(`/contacts`);
                  }
                  if (pageType === "Atelier") {
                    navigate(`/contacts`);
                  }
                  if (pageType === "Kopien") {
                    navigate(`/painting/${painting.uid}`);
                  }
                }}
              />
            );
          }
          //))
        )}
      </>
    </MainLayout>
  );
};
