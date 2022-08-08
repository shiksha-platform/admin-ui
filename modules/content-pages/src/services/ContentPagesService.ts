import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1/contentPages/";

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

