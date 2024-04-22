import React, { useEffect, useRef, useState } from "react";
import addPhoto from "./../../assets/images/Add_photo.png";
import Empty from "./../../assets/images/EmptyPhoto.png";
import editRecord from "./../../assets/images/EditRecord.svg";
import deletePhoto from "./../../assets/images/Delete.svg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MainLayout from "../../layouts/MainLayout";
import { message } from "antd";
import { Get, Post, Put } from "../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../components/Spinner";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const cp = import.meta?.env?.VITE_API_COPY;
const img = import.meta?.env?.VITE_API_IMAGE;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

interface AddingEditingKopienProps {
  isEditMode: boolean;
}

interface ImageDataStructure {
  body: File | undefined;
  url: string | undefined;
  filename: String | undefined;
  // priceAttr: CopyData[] | undefined;
}

interface CopyData {
  width: number;
  height: number;
  price: number;
}

export const AddingEditingKopien = ({
  isEditMode,
}: AddingEditingKopienProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [sizes, setSizes] = useState<CopyData[]>([]);

  const { uid } = useParams();
  console.log(isEditMode);
  const fetchDataFromApi = async () => {
    try {
      const params = {
        typeOfImage: "isCopy",
        fields: "uid,miniImageUrl,description,typeOfImage,copyAttribute",
      };
      const response = await Get(
        undefined,
        url,
        img + `/type/${uid}`,
        false,
        params
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      return null;
    }
  };

  useEffect(() => {
    if (uid) {
      fetchDataFromApi().then((result) => {
        setImageData({
          body: undefined,
          url: result.miniImageUrl,
          filename: undefined,
          typeOfImage: result.typeOfImage || "",
        } as ImageDataStructure);

        if (result && result.copyAttribute) {
          setSizes(result.copyAttribute);
        }
        if (result && result.description) {
          setEditorData(result.description);
        }
      });
      imgUpd();
    }
  }, []);

  const [currentRow, setCurrentRow] = useState<any>();
  const handleCheckRow = (index: number) => {
    const newRow = { ...sizes[index], index };
    setCurrentRow(newRow);
  };
  const navigate = useNavigate();
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
      [field]: value,
    }));
  };

  const handleSaveCurrentRow = (index: number) => {
    const newData = [...sizes];
    newData[index] = currentRow;
    setSizes(newData);
    setCurrentRow({});
  };

  //image
  const [imageData, setImageData] = useState<ImageDataStructure | undefined>(
    undefined
  );

  /* единый источник изображения для тега img */
  let img_resource = Empty;

  const imgUpd = () => {
    if (imageData && imageData.body) {
      img_resource = URL.createObjectURL(imageData.body);
    } else if (imageData && imageData.url) {
      img_resource = imageData.url;
    }
  };

  imgUpd();

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

  // EDITOR
  const default_text = "Geben Sie eine Beschreibung in dieses Feld ein...";

  const [editorData, setEditorData] = useState(default_text);

  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  // очистить контент
  const handleClearContent = () => {
    navigate("/copy_paintings");
    setEditorData(default_text);
    setImageData(undefined);
    setSizes([]);
  };

  enum HttpMethod {
    POST,
    PUT,
  }

  interface ExChanges {
    result: boolean;
    method: HttpMethod | undefined;
    imgFile: Partial<ImageDataStructure>;
    text: string | undefined;
    sizes: CopyData[] | undefined;
  }

  // Проверка наличия необходимых данных
  const checkNewData = () => {
    let ex: ExChanges = {
      result: false,
      method: undefined,
      imgFile: { body: undefined, filename: undefined },
      text: undefined,
      sizes: undefined,
    };
    // режим добавления - должны быть все данные: файл(body), текст, размеры-цены
    if (!isEditMode) {
      if (
        sizes &&
        sizes.length > 0 &&
        imageData &&
        imageData.body &&
        editorData
      ) {
        ex.method = HttpMethod.POST;
        ex.imgFile = { body: imageData.body, filename: imageData.filename };
        ex.text = editorData;
        ex.result = true;
        ex.sizes = sizes;
        console.log("POST");
        console.log(JSON.stringify(ex));
        return ex;
      }
    } else {
      // режим РЕДАКТИРОВАНИЯ - должны быть что-то одно: файл(body), текст, размеры-цены
      if (
        (sizes && sizes.length > 0) ||
        (imageData && imageData.body) ||
        editorData
      ) {
        console.log("PUT");
        ex.method = HttpMethod.PUT;
        if (imageData && imageData.body) {
          ex.imgFile = { body: imageData.body, filename: imageData.filename };
        }
        if (editorData) {
          ex.text = editorData;
        }
        if (sizes && sizes.length > 0) {
          ex.sizes = sizes;
        }
        ex.result = true;
        console.log(JSON.stringify(ex));
        return ex;
      }
    }
    console.log("Nicht alle Daten sind ausgefüllt");
    message.error("Nicht alle Daten sind ausgefüllt");
    ex.result = false;
    return ex;
  };

  //отправка
  const handleSaveClick = async () => {
    const newData = checkNewData();
    if (newData.result == false) {
      return;
    }

    try {
      setLoader(true);
      const formData = new FormData();
      if (newData.text) {
        formData.append("description", editorData);
      }
      if (newData.sizes) {
        formData.append("sizes", JSON.stringify(sizes));
      }
      if (newData.imgFile.body) {
        formData.append("file", newData.imgFile.body);
        formData.append("fileName", newData.imgFile.filename as string);
      }
      formData.append("typeOfImage", "isCopy");
      const headers = {
        "Content-Type": `multipart/form-data;`,
      };
      let response;
      if (newData.method == HttpMethod.POST) {
        response = await Post(headers, url, cp, true, formData);
      }
      if (newData.method == HttpMethod.PUT) {
        response = await Put(headers, url, cp + `/${uid}`, true, formData);
      }
      message.success("Painting successfully uploaded");
      return response.data;
      // }
    } catch (e) {
      message.error("Das Bild ist nicht ausgewählt oder existiert bereits");
    } finally {
      setLoader(false);
    }
  };

  const refWidth = useRef<HTMLInputElement>(null);
  const refHeigth = useRef<HTMLInputElement>(null);
  const refPrice = useRef<HTMLInputElement>(null);

  const addAttributes = () => {
    if (
      refPrice.current &&
      refPrice.current.value &&
      refHeigth.current &&
      refHeigth.current.value &&
      refWidth.current &&
      refWidth.current.value
    ) {
      const newSize = {
        width: parseFloat(refWidth.current.value),
        height: parseFloat(refHeigth.current.value),
        price: parseFloat(refPrice.current.value),
      };
      setSizes((prevSizes) => [...prevSizes, newSize]);
      refPrice.current.value = "";
      refHeigth.current.value = "";
      refWidth.current.value = "";
    } else {
      message.error("Nicht alle Daten sind ausgefüllt");
    }
  };

  return (
    <>
      <MainLayout>
        {loader && <Spinner />}
        <div className="font-italiana text-5xl mx-[5%] my-[2%]">Kopien</div>
        <div
          className={`flex gap-6 justify-around m-[5%] ${
            loader ? "opacity-50" : "opacity-100"
          }`}
        ></div>
        <div className="flex justify-around m-[5%]">
          <div className="flex flex-col justify-start items-center w-[40%]">
            <div className="font-federo text-3xl mb-4">Foto</div>
            <label htmlFor="file-input">
              <img className="mb-2" src={img_resource} />
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              id="file-input"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <button
              // onClick={handleTextClick}
              className="w-[100%] flex justify-center m-2 "
            >
              <img src={addPhoto} /> Foto ändern
            </button>
          </div>{" "}
          <div className="w-[60%]">
            {/* {isEditMode && */}
            {sizes && sizes.length > 0 && (
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
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
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
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
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
            {/* КОНЕЦ РЕЖИМА РЕДАКТИРОВАНИЯ */}
            <div>
              <div className="py-4 font-federo text-2xl ">
                {" "}
                Einstellungen auswählen:
              </div>
              {}
              <form
                className="flex"
                // onSubmit={handleAddSize}
              >
                <div className="flex flex-col w-[30%] pb-4 font-federo text-xl ">
                  {" "}
                  Größe:{" "}
                  <div className=" flex justify-center items-center border border-black rounded-md w-[70%] mt-2">
                    <input
                      ref={refWidth}
                      id="newWidth"
                      name="width"
                      type="text"
                      className="w-[30%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                    />{" "}
                    X
                    <input
                      ref={refHeigth}
                      id="newHeigth"
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
                      ref={refPrice}
                      id="newPrice"
                      type="text"
                      name="price"
                      className="w-[80%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                    />{" "}
                  </div>
                </div>{" "}
                <div className="flex items-end justify-end flex-col w-[20%] pb-4 ">
                  {" "}
                  <div
                    className="btn-primary w-[130px] h-[45px] ml-2 flex items-center justify-center"
                    onClick={addAttributes}
                  >
                    speichern
                  </div>
                </div>
              </form>
            </div>
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
            <div className="flex justify-end my-4">
              <button
                className="btn-primary w-[130px] h-[45px]"
                onClick={handleClearContent}
              >
                abbrechen
              </button>{" "}
              <button
                className="btn-primary w-[130px] h-[45px] ml-2"
                onClick={handleSaveClick}
              >
                speichern
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
// function setLoader(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
