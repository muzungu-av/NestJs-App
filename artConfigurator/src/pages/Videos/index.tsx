import { useEffect, useRef, useState } from "react";
import Empty from "./../../assets/images/EmptyPhoto.png";
import MainLayout from "../../layouts/MainLayout";
import { Delete, Get, Post } from "../../api/axiosInstance";
import { message } from "antd";
import deletePhoto from "./../../assets/images/Delete.svg";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const vi = import.meta?.env?.VITE_API_VIDEO;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

interface VideoBlock {
  _id: string;
  name: string;
  link: string;
  imgUrl: string;
  descript: string;
}

interface ImageDataStructure {
  body: File | undefined;
  url: string | undefined;
  filename: String | undefined;
}

export const Videos = () => {
  const [videos, setAllVideosData] = useState([]);
  const [imageData, setImageData] = useState<ImageDataStructure | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataFromApi();
      if (result) {
        setAllVideosData(result);
      }
    };
    fetchData();
  }, []);

  const [videoName, setVideoName] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string | undefined>(undefined);
  // const [videoImgUrl, setVideoImgUrl] = useState<string | undefined>(undefined);
  const [videoDescription, setVideoDescription] = useState<string | undefined>(
    undefined
  );

  const handleChangeVideoName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVideoName(event.target.value);
  };

  const handleChangeVideoLink = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVideoLink(event.target.value);
  };

  const handleChangeVideoDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVideoDescription(event.target.value);
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

  // НЕТ ЖЕ СТРАНИЦЫ ДЛЯ РЕДАКТИРОВАНИЯ ?
  // const handleEditClick = (id: string) => {
  //   console.log("EDIT - " + id);
  // };

  const handleDeleteClick = async (id: string) => {
    const userAnswer = window.confirm("Do u want to delete?");
    if (userAnswer) {
      await Delete(url + vi, "/" + id, true);
      message.success("Successfully deleted");
    }
  };

  const handleSaveClick = async () => {
    if (!(videoName && videoLink && videoDescription)) {
      message.error("Nicht alle Daten sind ausgefüllt");
      return;
    }

    const userAnswer = window.confirm("Ein Video an die Website senden?");
    if (userAnswer) {
      const formData = new FormData();
      formData.append("name", videoName);
      formData.append("description", videoDescription);
      formData.append("link", videoLink);
      if (imageData?.body) {
        formData.append("file", imageData.body);
      }
      const headers = {
        "Content-Type": `multipart/form-data;`,
      };
      const response = await Post(headers, url, vi, true, formData);
      console.log(response);

      message.success("Das Video wird auf der Startseite angezeigt");
      setNewClicked(false);
    }
  };

  const VideoBlock = ({ _id, name, link, imgUrl }: VideoBlock) => {
    return (
      <div className="flex justify-between px-[5%]">
        {" "}
        <img src={imgUrl !== undefined ? imgUrl : Empty} />
        <div className="flex flex-col gap-6 ">
          <p className="text-xl">{name}</p>
          <p className="text-base">Link:{link}</p>
        </div>
        <div className="self-end">
          {/* <button
            className="btn-primary w-[130px] h-[45px]"
            onClick={() => handleEditClick(_id)}
          >
            ändern {/Change/}
          </button> */}
          <button
            className="btn-primary w-[130px] h-[45px] ml-2"
            onClick={() => handleDeleteClick(_id)}
          >
            löschen {/*Delete*/}
          </button>
        </div>
      </div>
    );
  };

  let img_resource = Empty;
  if (imageData && imageData.body) {
    img_resource = URL.createObjectURL(imageData.body);
  } else if (imageData && imageData.url) {
    img_resource = imageData.url;
  }

  // Состояние для хранения ссылки на последний активный элемент
  const [lastFocused, setLastFocused] = useState<string | null>(null);

  const NewVideoCreateBlock = () => {
    // рефы для работы с фокусом
    const videoNameRef = useRef<HTMLInputElement>(null);
    const videoLinkRef = useRef<HTMLInputElement>(null);
    const videoDescriptionRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDeletePhoto = () => {
      const confirmation = window.confirm(
        "Sind Sie sicher, dass Sie das ausgewählte Foto löschen möchten?"
      );
      if (confirmation) {
        setImageData(undefined); //если удалили фото - удаляем все данные о нем
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Сбрасываем значение input, чтобы можно было заново выбрать тот же файл
        }
      }
    };

    const handleFileInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData({
            body: file,
            url: undefined,
            filename: file.name,
          } as ImageDataStructure);
        };
        reader.readAsDataURL(file);
      }
    };

    // Функция для установки фокуса на элемент
    const focusElement = (elementRef: React.RefObject<HTMLInputElement>) => {
      if (elementRef.current) {
        elementRef.current.focus();
      }
    };
    useEffect(() => {
      // Проверка, какой элемент был последним в фокусе, и установка на него фокуса
      switch (lastFocused) {
        case "videoName":
          focusElement(videoNameRef);
          break;
        case "videoLink":
          focusElement(videoLinkRef);
          break;
        case "videoDescription":
          focusElement(videoDescriptionRef);
          break;
        default:
          break;
      }
    }, [lastFocused]);

    return (
      <div className="bg-[#FFEDCB] m-8 flex justify-between px-4">
        {" "}
        <label htmlFor="file-input">
          <img className="m-4" src={img_resource} />
        </label>
        <button
          className="w-[100%] flex justify-center m-2"
          onClick={handleDeletePhoto}
        >
          <img src={deletePhoto} /> Foto löschen {/*Delete photo*/}
        </button>
        {/* <img src={img_resource} className="m-4" /> */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          id="file-input"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div className="flex flex-col w-[40%]">
          <div className=" flex m-4 justify-center border border-black rounded-md w-full">
            <input
              id="idvideoName"
              type="text"
              ref={videoNameRef}
              onFocus={() => setLastFocused("videoName")}
              value={videoName}
              onChange={handleChangeVideoName}
              className="w-full px-2  m-2  h-6 bg-transparent border-none outline-none"
              placeholder="Name des Videos..."
            />
          </div>
          <div className=" flex m-4 justify-center border border-black rounded-md w-full">
            <input
              id="idvideoLink"
              type="text"
              ref={videoLinkRef}
              onFocus={() => setLastFocused("videoLink")}
              className="w-full px-2  m-2  h-6 bg-transparent border-none outline-none"
              placeholder="Link zum Video..."
              value={videoLink}
              onChange={handleChangeVideoLink}
            />
          </div>
          <div className=" flex m-4 justify-center border border-black rounded-md w-full">
            <input
              id="idvideoDescription"
              type="text"
              ref={videoDescriptionRef}
              onFocus={() => setLastFocused("videoDescription")}
              className="w-full px-2  m-2  h-6 bg-transparent border-none outline-none"
              placeholder="Video-Beschreibung..."
              value={videoDescription}
              onChange={handleChangeVideoDescription}
            />
          </div>{" "}
        </div>
        <div className="flex justify-end items-end my-4">
          <button
            onClick={() => handleSaveClick()}
            className="rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px]"
          >
            Speichern {/*Save*/}
          </button>{" "}
          {/* <button className="btn-rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px] ml-2">
            löschen Delete
          </button> */}
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
              _id={(v as VideoBlock)._id}
              name={(v as VideoBlock).name}
              descript={(v as VideoBlock).descript}
              link={(v as VideoBlock).link}
              imgUrl={(v as VideoBlock).imgUrl}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};
