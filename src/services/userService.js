import axios from "../axios";
export const handleLogin = (userEmail, userPassord) => {
  return axios.post("/api/login", { email: userEmail, password: userPassord });
};
