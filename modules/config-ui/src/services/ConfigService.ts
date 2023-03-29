import axios from "axios";
import attendanceConfigSchema from "../services/Attendance/attendance-config-schema.json";

const baseUrl = "https://sandbox.shiksha.samagra.io/api/v1";

const fetchConfigApiUrl = baseUrl + "/config/{module}/all";
const saveConfigApiUrl = baseUrl + "/config/{multipleConfigs}";

export const fetchConfigData = async (moduleId: any) => {
  return await axios
    .get(fetchConfigApiUrl, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      let data = res.data["data"].filter(
        (ele: any) => ele["module"] === moduleId
      );
      return { data: data };
    });
};

export const fetchConfigSchema = async (moduleId: string) => {
  const schemaUrl = `${baseUrl}/adminForm/search`;
  const postData = {
    limit: "1",
    filters: { moduleId: { eq: moduleId } },
  };
  const config = await axios
    .post(schemaUrl, postData, {
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
