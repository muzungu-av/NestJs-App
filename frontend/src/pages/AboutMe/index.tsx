import { useEffect, useState } from "react";
import Play from "../../assets/icons/Play.svg"; // (linux error) big Letter please
import { GallerySection } from "../../components/GallerySection";
import { useNavigate } from "react-router";
import { Get } from "../../api/axiosInstance";
import { PaintingSlider } from "../../components/PaintingSlider";
import { Contacts } from "../../components/Contacts";
import { BeforeSlider } from "../../components/BeforeSlider";
import DOMPurify from "dompurify";

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
interface Biography {
  imgUrl: string;
  text_bio: string;
  __v: number;
  _id: string;
}
const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const vi = import.meta?.env?.VITE_API_VIDEO;
const bio = import.meta?.env?.VITE_API_BIO;

const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

export const AboutMe = ({ isMain }: AboutMeProps) => {
  const [videos, setVideoData] = useState([]);
  const [biography, setBiography] = useState<Biography>({} as Biography);
  const fetchVideoDataFromApi = async () => {
    try {
      const response = await Get(undefined, url, vi, false, {});
      return response.data;
    } catch (error) {
      console.error("Error fetching Videos from backend:", error);
      return null;
    }
  };
  const fetchBioDataFromApi = async () => {
    try {
      const response = await Get(undefined, url, `${bio}`, false, {});

      return response.data;
    } catch (error) {
      console.error("Error fetching Videos from backend:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchVideoDataFromApi();
      if (result) {
        setVideoData(result);
      }
      const resultBio = await fetchBioDataFromApi();
      if (resultBio) {
        setBiography(resultBio);
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
            <img
              src={biography.imgUrl}
              className="rounded-full w-[220px] h-[220px]"
            />

            <h4 className="font-apple text-center text-2xl">Calvin Calva</h4>
          </div>
          <div className="flex flex-col lg:w-[50%] gap-8">
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(biography?.text_bio || "")
              }}
              className="  font-federo text-base lg:text-xl m-2"
            ></p>

            {isMain && (
              <p className="font-apple lg:w-[60%] self-center pt-5 text-sm lg:text-base">
                “ Color meus est bonus amicus et ipsum loqui vellem. ”
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
              “ Color meus est bonus
              <br />
              amicus et ipsum loqui vellem. ”
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
        {" "}
        (
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
        );
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
