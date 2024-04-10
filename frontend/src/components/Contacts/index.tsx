import ContactPic from "../../assets/images/contactPic.jpg";
import Gmail from "../../assets/icons/Gmail.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import FaceBook from "../../assets/icons/Facebook.svg";

export const Contacts: React.FC = () => {
  return (
    <div className="py-[10%] px-[5%]">
      <div className="flex flex-col justify-center gap-6">
        <h2 className="font-italiana text-6xl hidden lg:block">Kontaktdaten</h2>
        <div className="lg:border-t-4 lg:border-black flex flex-col lg:flex-row gap-10">
          <div
            className="lg:w-[50%] px-[5%] py-[5%] bg-no-repeat bg-cover min-h-[400px] "
            style={{ backgroundImage: `url(${ContactPic})` }}
          >
            <div className="flex flex-col items-center lg:items-start px-[5%] mb-8">
              <h2 className="font-italiana text-white text-4xl block lg:hidden mb-10">
                Kontaktdaten
              </h2>
              <div className="bg-primary-100 rounded-full w-[120px] h-[120px] mb-4 " />
              <h4 className="font-apple text-center text-base text-white">
                Calvin Calva
              </h4>
            </div>
            <div className="flex gap-5 px-[5%] justify-center lg:justify-start font-federo text-base">
              <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-32 h-12 items-center ">
                <p>E-mail</p>
                <img src={Gmail} />
              </div>

              <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-12 h-12 items-center ">
                <img src={Instagram} />
              </div>

              <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-12 h-12 items-center ">
                <img src={FaceBook} />
              </div>
            </div>
          </div>
          <div className="lg:w-[50%]">
            <h3 className="font-federo text-2xl py-10">
              Oder schreiben Sie mir
            </h3>
            <div className="flex flex-col gap-5 font-poppins text-sm font-medium">
              <div className="flex gap-10 flex-col lg:flex-row">
                <div className="flex flex-col w-[50%]">
                  <label htmlFor="name">Name</label>
                  <input
                    className="border-t-0 border-x-0 border-b-[1px]"
                    type="text"
                    name="name"
                  ></input>
                </div>
                <div className="flex flex-col w-[50%]">
                  <label htmlFor="vorname">Vorname</label>
                  <input
                    className="border-t-0 border-x-0 border-b-[1px]"
                    type="text"
                    name="vorname"
                  ></input>
                </div>
              </div>
              <div className="flex gap-10 flex-col lg:flex-row">
                <div className="flex flex-col w-full">
                  <label htmlFor="email">Email</label>
                  <input
                    className="border-t-0 border-x-0 border-b-[1px]"
                    type="text"
                    name="email"
                  ></input>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="nummer">Handy Nummer</label>
                  <input
                    className="border-t-0 border-x-0 border-b-[1px]"
                    type="text"
                    name="nummer"
                  ></input>
                </div>
              </div>
              <div className="flex gap-10 flex-col lg:flex-row">
                <div className="flex flex-col w-full">
                  <label htmlFor="nachricht">Nachricht</label>
                  <input
                    className="border-t-0 border-x-0 border-b-[1px] "
                    type="text"
                    name="nachricht"
                  ></input>
                </div>
              </div>
              <button className="btn-primary self-end">Senden</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
