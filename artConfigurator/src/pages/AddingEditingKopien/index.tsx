import React, { useEffect, useRef, useState } from "react";
import addPhoto from "./../../assets/icons/addPhoto.svg";
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
  isEditMode
}: AddingEditingKopienProps) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [sizes, setSizes] = useState<CopyData[]>([]);
  const [data, setData] = useState<any>();
  const { uid } = useParams();

  const fetchDataFromApi = async () => {
    try {
      const params = {
        typeOfImage: "isCopy",
        fields:
          "uid,miniImageUrl,description,typeOfImage,copyAttribute,name,fileName"
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
        setData(result);
        setImageData({
          body: undefined,
          url: result.miniImageUrl,
          filename: undefined,
          typeOfImage: result.typeOfImage || ""
        } as ImageDataStructure);

        if (result && result.copyAttribute) {
          setSizes(result.copyAttribute);
        }
        if (result && result.description) {
          setEditorData(result.description);
        }
        if (result && result.name) {
          setEditorDataName(result.name);
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
      [field]: value
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
          filename: file.name
        } as ImageDataStructure);
      };
      reader.readAsDataURL(file);
    }
  };

  // EDITOR
  const [editorData, setEditorData] = useState("");
  const [editorDataName, setEditorDataName] = useState("");
  const handleEditorChange = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };
  const handleEditorChangeName = (_event: any, editor: any) => {
    const data = editor.getData();
    setEditorDataName(data);
  };
  // очистить контент
  const handleClearContent = () => {
    navigate("/copy_paintings");
    setEditorData("");
    setImageData(undefined);
    setSizes([]);
  };

  enum HttpMethod {
    POST,
    PUT
  }

  interface ExChanges {
    result: boolean;
    method: HttpMethod | undefined;
    imgFile: Partial<ImageDataStructure>;
    text: string | undefined;
    name: string | undefined;
    sizes: CopyData[] | undefined;
    fileName?: string;
  }

  // Проверка наличия необходимых данных
  const checkNewData = () => {
    let ex: ExChanges = {
      result: false,
      method: undefined,
      imgFile: { body: undefined, filename: undefined },
      text: undefined,
      sizes: undefined,
      name: undefined,
      fileName: undefined
    };

    // режим добавления - должны быть все данные: файл(body), текст, размеры-цены
    if (!isEditMode) {
      if (
        sizes &&
        sizes.length > 0 &&
        imageData &&
        imageData.body &&
        editorData &&
        editorDataName
      ) {
        ex.method = HttpMethod.POST;
        ex.imgFile = { body: imageData.body, filename: imageData.filename };
        ex.text = editorData;
        ex.name = editorDataName;
        ex.result = true;
        ex.sizes = sizes;

        return ex;
      }
    } else {
      // режим РЕДАКТИРОВАНИЯ - должно быть что-то одно: файл(body), текст, размеры-цены, и имя старого файла для удаления из клаудинари
      if (
        (sizes && sizes.length > 0) ||
        (imageData && imageData.body) ||
        editorData ||
        editorDataName
      ) {
        ex.method = HttpMethod.PUT;
        if (imageData && imageData.body) {
          ex.imgFile = { body: imageData.body, filename: imageData.filename };
          ex.fileName = data.fileName;
        }
        if (editorData) {
          ex.text = editorData;
        }
        if (editorDataName) {
          ex.name = editorDataName;
        }
        if (sizes && sizes.length > 0) {
          ex.sizes = sizes;
        }
        ex.result = true;

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
      if (newData.name) {
        formData.append("name", editorDataName);
      }
      if (newData.sizes) {
        formData.append("sizes", JSON.stringify(sizes));
      }
      if (newData.imgFile.body) {
        formData.append("file", newData.imgFile.body);
        formData.append("fileName", newData.fileName as string);
      }
      formData.append("typeOfImage", "isCopy");

      const headers = {
        "Content-Type": `multipart/form-data;`
      };

      let response;
      if (newData.method == HttpMethod.POST) {
        response = await Post(headers, url, cp, true, formData);
      }
      if (newData.method == HttpMethod.PUT) {
        response = await Put(headers, url, cp + `/${uid}`, true, formData);
      }
      message.success("Gemälde erfolgreich hochgeladen");
      navigate("/copy_paintings");
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
        price: parseFloat(refPrice.current.value)
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
        <div className="font-italiana text-5xl mx-[5%] my-[2%] text-center lg:text-start">
          Kopien
        </div>
        <div
          className={`flex gap-6 justify-around m-[5%] ${
            loader ? "opacity-50" : "opacity-100"
          }`}
        ></div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-around m-[5%] ">
          <div className="flex flex-col justify-start items-center w-[40%]">
            <div className="font-federo text-3xl mb-4">Foto</div>
            <label htmlFor="file-input">
              <img
                className="mb-2 w-full min-w-[200px] cursor-pointer"
                src={img_resource}
              />
            </label>
            <label
              htmlFor="file-input"
              className="w-[100%] flex flex-col lg:flex-row items-center justify-center m-2 cursor-pointer"
            >
              <img className="w-4 h-4" src={addPhoto} />
              {isEditMode ? "Foto ändern" : "Foto hochladen"}
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              id="file-input"
              className="hidden cursor-pointer"
              onChange={handleFileInputChange}
            />
          </div>{" "}
          <div className="w-[80%] m-6">
            {/* {isEditMode && */}
            {sizes && sizes.length > 0 && (
              <div className="bg-[#FFEDCB] w-full xl:w-[80%] ">
                <div className="overflow-x-auto">
                  <table className="min-w-full ">
                    <thead className="bg-[#FFEDCB]">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left font-medium font-federo text-base lg:text-xl"
                        >
                          Größe (cm):
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left font-medium font-federo text-base lg:text-xl whitespace-nowrap "
                        >
                          Preis (Euro):
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-[#FFEDCB] p-4">
                      {sizes.map((row: any, index: number) => (
                        <>
                          {index == currentRow?.index ? (
                            <tr>
                              <td className="px-6 py-2 whitespace-nowrap ">
                                <div className=" flex justify-center items-center border border-black rounded-md min-w-[150px] w-[80%]">
                                  <input
                                    value={currentRow?.width}
                                    onChange={(v) =>
                                      handleChangeCurrentRow("width", v)
                                    }
                                    type="text"
                                    className="w-[70%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                                  />{" "}
                                  X
                                  <input
                                    onChange={(v) =>
                                      handleChangeCurrentRow("height", v)
                                    }
                                    value={currentRow?.height}
                                    type="text"
                                    className="w-[70%] px-2  m-2  h-6 bg-gray-300 border-none outline-none"
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap ">
                                <div className=" flex justify-center border border-black rounded-md ">
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
                              <td className="px-6 py-2 whitespace-nowrap font-federo text-base lg:text-xl ">
                                {row.width} x {row.height}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap font-federo text-base lg:text-xl ">
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
                className="flex flex-col lg:flex-row"
                // onSubmit={handleAddSize}
              >
                <div className="flex flex-col w-[60%] pb-4 font-federo text-xl ">
                  {" "}
                  Größe:{" "}
                  <div className=" flex justify-center items-center border border-black rounded-md w-[120%] lg:w-[70%] mt-2">
                    <input
                      ref={refWidth}
                      id="newWidth"
                      name="width"
                      type="text"
                      className="w-[50%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                    />{" "}
                    X
                    <input
                      ref={refHeigth}
                      id="newHeigth"
                      type="text"
                      name="height"
                      className="w-[50%] px-2  m-2  h-6 bg-gray-300 border-none outline-none"
                    />
                  </div>
                </div>{" "}
                <div className="flex flex-col w-[40%] pb-4 font-federo text-xl">
                  {" "}
                  Preis:{" "}
                  <div className=" flex justify-center items-center border border-black rounded-md w-[120%] lg:w-[70%] mt-2">
                    <input
                      ref={refPrice}
                      id="newPrice"
                      type="text"
                      name="price"
                      className="w-[80%] px-2 m-2 h-6 bg-gray-300 border-none outline-none"
                    />{" "}
                  </div>
                </div>{" "}
                <div className="flex items-end justify-end flex-col pb-4  ">
                  {" "}
                  <div
                    className="btn-primary cursor-pointer w-[130px] h-[45px] ml-2 flex items-center justify-center"
                    onClick={addAttributes}
                  >
                    speichern
                  </div>
                </div>
              </form>
            </div>{" "}
            <div className="font-federo text-3xl mb-4">Bildname</div>
            <CKEditor
              editor={ClassicEditor}
              data={editorDataName}
              config={{
                placeholder:
                  "Geben Sie eine Beschreibung in dieses Feld ein...",
                toolbar: []
              }}
              onChange={(event: any, editor: any) => {
                handleEditorChangeName(event, editor);
              }}
            />
            <div className="font-federo text-3xl my-4">Beschreibung</div>
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              config={{
                placeholder:
                  "Geben Sie eine Beschreibung in dieses Feld ein...",
                toolbar: []
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
