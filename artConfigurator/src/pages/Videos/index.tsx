import { useEffect, useState } from "react";
import Empty from "./../../assets/images/EmptyPhoto.png";
import MainLayout from "../../layouts/MainLayout";
import { Get } from "../../api/axiosInstance";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const vi = import.meta?.env?.VITE_API_VIDEO;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

interface VideoBlock {
  name: string;
  link: string;
  imgUrl: string;
}

export const Videos = () => {
  const [videos, setData] = useState([]);

  const fetchDataFromApi = async () => {
    try {
      const response = await Get(undefined, url, vi, false, {});
      return response.data;
    } catch (error) {
      console.error("Error fetching Videos from backend:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFromApi();
      if (result) {
        setData(result);
      }
    };
    fetchData();
  }, []);

  const [isNewClicked, setNewClicked] = useState<boolean>(false);
  const VideoBlock = ({ name, link, imgUrl }: VideoBlock) => {
    return (
      <div className="flex justify-between px-[5%]">
        {" "}
        <img src={imgUrl !== undefined ? imgUrl : Empty} />
        <div className="flex flex-col gap-6 ">
          <p className="text-xl">{name}</p>
          <p className="text-base">Link:{link}</p>
        </div>
        <div className="self-end">
          <button className="btn-primary w-[130px] h-[45px]">ändern</button>
          <button className="btn-primary w-[130px] h-[45px] ml-2">
            löschen
          </button>
        </div>
      </div>
    );
  };

  const NewVideoCreateBlock = () => {
    return (
      <div className="bg-[#FFEDCB] m-8 flex justify-between px-4">
        {" "}
        <img src={Empty} className="m-4" />
        <div className="flex flex-col w-[40%]">
          <div className=" flex m-4 justify-center border border-black rounded-md w-full">
            <input
              type="text"
              className="w-full px-2  m-2  h-6 bg-transparent border-none outline-none"
              placeholder="Name des Videos:"
            />
          </div>
          <div className=" flex m-4 justify-center border border-black rounded-md w-full">
            <input
              type="text"
              className="w-full px-2  m-2  h-6 bg-transparent border-none outline-none"
              placeholder="https://pixabay.com/ru/illustrations/"
            />
          </div>{" "}
        </div>
        <div className="flex justify-end items-end my-4">
          <button
            onClick={() => setNewClicked(false)}
            className="rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px]"
          >
            ändern
          </button>{" "}
          <button className="btn-rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px] ml-2">
            löschen
          </button>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      {" "}
      <div className="font-italiana text-5xl px-[5%] my-[2%]">Videos</div>
      <button
        onClick={() => setNewClicked(true)}
        className="btn-primary w-[230px] h-[45px] p-0 text-base  mx-[5%] my-[5%]"
      >
        Neues Video hinzufügen +
      </button>
      {isNewClicked && <NewVideoCreateBlock />}
      <div className="flex flex-col gap-14">
        {videos.map((v) => {
          return (
            <VideoBlock
              name={(v as VideoBlock).name}
              link={(v as VideoBlock).link}
              imgUrl={(v as VideoBlock).imgUrl}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};
