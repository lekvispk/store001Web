import axios from "axios";

export default axios.create({
  baseURL: "https://hidden-bastion-01869.herokuapp.com",
  headers: {
    "Content-type" : "application/json",
    "Access-Control-Allow-Origin" : "*"
  }
});