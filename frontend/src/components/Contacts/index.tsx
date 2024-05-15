import ContactPic from "../../assets/images/contactPic.jpg";
import Gmail from "../../assets/icons/Gmail.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import FaceBook from "../../assets/icons/Facebook.svg";
import { Get, Post } from "../../api/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { message } from "antd";
import { Form } from "antd";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const Contacts: React.FC = () => {
  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");
  const mailing = import.meta?.env?.VITE_API_MAILING;
  const URL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";
  const bio = import.meta?.env?.VITE_API_BIO;

  const formRef = useRef<HTMLFormElement>(null);
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [bioImg, setBioImg] = useState();
  useEffect(() => {
    fetchBioDataFromApi().then((res) => setBioImg(res.imgUrl));
  }, []);

  const fetchBioDataFromApi = async () => {
    try {
      const response = await Get(undefined, URL, `${bio}`, false, {});

      return response.data;
    } catch (error) {
      console.error("Error fetching Videos from backend:", error);
      return null;
    }
  };
  const handleSend = async () => {
    try {
      setLoader(true);
      const payload = {
        email: form.getFieldValue("email"),
        text: form.getFieldValue("nachricht"),
        name: form.getFieldValue("username"),
        number: `+${form.getFieldValue("nummer")}`,
        surname: form.getFieldValue("nachname"),
      };

      const headers = {
        "Content-Type": "application/json",
      };
      await Post(headers, URL, mailing, true, payload).then(() =>
        formRef.current?.reset()
      );
      message.success("Ihre Bewerbung wurde versendet");
    } catch (e) {
      console.error(e);
      message.error("Probleme beim Versenden der Bewerbung");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className={`py-[5%] px-[5%]  ${loader ? "opacity-50" : ""}`}>
      <div className="flex flex-col justify-center gap-10">
        <h2 className="font-italiana text-center text-6xl hidden lg:block">
          Kontaktdaten
        </h2>
        <div className="lg:border-t-4 lg:border-black flex flex-col lg:flex-row gap-10">
          <div
            className="lg:w-[50%] px-[5%] py-[5%] bg-no-repeat bg-cover min-h-[400px] "
            style={{ backgroundImage: `url(${ContactPic})` }}
          >
            <div className="flex flex-col items-center lg:items-start px-[5%] mb-8">
              <h2 className="font-italiana text-white text-4xl block lg:hidden mb-10">
                Kontaktdaten
              </h2>
              <img
                className="bg-primary-100 rounded-full w-[120px] h-[120px] mb-4 "
                src={bioImg}
              ></img>

              <h4 className="font-apple text-center text-base text-white">
                Calvin Calva
              </h4>
            </div>
            <div className="flex gap-5 px-[5%] justify-center lg:justify-start font-federo text-base">
              <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-32 h-12 items-center cursor-pointer">
                <a href="mailto:info@haltentech.com"> E-mail</a>
                <img src={Gmail} />
              </div>

              <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-12 h-12 items-center cursor-pointer">
                <a>
                  {" "}
                  <img src={Instagram} />
                </a>
              </div>

              <div className="flex justify-center gap-4 rounded-[13px] bg-primary-100 w-12 h-12 items-center cursor-pointer">
                <a>
                  {" "}
                  <img src={FaceBook} />
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-[50%]">
            <h3 className="font-federo text-2xl py-10">
              Oder schreiben Sie mir
            </h3>
            {loader && <Spinner />}
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSend}
              className={`flex flex-col gap-5 font-poppins text-sm font-medium ${
                loader ? "opacity-50" : ""
              }`}
            >
              <div className="flex gap-10 flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[50%]">
                  <Form.Item
                    name="username"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Bitte geben Sie Ihren Namen ein",
                      },
                    ]}
                  >
                    <input
                      className="border-t-0 border-x-0 border-b-[1px] w-full"
                      type="text"
                      name="name"
                    ></input>
                  </Form.Item>
                </div>
                <div className="flex flex-col lg:w-[50%]">
                  <Form.Item
                    name="nachname"
                    label="Nachname"
                    rules={[
                      {
                        required: true,
                        message: "Bitte geben Sie Ihren Nachnamen ein",
                      },
                    ]}
                  >
                    <input
                      className="border-t-0 border-x-0 border-b-[1px] w-full"
                      type="text"
                      name="nachname"
                    ></input>
                  </Form.Item>
                </div>
              </div>
              <div className="flex gap-10 flex-col lg:flex-row">
                <div className="flex flex-col w-full">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        type: "email",
                        message:
                          "Bitte geben Sie eine gültige Email-Adresse ein",
                      },
                      {
                        required: true,
                        message: "Bitte geben Sie Ihre E-Mail-Adresse ein",
                      },
                    ]}
                  >
                    <input
                      className="border-t-0 border-x-0 border-b-[1px] w-full"
                      type="text"
                      name="email"
                    ></input>
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full">
                  <Form.Item
                    name="nummer"
                    label="Handy Nummer"
                    rules={[
                      {
                        required: true,
                        message: "Bitte geben Sie Ihre Nummer ein",
                      },
                    ]}
                  >
                    <PhoneInput
                      country={"de"}
                      preferredCountries={["de", "us", "at", "gb"]}
                      countryCodeEditable={true}
                      copyNumbersOnly={false}
                      inputStyle={{ width: "80%" }}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex gap-10 flex-col lg:flex-row">
                <div className="flex flex-col w-full">
                  <Form.Item
                    name="nachricht"
                    label="Nachricht"
                    rules={[
                      {
                        required: true,
                        message: "Bitte geben Sie Ihre Nachricht ein",
                      },
                    ]}
                  >
                    <input
                      className="border-t-0 border-x-0 border-b-[1px] w-full"
                      type="text"
                      name="nachricht"
                    ></input>
                  </Form.Item>
                </div>
              </div>
              <button type="submit" className="btn-primary self-end">
                Senden
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
