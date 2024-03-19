import ShoppingCart from "../../../assets/icons/ShoppingCart.svg";

export const OnePaintingSection = ({
  text,
  imgURL,
}: {
  text: string;
  imgURL: any;
}) => {
  return (
    <div className="  py-[5%] px-[5%]">
      <div className="flex justify-between gap-6 p-[30px]">
        <img
          src={imgURL}
          style={{
            border: "15px solid #240909",
            borderRadius: "3px",
            boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
          }}
          className="flex flex-col gap-6 w-[40%] "
        />

        <div className=" relative flex flex-col gap-6 w-[60%]">
          <div className="font-['Italiana'] text-[24px]">Bildname</div>
          <p className="font-['Federo'] text-[20px]">{text}</p>{" "}
          <button
            type="button"
            className=" absolute h-[45px] bottom-0 right-0 w-[140px] font-federo rounded-[6px] text-#000 bg-[#FFEDCB]"
          >
            <div className=" flex justify-center items-center flex-row ">
              {" "}
              Kaufen <img className=" p-[5px]" src={ShoppingCart} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
