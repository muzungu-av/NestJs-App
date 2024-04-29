import { useEffect, useState } from "react";
import Empty from "./../../assets/images/EmptyPhoto.png";
import MainLayout from "../../layouts/MainLayout";
import { Delete, Get, Post, Put } from "../../api/axiosInstance";
import { Modal, message } from "antd";
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
    setNewClicked(false);
  };

  const handleDeleteClick = async (v: Video) => {
    Modal.confirm({
      title: "Möchten Sie löschen?",
      icon: null, // Чтобы убрать значок (по умолчанию он есть)
      okText: "Ja",
      okType: "danger",
      cancelText: "Nein",
      async onOk() {
        try {
          const params = { fileName: v.fileName, id: v._id };
          await Delete(url, vi, true, params);

          message.success("Erfolgreich gelöscht");

          setAllVideosData((prev) => {
            return prev.filter((item: any) => item._id !== v._id);
          });
        } catch (error) {
          console.error("Fehler beim Löschen:", error);
          message.error("Fehler beim Löschen");
        }
      },

      onCancel() {},
    });
  };

  const handleSaveClick = async (
    textData: {
      videoDescription: string;
      videoLink: string;
      videoName: string;
    },
    id?: string,
    fileName?: string,
    imageData?: ImageDataStructure | null
  ) => {
    if (
      !(
        (textData.videoName &&
          textData.videoLink &&
          textData.videoDescription) ||
        !(id && imageData)
      )
    ) {
      message.error("Nicht alle Daten sind ausgefüllt");
      return;
    } else {
      try {
        Modal.confirm({
          title: "Ein Video an die Website senden?",
          icon: null, // Чтобы убрать значок (по умолчанию он есть)
          okText: "Ja",
          okType: "default",
          cancelText: "Nein",
          async onOk() {
            try {
              const formData = new FormData();
              formData.append("name", textData.videoName);
              formData.append("description", textData.videoDescription);
              formData.append("link", textData.videoLink);
              if (imageData?.body && fileName) {
                // когда видео менялось
                formData.append("fileName", fileName!);
                formData.append("file", imageData!.body!);
              }
              const headers = {
                "Content-Type": `multipart/form-data;`,
              };
              if (!id) {
                await Post(headers, url, vi, true, formData);
                message.success("Das Video wird auf der Startseite angezeigt");
                setNewClicked(false);
                setCurrentEditingId("");
                fetchData();
              } else {
                await Put(headers, url, vi + "/" + id, true, formData);
                message.success("Das Video wird auf der Startseite angezeigt");
                setNewClicked(false);
                setCurrentEditingId("");
                fetchData();
              }
            } catch (error) {
              console.error("Fehler beim Löschen:", error);
              message.error("Fehler beim Löschen");
            }
          },

          onCancel() {},
        });
      } catch (error) {}
    }
  };

  return (
    <MainLayout>
      {" "}
      <div className="font-italiana text-5xl px-[5%] my-[2%]">Videos</div>
      <button
        onClick={() => {
          setNewClicked(true);
          setCurrentEditingId("");
        }}
        className="btn-primary w-[230px] h-[45px] p-0 text-base  mx-[5%] my-[5%]"
      >
        Neues Video hinzufügen +
      </button>
      {isNewClicked && (
        <VideoCreateEditBlock
          isNew={true}
          data={{} as Video}
          handleSaveClick={handleSaveClick}
          onCancel={() => setNewClicked(false)}
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
                  onCancel={() => setCurrentEditingId("")}
                />
              ) : (
                <div className="flex justify-between px-[5%] items-center">
                  {" "}
                  <div className="w-[30%] flex items-center">
                    <img
                      src={v.imgUrl !== undefined ? v.imgUrl : Empty}
                      className=" h-auto w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-6 m-8 w-[40%]">
                    <p className="text-xl">{v.name}</p>
                    <a href={v.link} className="text-base">
                      Link:{v.link}
                    </a>
                    <p className="text-base">Description:{v.description}</p>
                  </div>
                  <div className=" lg:flex-row flex-col self-end">
                    <button
                      className="btn-primary w-[130px] h-[45px] mr-2"
                      onClick={() => handleEditClick(v._id)}
                    >
                      ändern {/*Change*/}
                    </button>
                    <button
                      className="btn-primary w-[130px] h-[45px]  my-4"
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
