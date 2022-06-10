import axios from "axios";

const baseUrl = "https://sandbox.shikshaplatform.io/api/v1/config/";
const fetchConfigApiUrl = baseUrl + "{module}/all";
const saveConfigApiUrl = baseUrl + "";

export const fetchConfigData = async (moduleId: any) => {
  return await axios
    .get(fetchConfigApiUrl, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const saveConfigData = async (configData: any) => {
  let configs = Object.keys(configData).map((key) => {
    let postData = {
      module: "attendance",
      key: key,
      value: configData[key],
    };
    return axios
      .post(saveConfigApiUrl, postData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        return res.data;
      });
  });
  return await Promise.all(configs);
};
