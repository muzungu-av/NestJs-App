import { useRef, useState } from "react";
import Empty from "./../../assets/images/EmptyPhoto.png";

interface Video {
  _id: string;
  name: string;
  link: string;
  imgUrl: string;
  description: string;
  fileName: string;
}

interface VideoBlock {
  data: Video;
  isNew: boolean;

  handleSaveClick: (
    formData: {
      videoDescription: string;
      videoLink: string;
      videoName: string;
    },
    id: string,
    fileName: string,
    imageData?: ImageDataStructure | null
  ) => void;
  onCancel: () => void;
}

interface ImageDataStructure {
  body: File | undefined;
  url: string | undefined;
  filename: String | undefined;
}

export const VideoCreateEditBlock = ({
  data,
  isNew,
  handleSaveClick,
  onCancel,
}: VideoBlock) => {
  const [imageData, setImageData] = useState<ImageDataStructure>(
    {} as ImageDataStructure
  );
  const [formData, setFormData] = useState(
    isNew
      ? { videoDescription: "", videoLink: "", videoName: "" }
      : {
          videoDescription: data.description,
          videoLink: data.link,
          videoName: data.name,
        }
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const handleAddVideo = (event: React.FormEvent<HTMLFormElement>) => {
    const actualImageData = imageData?.body ? imageData : null;
    handleSaveClick(formData, data._id, data.fileName, actualImageData);
    event.preventDefault();
  };
  let img_resource = Empty;
  if (imageData && imageData.body) {
    img_resource = URL.createObjectURL(imageData.body);
  } else if (data && data.imgUrl) {
    img_resource = data.imgUrl;
  }
  return (
    <>
      <>
        {" "}
        <form
          onSubmit={handleAddVideo}
          className="bg-[#FFEDCB] m-8 flex flex-col lg:flex-row justify-between items-center px-4"
        >
          {" "}
          <div className="w-[30%] m-4 ">
            <label htmlFor="file-input">
              <img className=" w-full  cursor-pointer" src={img_resource} />
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              id="file-input"
              className="hidden self-center"
              onChange={handleFileInputChange}
            />
          </div>
          <div className="flex flex-col w-[40%] m-4">
            {" "}
            Name:
            <div className=" flex my-4 justify-center border border-black rounded-md w-full">
              <input
                id="idvideoName"
                name="videoName"
                type="text"
                value={formData.videoName}
                onChange={handleChange}
                className="w-full px-2  my-2  h-6 bg-transparent border-none outline-none"
                placeholder="Name des Videos..."
              />
            </div>{" "}
            Link:
            <div className=" flex my-4 justify-center border border-black rounded-md w-full">
              <input
                id="idvideoLink"
                name="videoLink"
                type="text"
                className="w-full px-2  my-2  h-6 bg-transparent border-none outline-none"
                placeholder="Link zum Video..."
                value={formData.videoLink}
                onChange={handleChange}
              />
            </div>{" "}
            Video-Beschreibung:
            <div className=" flex my-4 justify-center border border-black rounded-md w-full">
              <input
                id="idvideoDescription"
                name="videoDescription"
                type="text"
                className="w-full px-2  my-2  h-6 bg-transparent border-none outline-none"
                placeholder="Video-Beschreibung..."
                value={formData.videoDescription}
                onChange={handleChange}
              />
            </div>{" "}
          </div>
          <div className="flex justify-end items-end my-4  mt-auto">
            <button
              type="submit"
              className="rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px]"
            >
              Speichern {/*Save*/}
            </button>{" "}
            <button
              onClick={onCancel}
              className="btn-rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px] ml-2"
            >
              Abbrechen
              {/* Delete */}
            </button>
          </div>
        </form>
      </>
    </>
  );
};
