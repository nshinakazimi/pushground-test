import { message } from "antd";

export const dumps = (anobj) => {
  return JSON.stringify(anobj, null, 2);
};

export const errorHandler = (error) => {
  console.log(error);

  if (!error) return;

  const response = error.response;
  const code = response.status;
  let errorMessage = "";

  if (code === 404) errorMessage = error.message;
  else if (code === 500) errorMessage = "An error occurred, try again later.";
  else errorMessage = response.data.message;

  message.error(errorMessage, 5);
};
