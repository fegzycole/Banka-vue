import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://banka--app.herokuapp.com/api/v1/"
  });
};
