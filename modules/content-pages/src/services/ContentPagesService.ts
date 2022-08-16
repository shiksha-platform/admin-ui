import axios from "axios";
import qs from "qs";

const baseUrl = "http://localhost:3000/api/v1/contentPages";

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
    .get(`${baseUrl}/${slug}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data.data[0];
    });
};

export const fetchContentPages = async (limit:number,offset:number) => {
  return await axios
    .get(`${baseUrl}?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const updateContentPage = async (contentPageData: any,contentPageId:number) => {
  return await axios
    .put(`${baseUrl}/${contentPageId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: JSON.stringify(contentPageData),
    })
    .then((res) => {
      return res.data;
    });
};

export const deleteContentPage = async (pageId:string) => {
  return await axios
    .delete(`${baseUrl}/${pageId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data.data[0];
    });
};