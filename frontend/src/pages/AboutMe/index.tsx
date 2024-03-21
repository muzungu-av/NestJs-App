
import ProfilePic from "../../assets/images/ProfilePic.jpg";
import play from "../../assets/icons/play.svg";
import videoPic from "../../assets/images/videoPic.jpg";
import videoPic2 from "../../assets/images/videoPic2.jpg";
import MainPageBg from "../../assets/images/MainPageBg.jpg";
import GalleryPic1 from "../../assets/images/galleryPic1.jpg";
import GalleryPic2 from "../../assets/images/galleryPic2.jpg";
import GalleryPic3 from "../../assets/images/galleryPic3.jpg";
interface AboutMeProps {
  isMain: boolean;
}
export const AboutMe = ({ isMain }: AboutMeProps) => {
  const AboutPainterSection: React.FC = () => {
    return (
      <div className="py-[5%] px-[5%]">
        <h3 className="font-italiana text-6xl pb-8 text-center">Biografie</h3>
        <div className="flex justify-around items-start ">
          <div>
            <div
              className="rounded-full w-[220px] h-[220px] mb-4 bg-[#D9D9D9]"
              ></div>
            <h4 className="font-apple text-center text-2xl">Calvin Calva</h4>
          </div>
          <div className="flex flex-col w-[50%] gap-8">
            <p className="font-federo">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              quam provident illum sapiente harum recusandae, atque et quisquam
              consectetur cumque, nostrum, doloribus iure culpa consequuntur
              aspernatur. Pariatur voluptate doloribus deleniti?
            </p>
            {!isMain && (
              <>
                <p className="font-federo">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book.
                </p>
                <p className="font-federo">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </>
            )}

            {isMain && (
              <p className="font-apple w-[60%] self-center pt-5">
                “ Lorem Ipsum is simply dummy text of the printing and
                typesetting industry ”
              </p>
            )}
          </div>

          {isMain && (
            <button
              className={
                isMain ? "btn-primary self-end" : "btn-primary self-end"
              }
            >
              Mehr erfahren
            </button>
          )}
        </div>
        {!isMain && (
          <div className=" flex flex-col  justify-center items-center ">
            <p className="font-apple text-2xl font-normal m-16 self-center ">
              “ Lorem Ipsum is simply dummy text of <br /> the printing and
              typesetting industry ”
            </p>

            <button className={"btn-primary "}>Kontaktieren</button>
          </div>
        )}
      </div>
    );
  };
  const VideoSection: React.FC = () => {
    const VideoBlock = ({ picture }: { picture: string }) => {
      return (
        <div className="flex justify-between  gap-10 px-[5%]">
          <div
            className="w-[600px] h-[300px] flex justify-center items-center"
            style={{ backgroundImage: `url(${picture})` }}
          >
            <div className="btn-play ">
              <img src={play} />
            </div>
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            <h3 className="font-italiana text-2xl ">Videoname</h3>
            <p className="font-federo text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <button className="btn-primary	">Mehr erfahren</button>
          </div>
        </div>
      );
    };

    return (
      <div className="py-[5%] flex flex-col gap-6">
        <VideoBlock picture={videoPic} />
        <VideoBlock picture={videoPic2} />
      </div>
    );
  };
  const GallerySection: React.FC = () => {
    return (
      <div className="" style={{ backgroundImage: `url(${MainPageBg})` }}>
        <div className="py-[5%] px-[5%] flex justify-center gap-20 ">
          <div className="self-end">
            <img
              className=" border-[15px] border-[#240909]"
              src={GalleryPic1}
            />
          </div>
          <div>
            <img
              className=" border-[15px] border-[#240909]"
              src={GalleryPic2}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="font-federo text-5xl whitespace-nowrap">
                Meine Galerie
              </h3>
              <button className="btn-primary">Mehr erfahren</button>
            </div>
            <img
              className=" border-[15px] border-[#240909]"
              src={GalleryPic3}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <AboutPainterSection />
      <VideoSection />
      <GallerySection />
    </>
  );
};
