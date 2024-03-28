import axios from "axios";

export const Axios = (credentials: boolean, jwtAuth: boolean) => {
  const token = jwtAuth ? localStorage.getItem("token") : "";
  let h = {
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    } as { [key: string]: string },
    withCredentials: credentials,
  };

  if (jwtAuth) {
    h.headers.Authorization = `Bearer ${token}`;
  }

  return axios.create(h);
};

export const get = async (
  baseUrl: string,
  relatedUrl: string,
  credentials: boolean,
  jwtAuth: boolean,
  params?: Record<string, string | number>
) => {
  try {
    const instance = Axios(credentials, jwtAuth);
    const response = await instance.get(baseUrl + relatedUrl, { params });
    return response;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

// const post = async (
//   baseUrl: string,
//   relatedUrl: string,
//   credentials: boolean,
//   jwtAuth: boolean,
//   data: any
// ) => {
//   try {
//     const instance = Axios(credentials, jwtAuth);
//     const response = await instance.post(baseUrl + relatedUrl, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error making POST request:", error);
//     throw error;
//   }
// };
