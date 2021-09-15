import { createReducer } from "@reduxjs/toolkit";
import { REQUEST, SUCCESS,FAILURE, ORDER_ACTION, USER_ACTION } from "../../constants";

const initialState = {
  orderList: {
    data: [],
    load: false,
    error: null,
  },
  orderWaitingList: {
    data: [],
    load: false,
    error: null,
  },
};

const orderReducerAdmin = createReducer(initialState, {
  
  [REQUEST(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        load: true,
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderList: {
        ...state.orderList,
        load: false,
        error,
      },
    }
  },
  [SUCCESS(ORDER_ACTION.EDIT_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload;
    const newOrderList = [...state.orderList.data];
    const orderIndex = newOrderList.findIndex((order) => order.id === data.id);
    newOrderList.splice(orderIndex, 1, data);
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data:newOrderList
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_WAITING)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderWaitingList: {
        data,
        load: false,
        error: null,
      },
    }
  },
});

export default orderReducerAdmin;
