import MainLayout from "../../layouts/MainLayout";
import React, { useEffect, useState } from "react";
import ShoppingCart from "../../assets/icons/ShoppingCart.svg";
import mini1 from "../../assets/images/Group_1000001764.png";
import mini2 from "../../assets/images/photo_2024-02-10_18-54-36.png";
import boatPic from "../../assets/images/1.png";
import { PaintingSlider } from "../../components/PaintingSlider";
import { useNavigate, useParams } from "react-router";
import { Get } from "../../api/axiosInstance";
import { CreateImageDto } from "../../../types.d";
import DOMPurify from "dompurify";

export const AboutPainting: React.FC = () => {
  const [paintingData, setPaintingData] = useState<CreateImageDto>();
  const [totalSum, setTotalSum] = useState<number>(0);
  const objPaint = {
    img: boatPic,
    isLandscape: false,
    miniatures: [
      { img: mini1, isMain: false },
      { img: mini2, isMain: false },
    ],
  };
  interface PaintingItem {
    price: number;
    width: number;
    height: number;
  }
  const minPrice = paintingData?.copyAttribute?.length
    ? paintingData.copyAttribute
        .filter((item: PaintingItem) => item.price)
        .sort((a: PaintingItem, b: PaintingItem) => a.price - b.price)?.[0]
        .price
    : undefined;
  const maxPrice = paintingData?.copyAttribute?.length
    ? paintingData.copyAttribute
        .filter((item: PaintingItem) => item.price)
        .sort((a: PaintingItem, b: PaintingItem) => b.price - a.price)?.[0]
        .price
    : undefined;

  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
  const ai = import.meta?.env?.VITE_API_IMAGE;
  const { id } = useParams();
  const params = {
    typeOfImage: "isCopy",
    fields: "uid,miniImageUrl,description,typeOfImage,copyAttribute",
  };
  const BACKEND_API =
    sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";
  const getPictureById = async () => {
    try {
      const response = await Get(
        undefined,
        BACKEND_API,
        `${ai}/type/${id}`,
        false,
        params
      );
      setPaintingData(response.data);
      console.log("image", response.data);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    }
  };
  useEffect(() => {
    getPictureById();
    setTotalSum(0);
  }, [id]);
  console.log("paintingData", paintingData);
  const navigate = useNavigate();

  const PaintingSection = () => {
    return (
      <>
        <div className="py-[5%]">
          <div className="font-italiana flex justify-center text-4xl lg:text-[64px] ">
            Kopien der Gemälde
          </div>{" "}
          <div className=" flex justify-center font-italiana text-2xl lg:text-2xl p-10">
            {paintingData?.name}
          </div>
          <div className="flex lg:flex-row flex-col gap-[40px] px-[5%]">
            <div className=" lg:w-[60%]">
              <div className={objPaint.isLandscape ? "" : "flex flex-row"}>
                <div
                  className={
                    objPaint.isLandscape
                      ? "w-1/2 lg:w-full"
                      : "w-1/2 lg:w-1/2 lg:ml-20"
                  }
                >
                  <img
                    src={paintingData?.miniImageUrl}
                    alt="Main"
                    style={{
                      border: "15px solid #240909",
                      borderRadius: "3px",

                      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
                    }}
                    className={
                      objPaint.isLandscape ? "w-full h-auto" : "h-auto w-auto"
                    }
                  />
                </div>

                <div
                  className={
                    objPaint.isLandscape
                      ? "flex w-1/2 pl-2"
                      : " flex flex-col gap-2 items-center w-1/2 lg:w-1/2 lg:pl-2"
                  }
                >
                  <img
                    src={paintingData?.miniImageUrl}
                    alt="Thumbnail 1"
                    className="w-1/2 lg:w-1/2 p-4  lg:p-0 "
                  />
                  <img
                    src={paintingData?.miniImageUrl}
                    alt="Thumbnail 1"
                    className="w-1/2 lg:w-1/2 p-4 lg:p-0 "
                  />
                </div>
              </div>
            </div>

            <div className="  lg:w-[40%] w-full flex flex-col gap-6">
              <div className=" relative py-[15px]">
                <div className=" absolute h-full bg-black w-1 top-0 left-0 "></div>{" "}
                <h3 className=" lg:text-2xl text-base font-federo ml-3">
                  {paintingData?.copyAttribute?.length || "0"} verfügbare
                  Formate{" "}
                </h3>{" "}
                <h3 className=" lg:text-2xl text-base  font-federo ml-3">
                  von {minPrice} € bis {maxPrice} €
                </h3>
              </div>
              <p className="lg:text-2xl text-xl flex flex-nowrap font-federo">
                Wählen Sie Bildgröße
              </p>{" "}
              <div className="grid grid-cols-2 gap-4 justify-start w-[80%]">
                {paintingData?.copyAttribute.map(
                  (item: PaintingItem, index: number) => (
                    <button
                      onClick={() => setTotalSum(item.price)}
                      key={index}
                      className="btn-size w-[100%] h-[54px] text-lg lg:text-2xl"
                    >
                      {item.width} x {item.height} cm
                    </button>
                  )
                )}
              </div>{" "}
              <div className=" relative py-[10px]">
                <div className=" absolute h-full bg-black w-1 top-0 left-0 "></div>{" "}
                <h3 className=" font-federo text-lg lg:text-2xl ml-5">
                  Gesamtbetrag : {totalSum} €
                </h3>{" "}
                <button
                  onClick={() => navigate("/contacts")}
                  type="button"
                  className="w-[140px] w-30 h-10 ml-5 mt-2 font-federo rounded-[6px] text-#000 bg-[#FFEDCB]"
                >
                  <div className=" flex justify-center items-center flex-row ">
                    {" "}
                    Kaufen <img className=" p-[5px]" src={ShoppingCart} />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="m-[5%]">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(paintingData?.description || ""),
              }}
              className="  font-federo text-base lg:text-xl m-2"
            ></p>
          </div>
        </div>
        <div className="font-italiana flex justify-center text-2xl lg:text-4xl lg:text-[64px] mb-5 ">
          Ähnliche Angebote
        </div>
      </>
    );
  };

  return (
    <MainLayout>
      <>
        <PaintingSection />
        <PaintingSlider />
      </>
    </MainLayout>
  );
};
