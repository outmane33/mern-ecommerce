import {
  ADDRESS_START,
  ADDRESS_SUCCESS,
  ADDRESS_FAILURE,
  SELECT_ADDRESS,
} from "../types/adressTypes";

// actions.js
export const addressStart = () => ({
  type: ADDRESS_START,
});

export const addressSuccess = (data) => ({
  type: ADDRESS_SUCCESS,
  data: data,
});

export const addressFailure = (error) => ({
  type: ADDRESS_FAILURE,
  data: error,
});

export const selectAddress = (data) => ({
  type: SELECT_ADDRESS,
  data: data,
});
