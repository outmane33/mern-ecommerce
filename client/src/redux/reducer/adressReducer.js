import {
  ADDRESS_START,
  ADDRESS_SUCCESS,
  ADDRESS_FAILURE,
  SELECT_ADDRESS,
} from "../types/adressTypes";

const initialValue = {
  addresses: [],
  loading: false,
  error: null,
  selectedAdress: null,
};

export const addressReducer = (state = initialValue, action) => {
  switch (action.type) {
    case ADDRESS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: action.data,
        loading: false,
        error: null,
      };
    case ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data,
      };
    case SELECT_ADDRESS:
      return {
        ...state,
        selectedAdress: action.data,
      };
    default:
      return state;
  }
};
