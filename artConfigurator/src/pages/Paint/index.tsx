import emptyPhoto from "./../../assets/images/EmptyPhoto.png";
import addPhoto from "./../../assets/images/Add_photo.png";
import editPhoto from "./../../../../frontend/src/assets/images/BoatPicture.jpg";
import deletePhoto from "./../../assets/images/Delete.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { loremIpsum } from "lorem-ipsum";
import { useState } from "react";
interface AddingEditingPaintProps {
  isEditMode: boolean;
}
export const AddingEditingPaint = ({ isEditMode }: AddingEditingPaintProps) => {
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

  const handleDeletePhoto = () => {
    const confirmation = window.confirm(
      "Sind Sie sicher, dass Sie das ausgewählte Foto löschen möchten?"
    );
    if (confirmation) {
      setSelectedPhoto(undefined);
    }
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    console.log({ event, editor, data });
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
            data={loremIpsum({
              count: 33,
              format: "plain",
              units: "sentences",
            })}
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
              <input
                type="file"
                accept="image/*"
                id="file-input"
                className="hidden" // Скрываем input для выбора файла
                onChange={handleFileInputChange}
              />

              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
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
                  value=""
                  name="default-radio"
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
            <button className="btn-primary">abbrechen</button>{" "}
            <button className="btn-primary ml-2">speichern</button>
          </div>
        </div>
      </div>
    </>
  );
};
