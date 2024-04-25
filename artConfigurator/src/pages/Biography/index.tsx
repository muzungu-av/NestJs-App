import elipse from "../../assets/images/Ellipse.png";
import addPhoto from "./../../assets/images/Add_photo.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Get, Post } from "../../api/axiosInstance";
import { message } from "antd";
import { Spinner } from "../../components/Spinner";

interface ImageDataStructure {
  body: File | undefined;
  url: string | undefined;
  filename: String | undefined;
}

export const Biography = () => {
  const [editorData, setEditorData] = useState("");
  const [imageData, setImageData] = useState<ImageDataStructure | undefined>(
    undefined
  );
  const [loader, setLoader] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
  const bio = import.meta?.env?.VITE_API_BIO;
  const BURL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

  useEffect(() => {
    fetchDataFromApi().then((result) => {
      setEditorData(result.text_bio);
      setImageData({
        body: undefined,
        url: result.imgUrl,
        filename: undefined
      } as ImageDataStructure);
      setEditorData(result.text_bio);
    });
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const response = await Get(undefined, BURL, `${bio}`, false);
      return response.data;
    } catch (error) {
      message.error("Error fetching data from backend");
      console.error("Error fetching data from backend:", error);
      return null;
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
          filename: file.name
        } as ImageDataStructure);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkData = () => {
    console.log("body = " + imageData?.body);
    console.log("url = " + imageData?.url);
    if (!imageData || !imageData?.body || !editorData) {
      message.error("Nicht alle Daten sind ausgefüllt");
      return false;
    }
    return true;
  };
  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleCancelClick = async () => {
    fetchDataFromApi().then((result) => {
      setEditorData(result.text_bio);
      setImageData({
        body: undefined,
        url: result.imgUrl,
        filename: undefined
      } as ImageDataStructure);
      setEditorData(result.text_bio);
    });
  };

  const handleSaveClick = async () => {
    if (checkData()) {
      try {
        setLoader(true);

        const formData = new FormData();
        formData.append("text_bio", editorData);
        if (imageData?.body) {
          formData.append("file", imageData.body);
        }
        const headers = {
          "Content-Type": `multipart/form-data;`
        };
        const response = await Post(headers, BURL, bio, true, formData);

        message.success("Gemälde erfolgreich hochgeladen");
        return response.data;
      } catch (e) {
        message.error("Das Bild ist nicht ausgewählt oder existiert bereits");
      } finally {
        setLoader(false);
      }
    }
  };

  let img_resource = elipse;
  if (imageData && imageData.body) {
    img_resource = URL.createObjectURL(imageData.body);
  } else if (imageData && imageData.url) {
    img_resource = imageData.url;
  }
  const handleTextClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <MainLayout>
        {loader && <Spinner />}
        <div className="font-italiana text-5xl px-[5%] my-[2%]">
          Bearbeiten der Biografie Seite
        </div>
        <div
          className={`flex justify-around mx-[5%] ${
            loader ? "opacity-50" : "opacity-100"
          }`}
        >
          <div className="flex flex-col justify-start items-center w-[40%]">
            <div className="font-federo text-3xl mb-4">Foto</div>
            <div className="w-60 h-60 rounded-full overflow-hidden">
              <label htmlFor="file-input">
                <img
                  className="w-full h-full object-cover"
                  src={img_resource}
                  alt="Avatar"
                />
              </label>
            </div>
            <div
              onClick={handleTextClick}
              className="w-[100%] flex justify-center m-2 cursor-pointer "
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="file-input"
                className="hidden"
                onChange={handleFileInputChange}
              />{" "}
              <img src={addPhoto} /> Foto ändern
            </div>{" "}
          </div>{" "}
          <div className="w-[60%] px-[5%]">
            <div className="font-federo text-3xl mb-4">Beschreibung</div>
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              config={{
                toolbar: []
              }}
              onChange={(event: any, editor: any) => {
                handleEditorChange(event, editor);
              }}
            />
            <div className="flex justify-end my-4">
              <button className="btn-primary" onClick={handleCancelClick}>
                abbrechen
              </button>{" "}
              <button onClick={handleSaveClick} className="btn-primary ml-2">
                speichern
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
