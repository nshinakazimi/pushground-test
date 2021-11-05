import { message } from "antd";

export const dumps = (anobj) => {
  return JSON.stringify(anobj, null, 2);
};

export const errorHandler = (error) => {
  console.log(error);

  if (!error) return;
  let errorMessage = "";
  const response = error.response;
  if (response) {
    const code = response.status;

    if (code === 404) errorMessage = error.message;
    else if (code === 500) errorMessage = "An error occurred, try again later.";
    else errorMessage = response.data.message;
  } else errorMessage = "Network Error, please check your connection!";
  message.error(errorMessage, 5);
};
