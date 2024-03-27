import React, { useState } from "react";
import photo from "./../../assets/images/EmptyPhoto.png";
import addPhoto from "./../../assets/images/Add_photo.png";
import editPhoto from "./../../../../frontend/src/assets/images/BoatPicture.jpg";
import editRecord from "./../../assets/images/EditRecord.svg";
import deletePhoto from "./../../assets/images/Delete.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { loremIpsum } from "lorem-ipsum";
interface AddingEditingKopienProps {
  isEditMode: boolean;
}
export const AddingEditingKopien = ({
  isEditMode
}: AddingEditingKopienProps) => {
  const sizesData = [
    { width: "40", height: "50", price: "120.00 " },
    { width: "60", height: "70", price: "420.00 " }
  ];
  const [currentRow, setCurrentRow] = useState<any>();
  const [sizes, setSizes] = useState<any>(sizesData);
  const handleCheckRow = (index: number) => {
    const newRow = { ...sizes[index], index };

    setCurrentRow(newRow);
  };

  const handleDeleteRow = (index: number) => {
    const newData = [...sizes];
    newData.splice(index, 1);

    setSizes(newData);
    setCurrentRow({});
  };

  const handleChangeCurrentRow = (
    field: string,
    { target: { value } }: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentRow((prevState: any) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSaveCurrentRow = (index: number) => {
    const newData = [...sizes];
    newData[index] = currentRow;
    setSizes(newData);
    setCurrentRow({});
  };

  // const handleEditorChange = (event: any, editor: any) => {
  //   const data = editor.getData();
  // };

  const handleAddSize = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      formObject[key as string] = value as string;
    });

    setSizes((prev: any) => [...prev, formObject]);
    event.currentTarget.reset();
  };

  return (
    <>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">Kopien</div>
      <div className="flex justify-around m-[5%]">
        <div className="flex flex-col justify-start items-center w-[40%]">
          <div className="font-federo text-3xl mb-4">Foto</div>
          {isEditMode ? (
            <img className="mb-2" src={editPhoto} />
          ) : (
            <img className="mb-2" src={photo} />
          )}
          {isEditMode ? (
            <button className="w-[100%] flex justify-center m-2 ">
              <img src={addPhoto} /> Foto ändern
            </button>
          ) : (
            <button className="w-[100%] flex justify-center m-2">
              <img src={deletePhoto} /> Foto löschen
            </button>
          )}{" "}
        </div>{" "}
        <div className="w-[60%]">
          {isEditMode && (
            <div className="bg-[#FFEDCB] w-[60%]">
              <div className="overflow-x-auto">
                <table className="min-w-full ">
                  <thead className="bg-[#FFEDCB]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left font-medium font-federo text-xl"
                      >
                        Größe (cm) :
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left font-medium font-federo text-xl "
                      >
                        Preis (Euro) :
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-[#FFEDCB] p-4">
                    {sizes.map((row: any, index: number) => (
                      <>
                        {index == currentRow?.index ? (
                          <tr>
                            <td className="px-6 py-2 whitespace-nowrap">
                              <div className=" flex justify-center items-center border border-black rounded-md w-[80%]">
                                <input
                                  value={currentRow?.width}
                                  onChange={(v) =>
                                    handleChangeCurrentRow("width", v)
                                  }
                                  type="text"
                                  className="w-[30%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                                />{" "}
                                X
                                <input
                                  onChange={(v) =>
                                    handleChangeCurrentRow("height", v)
                                  }
                                  value={currentRow?.height}
                                  type="text"
                                  className="w-[30%] px-2  m-2  h-6 bg-gray-300 border-none outline-none"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              <div className=" flex justify-center border border-black rounded-md w-[70%]">
                                {" "}
                                <input
                                  onChange={(v) =>
                                    handleChangeCurrentRow("price", v)
                                  }
                                  value={currentRow?.price}
                                  placeholder="0.00"
                                  type="text"
                                  className="w-[80%] px-2  m-2  h-6 bg-gray-300 border-none outline-none"
                                />
                              </div>
                            </td>

                            <td className="px-2 pt-4 pb-2 flex justify-around ">
                              <svg
                                onClick={() => handleSaveCurrentRow(index)}
                                className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M5 11.917 9.724 16.5 19 7.5"
                                />
                              </svg>

                              <svg
                                onClick={() => setCurrentRow({})}
                                className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"
                                />
                              </svg>
                            </td>
                          </tr>
                        ) : (
                          <tr key={index}>
                            <td className="px-6 py-2 whitespace-nowrap font-federo text-xl ">
                              {row.width} x {row.height}
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap font-federo text-xl ">
                              {row.price}
                            </td>
                            <td className="px-2 py-2 flex justify-around">
                              <img
                                className=" cursor-pointer"
                                src={editRecord}
                                onClick={() => handleCheckRow(index)}
                              />{" "}
                              <img
                                className=" cursor-pointer"
                                src={deletePhoto}
                                onClick={() => handleDeleteRow(index)}
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div>
            <div className="py-4 font-federo text-2xl ">
              {" "}
              Einstellungen auswählen:
            </div>
            <form className="flex" onSubmit={handleAddSize}>
              <div className="flex flex-col w-[30%] pb-4 font-federo text-xl ">
                {" "}
                Größe:{" "}
                <div className=" flex justify-center items-center border border-black rounded-md w-[70%] mt-2">
                  <input
                    id="newWidth"
                    name="width"
                    type="text"
                    className="w-[30%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                  />{" "}
                  X
                  <input
                    type="text"
                    name="height"
                    className="w-[30%] px-2  m-2  h-6 bg-gray-300 border-none outline-none"
                  />
                </div>
              </div>{" "}
              <div className="flex flex-col w-[20%] pb-4 font-federo text-xl">
                {" "}
                Preis:{" "}
                <div className=" flex justify-center items-center border border-black rounded-md w-[70%] mt-2">
                  <input
                    type="text"
                    name="price"
                    className="w-[80%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                  />{" "}
                </div>
              </div>{" "}
              <div className="flex items-end justify-end flex-col w-[20%] pb-4 ">
                {" "}
                <button
                  type="submit"
                  className="btn-primary w-[130px] h-[45px] ml-2"
                >
                  speichern
                </button>
              </div>
            </form>
          </div>
          <div className="font-federo text-3xl mb-4">Beschreibung</div>
          <CKEditor
            editor={ClassicEditor}
            data={loremIpsum({
              count: 13,
              format: "plain",
              units: "sentences"
            })}
            config={{
              toolbar: []
            }}
            // onChange={(event: any, editor: any) => {
            //   handleEditorChange(event, editor);
            // }}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
          <div className="flex justify-end my-4">
            <button className="btn-primary w-[130px] h-[45px]">
              abbrechen
            </button>{" "}
            <button className="btn-primary w-[130px] h-[45px] ml-2">
              speichern
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
