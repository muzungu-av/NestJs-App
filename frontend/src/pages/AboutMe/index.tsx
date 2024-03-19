// import MainLayout from "../../Layouts/MainLayout";
import ProfilePic from "../../assets/images/ProfilePic.jpg";
import play from "../../assets/icons/play.svg";
// import SpringSlider from "../../components/SpringSlider/index";
import videoPic from "../../assets/images/videoPic.jpg";
import videoPic2 from "../../assets/images/videoPic2.jpg";
// import Slide from "../../assets/images/slide.jpg";
export const AboutMe: React.FC = () => {
  const AboutPainterSection: React.FC = () => {
    return (
      <div className="py-[5%] px-[5%]">
        <h3 className="font-italiana text-6xl	text-center">Biografie</h3>
        <div className="flex justify-around items-center ">
          <div className="">
            <div className="rounded-full w-[220px] h-[220px] mb-4 bg-[#D9D9D9]" />
            <h4 className="font-apple text-center text-2xl">Calvin Calva</h4>
          </div>
          <div className="flex flex-col w-[50%] gap-8">
            <p className="font-federo">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              quam provident illum sapiente harum recusandae, atque et quisquam
              consectetur cumque, nostrum, doloribus iure culpa consequuntur
              aspernatur. Pariatur voluptate doloribus deleniti?
            </p>
            <p className="font-apple w-[60%] self-center">
              “ Lorem Ipsum is simply dummy text of the printing and typesetting
              industry ”
            </p>
          </div>
          <button className="btn-primary self-end">Mehr erfahren</button>
        </div>
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
  return (
    <>
      <AboutPainterSection />

      <VideoSection />
    </>
  );
};
