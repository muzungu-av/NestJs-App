import MainLayout from "../../Layouts/MainLayout";
import ProfilePic from "../../assets/images/ProfilePic.jpg";
import Play from "../../assets/icons/Play.svg";
import Slide from "../../assets/images/slide.jpg";
export const AboutMe: React.FC = () => {
  const VideoSection: React.FC = () => {
    const VideoBlock = () => {
      return (
        <div className="flex justify-between items-end px-[5%]">
          <div
            className="w-[600px] h-[300px] flex justify-center items-center"
            style={{ backgroundImage: `url(${Slide})` }}
          >
            <img src={Play} className="w-8 h-8" />
          </div>
          <button
            type="button"
            className="px-8 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Watch
          </button>
        </div>
      );
    };

    return (
      <div className="py-[5%] flex flex-col gap-6">
        <VideoBlock />
        <VideoBlock />
      </div>
    );
  };
  const AboutPainterSection: React.FC = () => {
    return (
      <div className="py-[5%] px-[5%]">
        <div className="flex justify-between items-center gap-6 ">
          <img src={ProfilePic} className="rounded-full w-[400px] h-[400px] " />
          <div className="w-[50%] flex flex-col gap-10">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              quam provident illum sapiente harum recusandae, atque et quisquam
              consectetur cumque, nostrum, doloribus iure culpa consequuntur
              aspernatur. Pariatur voluptate doloribus deleniti?
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              quam provident illum sapiente harum recusandae, atque et quisquam
              consectetur cumque, nostrum, doloribus iure culpa consequuntur
              aspernatur. Pariatur voluptate doloribus deleniti?
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <MainLayout>
      <AboutPainterSection />
      <VideoSection />
    </MainLayout>
  );
};
