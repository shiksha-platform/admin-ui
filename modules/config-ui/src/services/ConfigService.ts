import axios from "axios";
import attendanceConfigSchema from "../services/Attendance/attendance-config-schema.json";

const baseUrl = "https://sandbox.shikshaplatform.io/api/v1/config/";
const fetchConfigApiUrl = baseUrl + "{module}/all";
const saveConfigApiUrl = baseUrl + "{multipleConfigs}";

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

export const fetchConfigSchema = async (moduleId: string) => {
  let schemaUrl = `${process.env.PUBLIC_URL}/attendance-config-schema.json`;
  let config = await axios
    .get(schemaUrl, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
  return config;
};

export const saveConfigData = async (moduleId: string, configData: any) => {
  let configs = Object.keys(configData).map((key) => {
    return {
      key: key,
      value: JSON.stringify(configData[key]),
    };
  });
  let postData = [
    {
      module: moduleId,
      context: "",
      contextId: "",
      data: configs,
    },
  ];
  return await axios
    .post(saveConfigApiUrl, postData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
};
