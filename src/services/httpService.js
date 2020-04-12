import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const isError =
    error &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!isError) {
    toast.error("Unexpected error");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
