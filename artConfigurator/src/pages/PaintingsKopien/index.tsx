import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Delete, Get } from "../../api/axiosInstance";
import { Modal, message } from "antd";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const img = import.meta?.env?.VITE_API_IMAGE;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

type CopiesSectionProps = {
  uid: string;
  typeOfImage: string;
  miniImageUrl: string;
  description: string;
  name: string;
};

export const PaintingsKopien = () => {
  const navigate = useNavigate();

  const fetchDataFromApi = async () => {
    try {
      const params = {
        fields:
          "uid,miniImageUrl,description,typeOfImage,name,fileName,createdAt", //включение "createdAt" - включает сортировку
      };
      const response = await Get(
        undefined,
        url,
        img + "/type?typeOfImage=isCopy",
        false,
        params
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      return null;
    }
  };

  const handleDeleteClick = async (v: any) => {
    Modal.confirm({
      title: "Möchten Sie löschen?",
      icon: null, // Чтобы убрать значок (по умолчанию он есть)
      okText: "Ja",
      okType: "danger",
      cancelText: "Nein",
      async onOk() {
        //const params = { fileName: v.fileName, id: v.uid };
        try {
          await Delete(url, img + `/copy/${v.uid}`, true);
          fetchDataFromApi().then((result) => setCopies(result));
          message.success("Erfolgreich gelöscht");
        } catch (error) {
          console.error("Fehler beim Löschen:", error);
          message.error("Fehler beim Löschen");
        }
      },

      onCancel() {},
    });
  };

  const [copies, setCopies] = useState<CopiesSectionProps[] | null>(null);

  useEffect(() => {
    fetchDataFromApi().then((result) => setCopies(result));
  }, []);

  return (
    <MainLayout>
      <div className="font-italiana text-2xl lg:text-5xl mx-[5%] my-[2%]">
        Kopien
      </div>
      <button
        onClick={() => navigate("/add_copy")}
        className="btn-primary w-[180px] lg:w-[230px] h-[45px] p-0 text-sm lg:text-base  mx-[5%]"
      >
        Neue Kopie hinzufügen +
      </button>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">
        {copies &&
          copies.length > 0 &&
          copies.map((v: any, index: number) => {
            return (
              <div className="flex flex-col lg:flex-row my-[5%] " key={index}>
                <div className="min-w-[30%] lg:w-[20%] max-w-[30%] h-auto">
                  {" "}
                  <img
                    src={v.miniImageUrl}
                    className="w-full min-w-[180px] max-h-[400px]"
                  />
                </div>
                <div className="flex min-w-[35%] mr-4">
                  <div className="flex flex-col w-[50%] mx-4">
                    {v?.copyAttribute
                      ?.slice(0, Math.ceil(v.copyAttribute.length / 2))
                      .map(
                        (
                          { width, height }: { width: number; height: number },
                          index: number
                        ) => (
                          <button
                            key={index}
                            className="btn-size w-fit min-w-[100px] lg:max-w-[150px] h-[35px] m-2 text-sm"
                          >
                            {width} x {height} cm
                          </button>
                        )
                      )}
                  </div>
                  <div className="flex flex-col w-[50%]  mr-4">
                    {v.copyAttribute
                      ?.slice(Math.ceil(v?.copyAttribute.length / 2))
                      .map(
                        (
                          { width, height }: { width: number; height: number },
                          index: number
                        ) => (
                          <button
                            key={index}
                            className="btn-size w-fit min-w-[100px] h-[35px] lg:max-w-[150px] m-2 text-sm"
                          >
                            {width} x {height} cm
                          </button>
                        )
                      )}
                  </div>
                </div>
                <div className=" relative flex w-[20%]  ">
                  <div className=" absolute h-[80%] bg-black w-1 top-0 left-0 "></div>{" "}
                  <div className=" mx-8 self-center h-[80%] font-federo text-xl">
                    {" "}
                    {v && v?.copyAttribute && v?.copyAttribute.length}{" "}
                    verfügbare Formate von {v?.copyAttribute?.[0]?.price}€
                    {v &&
                      v.copyAttribute &&
                      v.copyAttribute.length > 1 &&
                      " bis"}{" "}
                    {v &&
                      v.copyAttribute &&
                      v.copyAttribute.length > 1 &&
                      v.copyAttribute[v.copyAttribute.length - 1].price}
                    {v && v.copyAttribute && v.copyAttribute.length > 1 && "€"}
                  </div>
                </div>
                <div className="flex flex-row  lg:flex-col lg:justify-end my-4 items-end">
                  <button
                    className="btn-primary font-federo text-base m-4 h-10 w-28"
                    onClick={() => {
                      console.log(`/edit_copy/${v.uid}`);
                      navigate(`/edit_copy/${v.uid}`);
                    }}
                  >
                    ändern
                  </button>{" "}
                  <button
                    className="btn-primary ml-2 font-federo text-base m-4 h-10 w-28"
                    onClick={() => handleDeleteClick(v)}
                  >
                    löschen
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </MainLayout>
  );
};
