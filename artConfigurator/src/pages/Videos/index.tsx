import { useEffect, useState } from "react";
import Empty from "./../../assets/images/EmptyPhoto.png";
import MainLayout from "../../layouts/MainLayout";
import { Delete, Get, Post, Put } from "../../api/axiosInstance";
import { message } from "antd";
import { VideoCreateEditBlock } from "../VideoCreateEditBlock";

// import deletePhoto from "./../../assets/images/Delete.svg";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const vi = import.meta?.env?.VITE_API_VIDEO;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

interface Video {
  _id: string;
  name: string;
  link: string;
  imgUrl: string;
  description: string;
  fileName: string;
}
interface ImageDataStructure {
  body: File | undefined;
  url: string | undefined;
  filename: String | undefined;
}

export const Videos = () => {
  const [videos, setAllVideosData] = useState<Video[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await fetchDataFromApi();
    if (result) {
      setAllVideosData(result);
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const response = await Get(undefined, url, vi, false, {});
      return response.data;
    } catch (error) {
      console.error("Error fetching Videos from backend:", error);
      return null;
    }
  };

  const [isNewClicked, setNewClicked] = useState<boolean>(false);
  const [currentEditingId, setCurrentEditingId] = useState<string>("");
  const handleEditClick = (id: string) => {
    setCurrentEditingId(id);
  };

  const handleDeleteClick = async (v: Video) => {
    const userAnswer = window.confirm("Do u want to delete?");
    if (userAnswer) {
      const params = { fileName: v.fileName, id: v._id };
      const response = await Delete(url, vi, true, params);
      console.log("response", response);
      // await Delete(url + vi, "/" + v._id, true);
      message.success("Successfully deleted");
    }
    setAllVideosData((prev) => {
      return prev.filter((item: any) => item._id !== v._id);
    });
  };

  const handleSaveClick = async (
    textData: {
      videoDescription: string;
      videoLink: string;
      videoName: string;
    },
    imageData: ImageDataStructure,
    id?: string,
    fileName?: string
  ) => {
    if (
      !(textData.videoName && textData.videoLink && textData.videoDescription)
    ) {
      message.error("Nicht alle Daten sind ausgefüllt");
      return;
    }

    const userAnswer = window.confirm("Ein Video an die Website senden?");
    if (userAnswer) {
      const formData = new FormData();
      formData.append("name", textData.videoName);
      formData.append("description", textData.videoDescription);
      formData.append("link", textData.videoLink);
      if (imageData?.body) {
        formData.append("file", imageData.body);
      }
      fileName && formData.append("fileName", fileName);
      const headers = {
        "Content-Type": `multipart/form-data;`
      };
      if (!id) {
        const response = await Post(headers, url, vi, true, formData);
        console.log(response);

        message.success("Das Video wird auf der Startseite angezeigt");
        setNewClicked(false);
        setCurrentEditingId("");
        fetchData();
      } else {
        const response = await Put(headers, url, vi + "/" + id, true, formData);
        console.log(response);

        message.success("Das Video wird auf der Startseite angezeigt");
        setNewClicked(false);
        setCurrentEditingId("");
        fetchData();
      }
    }
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
      {isNewClicked && (
        <VideoCreateEditBlock
          isNew={true}
          data={{} as Video}
          handleSaveClick={handleSaveClick}
        />
      )}
      <div className="flex flex-col gap-14">
        {videos.map((v) => {
          return (
            <>
              {(v as Video)._id === currentEditingId ? (
                <VideoCreateEditBlock
                  isNew={false}
                  data={v}
                  handleSaveClick={handleSaveClick}
                />
              ) : (
                <div className="flex justify-between px-[5%]">
                  {" "}
                  <img src={v.imgUrl !== undefined ? v.imgUrl : Empty} />
                  <div className="flex flex-col gap-6 ">
                    <p className="text-xl">{v.name}</p>
                    <p className="text-base">Link:{v.link}</p>
                    <p className="text-base">Description:{v.description}</p>
                  </div>
                  <div className="self-end">
                    <button
                      className="btn-primary w-[130px] h-[45px]"
                      onClick={() => handleEditClick(v._id)}
                    >
                      ändern {/*Change*/}
                    </button>
                    <button
                      className="btn-primary w-[130px] h-[45px] ml-2"
                      onClick={() => handleDeleteClick(v)}
                    >
                      löschen {/*Delete*/}
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </MainLayout>
  );
};
