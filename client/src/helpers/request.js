import axios from "axios";

const request = async (url, data, method = "POST") => {
  try {
    const response = await axios(url, {
      method,
      data,
    });
    return response.data;
  } catch (e) {
    return e.message;
  }
};

export default request;
