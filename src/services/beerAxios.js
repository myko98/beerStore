import axios from "axios";
const baseUrl = "http://localhost:3001/api/fridge";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const updateFridge = (addToFridge) => {
  const request = axios.post(baseUrl, addToFridge);
  return request.then((response) => response.data);
};

const resetFridge = () => {
  const request = axios.put(baseUrl)
  return request.then((response) => response.data);
}

export default { getAll, updateFridge, resetFridge };
