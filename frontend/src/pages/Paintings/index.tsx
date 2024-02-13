import MainLayout from "../../Layouts/MainLayout";
import Slide from "../../assets/images/slide.jpg";
export const Paintings: React.FC = () => {
  const PaintingSection = () => {
    return (
      <div className="py-[5%] px-[5%]">
        <div className="flex justify-between gap-6">
          <img src={Slide} className="w-[50%]" />

          <div className="flex flex-col gap-6 w-[50%]">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores eaque officiis voluptas recusandae nobis provident,
              labore quaerat unde! Assumenda unde illo quod deleniti optio
              commodi ducimus veritatis aliquid eius tenetur?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores eaque officiis voluptas recusandae nobis provident,
              labore quaerat unde! Assumenda unde illo quod deleniti optio
              commodi ducimus veritatis aliquid eius tenetur?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Asperiores eaque officiis voluptas recusandae nobis provident,
              labore quaerat unde! Assumenda unde illo quod deleniti optio
              commodi ducimus veritatis aliquid eius tenetur?
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <MainLayout>
      <PaintingSection />
      <PaintingSection />
      <PaintingSection />
      <PaintingSection />
    </MainLayout>
  );
};
