import NoPic from "../../assets/images/NoPic.jpg";

interface Radio {
  name: string;
  first: string;
  second: string;
}
const PicSection = ({ first, second, name }: Radio) => {
  return (
    <div className="flex justify-between py-[5%]">
      <img src={NoPic} className="" />
      <p className="w-1/2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
        text of the printing and industry...
      </p>
      <div className="w-1/4 flex justify-center">
        <div className="flex flex-col gap-6">
          <div className="flex gap-8">
            <p>Auf Seite posten: </p>
            <div>
              <div className="flex items-center mb-4">
                <input
                  id={first}
                  type="radio"
                  value=""
                  name={name}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-[#895c06] dark:focus:ring-[#895c06] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={first}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Gemälde
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked
                  id={second}
                  type="radio"
                  value=""
                  name={name}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-[#895c06] dark:focus:ring-[#895c06] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={second}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Atelier{" "}
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn-primary">ändern</button>
            <button className="btn-primary">löschen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Pictures = () => {
  return (
    <div className="px-[5%] pt-[2%]">
      <h3 className="font-italiana text-5xl">
        Liste der Bilder auf der Website
      </h3>

      <button className="btn-primary mt-10">Neues Bild hinzufügen +</button>

      <PicSection radio={{ name: "1", first: "radio1", second: "radio2" }} />
      <PicSection radio={{ name: "2", first: "radio3", second: "radio4" }} />
      <PicSection radio={{ name: "3", first: "radio5", second: "radio6" }} />
    </div>
  );
};
