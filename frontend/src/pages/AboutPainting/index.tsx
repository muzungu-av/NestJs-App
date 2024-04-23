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

export const AboutPainting: React.FC = () => {
  const [paintingData, setPaintingData] = useState<CreateImageDto>();
  const objPaint = {
    img: boatPic,
    isLandscape: false,
    miniatures: [
      { img: mini1, isMain: false },
      { img: mini2, isMain: false },
    ],
  };

  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
  const ai = import.meta?.env?.VITE_API_IMAGE;
  const { id } = useParams();
  const BACKEND_API =
    sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";
  const getPictureById = async () => {
    try {
      const response = await Get(undefined, BACKEND_API, `${ai}/${id}`, false);
      setPaintingData(response.data);
      console.log("image", response.data);
    } catch (error) {
      console.error("Error fetching paintings:", error);
    }
  };
  useEffect(() => {
    getPictureById();
  }, []);
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
            {paintingData?.originalName}
          </div>
          <div className="flex lg:flex-row flex-col gap-[40px] px-[5%]">
            <div className=" lg:w-[60%]">
              <div className={objPaint.isLandscape ? "" : "flex flex-row"}>
                {/*Main pic */}
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
                {/*Two min */}{" "}
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
                  6 verfügbare Formate{" "}
                </h3>{" "}
                <h3 className=" lg:text-2xl text-base  font-federo ml-3">
                  von 99,00€ bis 4.700,00€
                </h3>
              </div>
              <p className="lg:text-2xl text-xl flex flex-nowrap font-federo">
                Wählen Sie Bildgröße
              </p>{" "}
              <div className="grid grid-cols-2 gap-4 justify-start w-[80%]">
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  40 х 60 cm
                </button>
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  50 х 70 cm
                </button>
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  60 х 80 cm
                </button>
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  110 х 133 cm
                </button>
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  120 х 160 cm
                </button>{" "}
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  150 х 200 cm
                </button>
              </div>{" "}
              <div className=" relative py-[10px]">
                <div className=" absolute h-full bg-black w-1 top-0 left-0 "></div>{" "}
                <h3 className=" font-federo  text-2xl ml-5">
                  Gesamtbetrag : 1.230,00€
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
            <p className="  font-federo text-base lg:text-xl m-2">
              {paintingData?.description}
            </p>
          </div>
        </div>
        <div className="font-italiana flex justify-center text-4xl lg:text-[64px] mb-5 ">
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
