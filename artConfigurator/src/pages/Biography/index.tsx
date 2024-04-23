import elipse from "../../assets/images/Ellipse.png";
import addPhoto from "./../../assets/images/Add_photo.png";
// import deletePhoto from "./../../assets/images/Delete.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Get, Put } from "../../api/axiosInstance";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { Spinner } from "../../components/Spinner";

interface ImageDataStructure {
  body: File | undefined;
  url: string | undefined;
  filename: String | undefined;
  typeOfImage: string;
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
  const IMG = import.meta?.env?.VITE_API_IMAGE;
  const BURL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";
  const { uid } = useParams();
  useEffect(() => {
    fetchDataFromApi().then((result) => {
      setEditorData(result.description);
      setImageData({
        body: undefined,
        url: result.miniImageUrl,
        filename: undefined,
        typeOfImage: result.typeOfImage || "",
      } as ImageDataStructure);
    });
  }, []);

  const fetchDataFromApi = async () => {
    try {
      const params = { fields: "uid,miniImageUrl,description,typeOfImage" };
      const response = await Get(
        undefined,
        BURL,
        `${IMG}/${uid}`,
        false,
        params
      );
      return response.data;
    } catch (error) {
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
      const type = imageData?.typeOfImage || "";
      reader.onloadend = () => {
        setImageData({
          body: file,
          url: undefined,
          filename: file.name,
          typeOfImage: type,
        } as ImageDataStructure);
      };
      reader.readAsDataURL(file);
    }
  };
  // console.log("imageData", imageData);
  // const handleDeletePhoto = () => {
  //   const confirmation = window.confirm(
  //     "Sind Sie sicher, dass Sie das ausgewählte Foto löschen möchten?"
  //   );
  //   if (confirmation) {
  //     setImageData(undefined); //если удалили фото - удаляем все данные о нем
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = ""; // Сбрасываем значение input, чтобы можно было заново выбрать тот же файл
  //     }
  //   }
  // };
  const checkData = () => {
    if (!imageData || !imageData?.typeOfImage || !editorData) {
      message.error("Nicht alle Daten sind ausgefüllt");
      return false;
    }
    return true;
  };
  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };
  // отправка данных
  const handleSaveClick = async () => {
    console.log("checkData()", checkData());
    if (checkData()) {
      try {
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
        };
        const payload = {
          description: editorData,
          typeOfImage: imageData?.typeOfImage,
        };
        const response = await Put(
          headers,
          BURL,
          IMG + "/" + uid,
          true,
          payload
        );
        console.log("response2", response);
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
    // При клике на текст "Foto ändern" вызываем клик на скрытый input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <>
      <MainLayout>
        {loader && <Spinner />}
        <div className="font-italiana text-5xl mx-[5%] my-[2%]">
          Bearbeiten der Biografie Seite
        </div>
        <div
          className={`flex justify-around m-[5% ${
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
            {/* <img className="mb-2" /> */}
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
            {/* <button
              onClick={handleDeletePhoto}
              className="w-[100%] flex justify-center m-2"
            >
              <img src={deletePhoto} /> Foto löschen
            </button> */}
          </div>{" "}
          <div className="w-[60%]">
            <div className="font-federo text-3xl mb-4">Beschreibung</div>
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              config={{
                toolbar: [],
              }}
              onChange={(event: any, editor: any) => {
                handleEditorChange(event, editor);
              }}
              // onBlur={(event, editor) => {
              //   console.log("Blur.", editor);
              // }}
              // onFocus={(event, editor) => {
              //   console.log("Focus.", editor);
              // }}
            />
            <div className="flex justify-end my-4">
              <button className="btn-primary">abbrechen</button>{" "}
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
