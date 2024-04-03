import Empty from "./../../assets/images/EmptyPhoto.png";

export const Videos = () => {
  const data = [
    { name: "Name1", link: "link1" },
    { name: "Name2", link: "link2" }
  ];
  return (
    <>
      {" "}
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">Videos</div>
      <button className="btn-primary w-[230px] h-[45px] p-0 text-base  mx-[5%]">
        Neues Video hinzufügen +
      </button>
      <div className="bg-[#FFEDCB] m-8 flex justify-between">
        {" "}
        <img src={Empty} className="m-4" />
        <div className="flex flex-col w-[40%]">
          <div className=" flex m-4 justify-center border border-black rounded-md w-full">
            <input
              type="text"
              className="w-full px-2  m-2  h-6 bg-transparent border-none outline-none"
            />
          </div>
          <div className=" flex m-4 justify-center border border-black rounded-md w-full">
            <input
              type="text"
              className="w-full px-2  m-2  h-6 bg-transparent border-none outline-none"
            />
          </div>{" "}
        </div>
        <div className="flex justify-end items-end my-4">
          <button className="rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px]">
            ändern
          </button>{" "}
          <button className="btn-rounded-md bg-[#F5F5F5] font-federo w-[130px] h-[45px] ml-2">
            löschen
          </button>
        </div>
      </div>
      <div>
        {data.map((v) => {
          return (
            <div className="flex justify-between">
              {" "}
              <img src={Empty} />
              <div className="flex flex-col">
                {v.name} {v.link}{" "}
              </div>
              <button className="btn-primary font-federo w-[130px] h-[45px]">
                ändern
              </button>{" "}
              <button className="btn-primary  font-federo w-[130px] h-[45px] ml-2">
                löschen
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
