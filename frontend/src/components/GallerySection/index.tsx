// import { useEffect, useState } from "react";
import MainPageBg from "../../assets/images/MainPageBg.jpg";
// import { get } from "../../api/axiosInstance";
import galleryPic1 from "../../assets/images/galleryPic1.jpg";
import galleryPic2 from "../../assets/images/galleryPic2.jpg";
import galleryPic3 from "../../assets/images/galleryPic3.jpg";
import { useNavigate } from "react-router";

export const GallerySection = () => {
  const navigate = useNavigate();

  // const sc = import.meta.env.VITE_SCHEME;
  // const bu = import.meta.env.VITE_BACKEND_URL.replace(/https?:\/\//g, "");
  // const ai = import.meta.env.VITE_API_IMAGE;
  // const BACKEND_API =
  //   sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";
  // const countImgs = 3;
  // const params = { fields: "miniImageUrl" };
  // const [paintings, setPaintings] = useState<any[]>([]);

  // // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await get(
  //         BACKEND_API,
  //         `${ai}/block/${countImgs}`,
  //         false,
  //         false,
  //         params
  //       );
  //       setPaintings(response.data);
  //     } catch (error) {
  //       console.error("Error fetching paintings:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className="">
        <h3 className="text-4xl font-federo text-center mb-6 block lg:hidden">
          Meine Galerie
        </h3>
        <div className="" style={{ backgroundImage: `url(${MainPageBg})` }}>
          <div className="py-[5%] px-[5%] flex justify-between  gap-4">
            <div className="self-end">
              <img
                className=" border-[15px] border-[#240909]  "
                src={galleryPic1}
              />
            </div>

            <div className="self-end">
              <img
                className="border-[15px] border-[#240909]  "
                src={galleryPic2}
              />
            </div>
            <div className="flex flex-col gap-4 self-end">
              <h3 className="font-federo text-5xl hidden lg:block">
                Meine Galerie
              </h3>
              <button
                className="btn-primary  hidden lg:block"
                onClick={() => navigate("/paintings")}
              >
                Mehr erfahren
              </button>
              <img
                className=" border-[15px] border-[#240909]  "
                src={galleryPic3}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center  mt-8">
          <button
            onClick={() => navigate("/paintings")}
            className="btn-primary text-center m-auto self-center block lg:hidden mb-10"
          >
            Mehr erfahren
          </button>
        </div>
      </div>
    </>
  );
};
