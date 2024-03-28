import photo from "./../../assets/images/EmptyPhoto.png";

export const PaintingsKopien = () => {
  const kopiens = [
    {
      img: photo,
      sizes: [
        "40x60 cm",
        "50x70 cm",
        "60x80 cm",
        "110x133 cm",
        "120x160 cm",
        "150x200 cm"
      ],
      price: ["99,00", "4.700,00"]
    },
    {
      img: photo,
      sizes: ["40x60 cm", "50x70 cm", "60x80 cm"],
      price: ["99,00", "4.700,00"]
    }
  ];
  return (
    <>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">Kopien</div>
      <button className="btn-primary w-[230px] h-[45px] p-0 text-base  mx-[5%]">
        Neue Kopie hinzufügen +
      </button>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">
        {kopiens.map((v: any) => {
          return (
            <div className="flex my-[5%] ">
              <img src={v.img} />{" "}
              <div className="flex flex-wrap justify-end w-[20%] mx-14 ">
                <div className="w-1/2 pr-2 ">
                  {" "}
                  {v.sizes
                    .slice(0, Math.ceil(v.sizes.length / 2))
                    .map((size: string) => (
                      <button
                        key={size}
                        className="btn-size w-full h-[35px]  text-sm"
                      >
                        {size}
                      </button>
                    ))}
                </div>
                <div className="w-1/2 pl-2">
                  {" "}
                  {v.sizes
                    .slice(Math.ceil(v.sizes.length / 2))
                    .map((size: string) => (
                      <button
                        key={size}
                        className="btn-size w-full h-[35px]   text-sm"
                      >
                        {size}
                      </button>
                    ))}
                </div>
              </div>
              <div className=" relative flex ">
                <div className=" absolute h-[80%] bg-black w-1 top-0 left-0 "></div>{" "}
                <div className=" mx-8 self-center h-[80%] font-federo text-xl">
                  {" "}
                  {v.sizes.length} verfügbare Formate von {v.price[0]}€ bis{" "}
                  {v.price[1]}€
                </div>
              </div>
              <div className="flex justify-end my-4 items-end">
                <button className="btn-primary font-federo text-base h-10 w-28">
                  ändern
                </button>{" "}
                <button className="btn-primary ml-2 font-federo text-base h-10 w-28">
                  löschen
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
