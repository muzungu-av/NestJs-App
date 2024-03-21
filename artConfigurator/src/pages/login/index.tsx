import ContactPic from "../../assets/images/contactPic.jpg";

const LogIn = () => {
  return (
    <div>
      <div className="py-[5%] px-[5%]">
        <div className="flex flex-col justify-center gap-6">
          <h2 className="font-italiana text-6xl text-center">Calvin Calva</h2>
          <div className="border-t-4 border-black flex gap-10">
            <div
              className="w-[50%] px-[5%] py-[5%] bg-no-repeat bg-cover min-w-[560px] min-h-[360px]"
              style={{ backgroundImage: `url(${ContactPic})` }}
            ></div>
            <div className="w-[50%]">
              <h3 className="font-federo text-2xl py-10">Autorisierung</h3>
              <div className="flex flex-col gap-5 font-poppins text-sm font-medium">
                <div className="flex gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="email">Benutzername</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px]"
                      type="text"
                      name="email"
                    ></input>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col w-full">
                    <label htmlFor="nachricht">Passwort</label>
                    <input
                      className="border-t-0 border-x-0 border-b-[1px] "
                      type="text"
                      name="nachricht"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
