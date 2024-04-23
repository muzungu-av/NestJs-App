import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import { Delete, Get } from "../../api/axiosInstance";
import { message } from "antd";

const sc = import.meta?.env?.VITE_SCHEME;
const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
const img = import.meta?.env?.VITE_API_IMAGE;
const url = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

type CopiesSectionProps = {
  uid: string;
  typeOfImage: string;
  miniImageUrl: string;
  description: string;
};

export const PaintingsKopien = () => {
  const navigate = useNavigate();

  //todo isKopien еще осталось везде на фронте
  const fetchDataFromApi = async () => {
    try {
      const params = { fields: "uid,miniImageUrl,description,typeOfImage" };
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

  const handleDeleteClick = async (uid: string) => {
    const confirmation = window.confirm(
      "Sind Sie sicher, dass Sie das ausgewählte Foto löschen möchten?"
    );
    if (confirmation) {
      await Delete(url + img, "/copy/" + uid, true);
      message.success("Successfully deleted");
    }
  };

  const [copies, setCopies] = useState<CopiesSectionProps[] | null>(null);

  useEffect(() => {
    fetchDataFromApi().then((result) => setCopies(result));
  }, []);

  return (
    <MainLayout>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">Kopien</div>
      <button
        onClick={() => navigate("/add_copy")}
        className="btn-primary w-[230px] h-[45px] p-0 text-base  mx-[5%]"
      >
        Neue Kopie hinzufügen +
      </button>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">
        {copies &&
          copies.length > 0 &&
          copies.map((v: any, index: number) => {
            const firstSix = v.copyAttribute.slice(0, 6);
            const firstThree = firstSix.slice(0, 3);
            const secondThree = firstSix.slice(3);
            return (
              <div className="flex my-[5%] " key={index}>
                <img src={v.miniImageUrl} />{" "}
                <div className="flex flex-wrap justify-end w-[20%] mx-14 ">
                  <div className="w-1/2 pr-2 ">
                    {" "}
                    {firstThree &&
                      firstThree.length > 0 &&
                      firstThree.map(
                        (
                          { width, height }: { width: number; height: number },
                          index: number
                        ) => (
                          <button
                            key={index}
                            className="btn-size w-full h-[35px]  text-sm"
                          >
                            {width} x {height} cm
                          </button>
                        )
                      )}
                  </div>
                  <div className="w-1/2 pl-2">
                    {" "}
                    {secondThree &&
                      secondThree.length > 0 &&
                      secondThree.map(
                        (
                          { width, height }: { width: number; height: number },
                          index: number
                        ) => (
                          <button
                            key={index}
                            className="btn-size w-full h-[35px]  text-sm"
                          >
                            {width} x {height} cm
                          </button>
                        )
                      )}
                  </div>
                </div>
                <div className=" relative flex ">
                  <div className=" absolute h-[80%] bg-black w-1 top-0 left-0 "></div>{" "}
                  <div className=" mx-8 self-center h-[80%] font-federo text-xl">
                    {" "}
                    {v && v.copyAttribute && v.copyAttribute.length} verfügbare
                    Formate von {v.copyAttribute[0].price}€
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
                <div className="flex justify-end my-4 items-end">
                  <button
                    className="btn-primary font-federo text-base h-10 w-28"
                    onClick={() => {
                      console.log(`/edit_copy/${v.uid}`);
                      navigate(`/edit_copy/${v.uid}`);
                    }}
                  >
                    ändern
                  </button>{" "}
                  <button
                    className="btn-primary ml-2 font-federo text-base h-10 w-28"
                    onClick={() => handleDeleteClick(v.uid)}
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
