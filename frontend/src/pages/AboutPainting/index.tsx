import MainLayout from "../../layouts/MainLayout";
import React from "react";
import ShoppingCart from "../../assets/icons/ShoppingCart.svg";
import mini1 from "../../assets/images/Group_1000001764.png";
import mini2 from "../../assets/images/photo_2024-02-10_18-54-36.png";
import boatPic from "../../assets/images/1.png";
import autumnPic from "../../assets/images/4.png";
import { PaintingSlider } from "../../components/PaintingSlider";

const slidesArr = [autumnPic, autumnPic, autumnPic, autumnPic, autumnPic];
const objPaint = {
  img: boatPic,
  isLandscape: false,
  miniatures: [
    { img: mini1, isMain: false },
    { img: mini2, isMain: false },
  ],
};
const miniatureArr1 = [
  { isMain: true, img: boatPic, w: 320, h: 479 },
  { img: mini1, isMain: false },
  { img: mini2, isMain: false },
];

type Paint = { isMain: boolean; img: any; w?: number; h?: number };

export const AboutPainting: React.FC = () => {
  const PaintingSection = () => {
    return (
      <>
        <div>
          <div className="font-italiana flex justify-center text-[64px] ">
            Kopien der Gemälde
          </div>{" "}
          <div className=" flex justify-center font-italiana text-2xl p-10">
            Bildname
          </div>
          <div className="flex gap-[40px] px-[5%]">
            <div className="w-[60%]">
              <div
                className={
                  objPaint.isLandscape ? "" : "flex flex-col md:flex-row"
                }
              >
                {/* Главное изображение */}
                <div
                  className={
                    objPaint.isLandscape ? "md:w-full" : "md:w-1/2 ml-20"
                  }
                >
                  <img
                    src={miniatureArr1[0].img}
                    alt="Main"
                    style={{
                      border: "15px solid #240909",
                      borderRadius: "3px",

                      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
                    }}
                    className={objPaint.isLandscape ? "w-full" : "h-full"}
                  />
                </div>
                {/* Две маленькие миниатюры */}{" "}
                <div
                  className={
                    objPaint.isLandscape
                      ? "md:flex md:w-full md:pl-2"
                      : "md:w-1/2 md:pl-2"
                  }
                >
                  {objPaint.miniatures.map((v: Paint) => {
                    return (
                      <img
                        src={v.img}
                        alt="Thumbnail 1"
                        className="w-full md:w-1/2 m-10"
                      />
                    );
                  })}{" "}
                </div>
              </div>
            </div>

            <div className="  w-[40%] flex flex-col gap-6">
              <div className=" relative py-[15px]">
                <div className=" absolute h-full bg-black w-1 top-0 left-0 "></div>{" "}
                <h3 className=" text-2xl font-federo ml-3">
                  6 verfügbare Formate{" "}
                </h3>{" "}
                <h3 className=" text-2xl font-federo ml-3">
                  von 99,00€ bis 4.700,00€
                </h3>
              </div>
              <p className="text-2xl font-federo">Wählen Sie Bildgröße</p>{" "}
              <div className="grid grid-cols-2 gap-4 justify-start w-[80%]">
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  40 х 60 cm
                </button>
                <button className="btn-sizew-[100%] h-[54px] text-2xl">
                  50 х 70 cm
                </button>
                <button className="btn-size w-[100%] h-[54px] text-2xl">
                  50 х 70 cm
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
            <p className="  font-federo text-xl m-2">
              Wie funktioniert das Kopieren von Bildern auf Dibond. Hier sind
              einige gängige Schritte:
            </p>
            <p className="  font-federo text-base m-2">Bildauswahl: </p>
            <p className="  font-federo text-base m-2">
              {" "}
              Der Künstler oder Fotograf wählt das zu kopierende Bild auf Dibond
              aus.
            </p>
            <p className="  font-federo text-base m-2">Bildvorbereitung: </p>
            <p className="  font-federo text-base m-2">
              Das Bild muss möglicherweise entsprechend der Größe der
              Dibond-Platte vorbereitet, bearbeitet oder skaliert werden.
            </p>
            <p className="  font-federo text-base m-2">
              Bildübertragung auf Dibond:{" "}
            </p>
            <p className="  font-federo text-base m-2">
              {" "}
              Es gibt mehrere Möglichkeiten, ein Bild auf Dibond zu übertragen.
              Beispielsweise kann ein Bild auf eine spezielle Selbstklebefolie
              gedruckt werden, die dann auf die Dibond-Oberfläche geklebt wird.
              Eine weitere Methode ist der direkte Druck des Bildes auf die
              Dibond-Oberfläche mittels UV-Drucktechnologie.
            </p>
            <p className="  font-federo text-base m-2">Bildfixierung: </p>
            <p className="  font-federo text-base m-2">
              Nach der Übertragung des Bildes auf Dibond kann es fixiert oder
              mit einer Schutzschicht beschichtet werden, um die Kratzfestigkeit
              und die Umweltbelastung zu verbessern.
            </p>{" "}
            <p className="  font-federo text-base m-2">Kantenbearbeitung: </p>
            <p className="  font-federo text-base m-2">
              Auf Wunsch des Künstlers können die Kanten der Dibond-Platte
              bearbeitet werden, um ihnen ein komplettes und professionelles
              Aussehen zu verleihen.
            </p>{" "}
            <p className="  font-federo text-base m-2">
              Aufhängung oder Montage:{" "}
            </p>
            <p className="  font-federo text-base m-2">
              Wenn Dibond als Kunstplatte verwendet wird, kann es nach Ihren
              Wünschen aufgehängt oder installiert werden.
            </p>{" "}
            <p className="  font-federo text-base m-2">
              Solche Techniken ermöglichen die Erstellung von stilvollen und
              modernen künstlerischen Werken, die dank der Verwendung von Dibond
              langlebig und langlebig sind.
            </p>
          </div>
        </div>{" "}
        <div className="font-italiana flex justify-center text-[64px] mb-5 ">
          Ähnliche Angebote
        </div>{" "}
      </>
    );
  };
  return (
    <MainLayout>
      <PaintingSection />
      <PaintingSlider slides={slidesArr} />
    </MainLayout>
  );
};
