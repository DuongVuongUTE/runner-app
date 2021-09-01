import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, COMMON_ACTION_ADMIN,PRODUCT_ACTION_ADMIN } from '../../constants';

const initialState = {
  productSelected: {},
};

const commonProductReducerAdmin = createReducer(initialState,{
  [REQUEST(COMMON_ACTION_ADMIN.SET_PRODUCT_SELECTED_ADMIN)]: (state, action) => {
    return {
      ...state,
        productSelected: action.payload,
    };
  },
  [SUCCESS(PRODUCT_ACTION_ADMIN.CREATE_OPTION)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
        productSelected: {
          ...state.productSelected,
          productOptions: [
            ...state.productSelected.productOptions,
            data,
          ]
        }
      }
  },
})
export default commonProductReducerAdmin;
