import axios from "axios";
import qs from "qs";

const baseUrl = "http://localhost:3000/api/v1/contentPages/";

export const createContentPage = async (contentPageData: any) => {
  var formData = qs.stringify(contentPageData);
  return await axios
    .post(baseUrl, formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const fetchContentPageData = async (slug: any) => {
  return await axios
    .get(`${baseUrl}${slug}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data.data[0];
    });
};

export const updateContentPage = async (contentPageData: any) => {
  return await axios
    .put(`${baseUrl}1`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify(contentPageData),
    })
    .then((res) => {
      return res.data;
    });
};

