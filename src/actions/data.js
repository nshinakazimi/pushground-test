import Client from "../config/api";
import { errorHandler } from "../utils";

// const endpoint = process.env.REACT_APP_ENDPOINT;
const endpoint = "https://api.pushground.com/candidates/test";

export const getEventsSuccess = (data) => {
  return { type: "GET_EVENTS", data };
};

export const getAudiencesSuccess = (data) => {
  return { type: "GET_AUDIENCES", data };
};

export const setCurrentTableData = (data) => {
  return { type: "SET_CURRENT_TABLEDATA", data }
}

export const getEvents = (callback) => {
  return async (dispatch) => {
    const client = Client();

    try {
      const res = await client.get(`${endpoint}/events`);
      dispatch(getEventsSuccess(res.data));
      if (typeof callback === "function") callback({ success: true });
    } catch (e) {
      errorHandler(e);
      if (typeof callback === "function") callback({ success: false });
    }
  };
};

export const getAudiences = (callback) => {
  return async (dispatch) => {
    const client = Client();

    try {
      const res = await client.get(`${endpoint}/audiences`);
      dispatch(getAudiencesSuccess(res.data));
      if (typeof callback === "function") callback({ success: true });
    } catch (e) {
      errorHandler(e);
      if (typeof callback === "function") callback({ success: false });
    }
  };
};
