import emptyPhoto from "./../../assets/images/EmptyPhoto.png";
import addPhoto from "./../../assets/images/Add_photo.png";
import { message } from "antd";
import deletePhoto from "./../../assets/images/Delete.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { Put, Get, Post } from "../../api/axiosInstance";
import { useParams } from "react-router-dom";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const IMG = import.meta?.env?.VITE_API_IMAGE;
const BURL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

interface AddingEditingPaintProps {
  isEditMode: boolean;
}

interface EntityDataStructure {
  body: File | undefined;
  url: string | undefined;
  filename: String | undefined;
  typeOfImage: string;
}

const type_A = "isAtelier";
const type_P = "isPainting";

export const AddingEditingPaint = ({ isEditMode }: AddingEditingPaintProps) => {
  const { uid } = useParams();
  //Photo
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

  const [entityDataObject, setEntityDataObject] = useState<
    EntityDataStructure | undefined
  >(undefined);

  useEffect(() => {
    fetchDataFromApi().then((result) =>
      setEntityDataObject({
        body: undefined,
        url: result.miniImageUrl,
        filename: undefined,
        typeOfImage: result.typeOfImage || "",
      } as EntityDataStructure)
    );
  }, []);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const type = entityDataObject?.typeOfImage || "";
      reader.onloadend = () => {
        setEntityDataObject({
          body: file,
          url: undefined,
          filename: file.name,
          typeOfImage: type,
        } as EntityDataStructure);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeletePhoto = () => {
    const confirmation = window.confirm(
      "Sind Sie sicher, dass Sie das ausgewählte Foto löschen möchten?"
    );
    if (confirmation) {
      setEntityDataObject(undefined); //если удалили фото - удаляем все данные о нем
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Сбрасываем значение input, чтобы можно было заново выбрать тот же файл
      }
    }
  };

  const default_text = "Geben Sie eine Beschreibung in dieses Feld ein...";

  const [editorData, setEditorData] = useState(default_text);

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEntityDataObject((prevEntityDataObject) => {
      if (prevEntityDataObject) {
        return { ...prevEntityDataObject, typeOfImage: value };
      } else {
        return {
          typeOfImage: value,
          body: undefined,
          url: undefined,
          filename: undefined,
        };
      }
    });
  };

  // очистить контент
  const handleClearContent = () => {
    setEditorData(default_text);
    setEntityDataObject(undefined);
  };

  // Проверка наличия необходимых данных
  const checkData = () => {
    if (!entityDataObject || !entityDataObject.typeOfImage || !editorData) {
      alert("Nicht alle Daten sind ausgefüllt");
      return false;
    }
    return true;
  };

  // отправка данных
  const handleSaveClick = async () => {
    if (checkData()) {
      try {
        if (!isEditMode) {
          const formData = new FormData();
          formData.append("description", editorData);
          formData.append("typeOfImage", entityDataObject!.typeOfImage);
          if (entityDataObject?.body) {
            formData.append("file", entityDataObject.body);
          }
          const headers = {
            "Content-Type": `multipart/form-data;`,
          };
          const response = await Post(headers, BURL, IMG, true, formData);
          console.log(response);
          message.success("Painting successfully uploaded");
          return response.data;
        } else {
          const headers = {
            "Content-Type": "application/json",
          };
          const payload = {
            description: editorData,
            typeOfImage: entityDataObject?.typeOfImage,
          };
          const response = await Put(
            headers,
            BURL,
            IMG + "/" + uid,
            true,
            payload
          );
          console.log(response);
          message.success("Painting successfully uploaded");
          return response.data;
        }
      } catch (res: any) {
        message.error(res);
      }
    }
  };

  let img_resource = emptyPhoto;
  if (entityDataObject && entityDataObject.body) {
    img_resource = URL.createObjectURL(entityDataObject.body);
  } else if (entityDataObject && entityDataObject.url) {
    img_resource = entityDataObject.url;
  }

  return (
    <MainLayout>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">
        Bearbeiten der Gemälde Seite
      </div>
      <div className="flex gap-6 justify-around m-[5%]">
        <div className="flex flex-col justify-start items-center w-[40%]">
          <div className="font-federo text-3xl mb-4">Foto</div>
          <label htmlFor="file-input">
            <img className="mb-2" src={img_resource} />
          </label>
          {isEditMode ? (
            <button className="w-[100%] flex justify-center m-2 ">
              <img src={addPhoto} /> Foto ändern {/* Change photo */}
            </button>
          ) : (
            <button
              className="w-[100%] flex justify-center m-2"
              onClick={handleDeletePhoto}
            >
              <img src={deletePhoto} /> Foto löschen {/*Delete photo*/}
            </button>
          )}{" "}
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
          />
          <div className="flex justify-end m-6">
            <div className="font-federo text-2xl mr-6">Auf Seite posten: </div>
            <div className="flex flex-col items-start mb-4 w-[20%]">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                id="file-input"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  checked={entityDataObject?.typeOfImage === "isPainting"}
                  value={type_P}
                  name="default-radio"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-[#895C06] bg-gray-100 border-[#895C06] focus:ring-[#895C06] dark:focus:ring-[#895C06] dark:ring-[#895C06] focus:ring-2 dark:bg-gray-700 dark:border-[#895C06]"
                ></input>
                <label
                  htmlFor="default-radio-1"
                  className="font-federo text-2xl text-gray-900 dark:text-gray-300 ml-2"
                >
                  Gemälde
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  checked={entityDataObject?.typeOfImage === "isAtelier"}
                  value={type_A}
                  name="default-radio"
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-[#895C06] bg-gray-100 border-[#895C06] focus:ring-[#895C06] dark:focus:ring-[#895C06] dark:ring-[#895C06] focus:ring-2 dark:bg-gray-700 dark:border-[#895C06]"
                ></input>
                <label
                  htmlFor="default-radio-2"
                  className="font-federo text-2xl text-gray-900 dark:text-gray-300 ml-2"
                >
                  Atelier
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end my-4">
            <button className="btn-primary" onClick={handleClearContent}>
              abbrechen {/* cancel */}
            </button>{" "}
            <button className="btn-primary ml-2" onClick={handleSaveClick}>
              speichern {/* save */}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
