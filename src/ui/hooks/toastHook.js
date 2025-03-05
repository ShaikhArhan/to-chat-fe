import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const showToast = (message, status = "info", position = "top-right", autoClose = 3000) => {
    const options = { position, autoClose };

    switch (status) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "warning":
        toast.warning(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      default:
        toast(message, options);
        break;
    }
  };

  return showToast;
};

export default useToast;
