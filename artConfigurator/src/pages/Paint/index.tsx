import emptyPhoto from "./../../assets/images/EmptyPhoto.png";
import addPhoto from "./../../assets/images/Add_photo.png";
import editPhoto from "./../../../../frontend/src/assets/images/BoatPicture.jpg";
import deletePhoto from "./../../assets/images/Delete.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRef, useState } from "react";

interface AddingEditingPaintProps {
  isEditMode: boolean;
}
export const AddingEditingPaint = ({ isEditMode }: AddingEditingPaintProps) => {
  //Photo
  const [selectedPhoto, setSelectedPhoto] = useState<string | undefined>(
    undefined
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result as string);
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

  // Text Editor
  const default_text = "Geben Sie eine Beschreibung in dieses Feld ein...";

  const [editorData, setEditorData] = useState(default_text);

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  // Radio
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
  const handleSaveClick = () => {
    console.log("Selected radio value:", radioValue); //Painting G      Atelier  A
    console.log("Selected PHOTO value:", selectedPhoto);
    // Удаление HTML-тегов для получения простого текста
    // let plainText = editorData
    //   .replace(/&[^;]+;/g, "")
    //   .replace(/<\/p>/g, "\n")
    //   .replace(/<p>/g, "");
    console.log(editorData);
  };

  return (
    <>
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
              <img className="mb-2" src={selectedPhoto || emptyPhoto} />
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
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
          <div className="flex justify-end m-6">
            <div className="font-federo text-2xl mr-6">Auf Seite posten: </div>
            <div className="flex flex-col items-start mb-4 w-[20%]">
              {/* Скрытый input для выбора файла */}
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
                  value="G"
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
                  value="A"
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
    </>
  );
};
