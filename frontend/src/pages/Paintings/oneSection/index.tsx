import ShoppingCart from "../../../assets/icons/ShoppingCart.svg";
import DOMPurify from "dompurify";

export const OnePaintingSection = ({
  text,
  imgURL,
}: {
  text: string;
  imgURL: any;
}) => {
  const sanitizedText = DOMPurify.sanitize(text); //безопасный текст, санитаризация
  return (
    <div className="  py-[5%] px-[5%]">
      <div className="flex justify-between gap-2 lg:gap-6 lg:p-[30px]">
        <div className="max-w-[50%] min-h-full  ">
          <img
            src={imgURL}
            className="max-w-[90%] h-auto lg:max-w-[100%] border-[5px] border-solid border-black rounded-3 shadow-[0_25px_20px_-5px_rgba(0,0,0,0.3)] lg:border-[15px] "
          />
        </div>
        <div className="h-auto relative flex flex-col gap-6 w-[60%]">
          <div className="font-['Italiana'] lg:text-2xl text-base">
            Bildname
          </div>
          <p
            className="font-['Federo'] text-sm lg:text-xl"
            dangerouslySetInnerHTML={{ __html: sanitizedText }}
          ></p>{" "}
          <div className=" mt-2">
            <button
              type="button"
              className=" absolute lg:h-[45px] h-[30px] bottom-0 right-0 lg:w-[140px] w-[100px] font-federo rounded-[6px] text-#000 bg-[#FFEDCB]"
            >
              <div className=" flex justify-center items-center flex-row lg:text-base text-sm ">
                {" "}
                Kaufen <img className=" p-[5px]" src={ShoppingCart} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
