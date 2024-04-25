import { useEffect, useState } from "react";
import Play from "../../assets/icons/Play.svg"; // (linux error) big Letter please
import { GallerySection } from "../../components/GallerySection";
import { useNavigate } from "react-router";
import { Get } from "../../api/axiosInstance";
import { PaintingSlider } from "../../components/PaintingSlider";
import { Contacts } from "../../components/Contacts";
import { BeforeSlider } from "../../components/BeforeSlider";

interface AboutMeProps {
  isMain: boolean;
}

interface VideoBlock {
  _id: string;
  name: string;
  description: string;
  link: string;
  imgUrl: string;
}

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const vi = import.meta?.env?.VITE_API_VIDEO;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

export const AboutMe = ({ isMain }: AboutMeProps) => {
  const fetchDataFromApi = async () => {
    try {
      const response = await Get(undefined, url, vi, false, {});
      return response.data;
    } catch (error) {
      console.error("Error fetching Videos from backend:", error);
      return null;
    }
  };

  const [videos, setVideoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFromApi();
      if (result) {
        setVideoData(result);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const AboutPainterSection: React.FC = () => {
    return (
      <div className="py-[10%] px-[5%]">
        <h3 className="font-italiana text-4xl lg:text-6xl pb-8 text-center">
          Biografie
        </h3>
        <div className="flex items-center lg:justify-around lg:items-start flex-col lg:flex-row">
          <div>
            <div className="rounded-full w-[220px] h-[220px] mb-4 bg-[#D9D9D9]"></div>
            <h4 className="font-apple text-center text-2xl">Calvin Calva</h4>
          </div>
          <div className="flex flex-col lg:w-[50%] gap-8">
            <p className="font-federo text-sm lg:tex-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              quam provident illum sapiente harum recusandae, atque et quisquam
              consectetur cumque, nostrum, doloribus iure culpa consequuntur
              aspernatur. Pariatur voluptate doloribus deleniti?
            </p>
            {!isMain && (
              <>
                <p className="font-federo text-sm lg:text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
                <p className="font-federo text-s, lg:text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </>
            )}

            {isMain && (
              <p className="font-apple lg:w-[60%] self-center pt-5 text-sm lg:text-base">
                “ Lorem Ipsum is simply dummy text of the printing and
                typesetting industry ”
              </p>
            )}
          </div>

          {isMain && (
            <button
              className={
                isMain
                  ? "btn-primary self-center lg:self-end mt-4 lg:mt-0"
                  : "btn-primary self-center lg:self-end mt-4 lg:mt-0"
              }
              onClick={() => navigate("/bio")}
            >
              Mehr erfahren
            </button>
          )}
        </div>
        {!isMain && (
          <div className=" flex flex-col  justify-center items-center ">
            <p className="font-apple text-base lg:text-2xl font-normal m-16 self-center ">
              “ Lorem Ipsum is simply dummy text of <br /> the printing and
              typesetting industry ”
            </p>

            <button
              className={"btn-primary "}
              onClick={() => navigate("/contacts")}
            >
              Kontaktieren
            </button>
          </div>
        )}
      </div>
    );
  };
  const VideoSection: React.FC = () => {
    const VideoBlock = ({ name, imgUrl, description }: Partial<VideoBlock>) => {
      return (
        <div className="flex lg:items-start justify-between flex-col lg:flex-row gap-10 py-[5%] px-[5%]">
          <div
            className="bg-no-repeat	bg-cover w-full h-[170px] sm:h-[250px] lg:w-[600px] lg:h-[300px] flex justify-center items-center"
            style={{ backgroundImage: `url(${imgUrl})` }}
          >
            <div className="btn-play ">
              <img src={Play} />
            </div>
          </div>
          <div className="lg:w-[50%] flex flex-col gap-4">
            <h3 className="font-italiana text-base lg:text-2xl ">{name}</h3>
            <p className="font-federo text-sm lg:text-lg">{description}</p>
            <button className="btn-primary">Mehr erfahren</button>
          </div>
        </div>
      );
    };

    return (
      <>
        {!!videos.length && (
          <div className=" flex flex-col gap-6">
            {videos.map((v) => {
              return (
                <VideoBlock
                  name={(v as VideoBlock).name}
                  imgUrl={(v as VideoBlock).imgUrl}
                  description={(v as VideoBlock).description}
                />
              );
            })}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <AboutPainterSection />
      <VideoSection />
      <GallerySection />
      {!isMain ? (
        <>
          <BeforeSlider />
          <PaintingSlider />
          <Contacts />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
