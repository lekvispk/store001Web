import axios from "axios";

export default axios.create({
  baseURL: "https://hidden-bastion-01869.herokuapp.com",
  //baseURL: "http://localhost:8081",
  withCredentials: false,
  headers: {
    "Content-type" : "application/json" 
  }
});