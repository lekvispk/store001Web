import axios from "axios";

export default axios.create({
  baseURL: "https://hidden-bastion-01869.herokuapp.com",
  withCredentials: false,
  headers: {
    "Content-type" : "application/json" 
  }
});