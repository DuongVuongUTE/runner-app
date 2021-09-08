import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS, ORDER_ACTION, USER_ACTION } from "../constants";

const initialState = {
  orderList: {
    data: [],
    load: false,
    error: null,
  },
};

const orderReducer = createReducer(initialState, {
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data.orders,
      },
    };
  },

  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data.orders,
      },
    };
  },

  [SUCCESS(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data: data,
      },
    };
  },

  [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      orderList: {
        data: [],
        load: false,
        error: null,
      },
    };
  },
});

export default orderReducer;
