import emptyPhoto from "./../../assets/images/EmptyPhoto.png";
import addPhoto from "./../../assets/images/Add_photo.png";
import editPhoto from "./../../../../frontend/src/assets/images/BoatPicture.jpg";
import deletePhoto from "./../../assets/images/Delete.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MainLayout from "../../layouts/MainLayout";
import { useRef, useState } from "react";
import { post } from "../../api/axiosInstance";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const IMG = import.meta?.env?.VITE_API_IMAGE;
const BURL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

interface AddingEditingPaintProps {
  isEditMode: boolean;
}

interface Fdata {
  body: File;
  filename: String;
}

const type_A = "isAtelier";
const type_P = "isPainting";

export const AddingEditingPaint = ({ isEditMode }: AddingEditingPaintProps) => {
  //Photo
  const [selectedPhoto, setSelectedPhoto] = useState<Fdata | undefined>(
    undefined
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto({ body: file, filename: file.name } as Fdata);
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
      setSelectedPhoto(undefined);
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

  // radio
  const [radioValue, setRadioValue] = useState<string | undefined>();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
  };

  // очистить контент
  const handleClearContent = () => {
    setEditorData(default_text);
    setSelectedPhoto(undefined);
  };

  // отправка данных
  const handleSaveClick = async () => {
    // Удаление HTML-тегов для получения простого текста
    // let plainText = editorData
    //   .replace(/&[^;]+;/g, "")
    //   .replace(/<\/p>/g, "\n")
    //   .replace(/<p>/g, "");
    // console.log(editorData);

    if (selectedPhoto && radioValue && editorData) {
      const formData = new FormData();
      formData.append("file", selectedPhoto.body);
      formData.append("description", editorData);
      formData.append("typeOfImage", radioValue);
      const headers = {
        "Content-Type": `multipart/form-data;`,
      };
      //todo добавить Сообщение об успешной неуспешной доставке изрбражения
      const response = await post(headers, BURL, IMG, true, formData);
      return response.data;
    } else {
      console.error("Какие-то проблеммы...");
      //todo добавить Сообщение в случае, если: 1) файл не выбран 2) поле описание не заполнено  3) не выбрано знач в Radio кнопках
    }
  };

  return (
    <MainLayout>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">
        Bearbeiten der Gemälde Seite
      </div>
      <div className="flex justify-around m-[5%]">
        <div className="flex flex-col justify-start items-center w-[40%]">
          <div className="font-federo text-3xl mb-4">Foto</div>
          <label htmlFor="file-input">
            {isEditMode ? (
              <img className="mb-2" src={editPhoto} />
            ) : (
              <img
                className="mb-2"
                src={
                  selectedPhoto
                    ? URL.createObjectURL(selectedPhoto.body)
                    : emptyPhoto
                }
              />
            )}
          </label>
          {isEditMode ? (
            <button className="w-[100%] flex justify-center m-2 ">
              <img src={addPhoto} /> Foto ändern
            </button>
          ) : (
            <button
              className="w-[100%] flex justify-center m-2"
              onClick={handleDeletePhoto}
            >
              <img src={deletePhoto} /> Foto löschen
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
              abbrechen
            </button>{" "}
            <button className="btn-primary ml-2" onClick={handleSaveClick}>
              speichern
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
