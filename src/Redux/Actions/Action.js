import ActionType from "../ActionType";

export const AdminOptionAction = (response) => {
  return {
    type: ActionType.ADMIN,
    payload: response,
  };
};

export const SellerAction = (response) => {
  return {
    type: ActionType.SELLER,
    payload: response,
  };
};

export const OrderDeliveredAction = (response) => {
  return {
    type: ActionType.ORDERDELIVERED,
    payload: response,
  };
};

export const OrderDetailsAction = (response) => {
  return {
    type: ActionType.SHOWORDERDETAILS,
    payload: response,
  };
};

export const EditProductAction = (response) => {
  return {
    type: ActionType.EDITPRODUCT,
    payload: response,
  };
};

export const ProductsAction = (response) => {
  return {
    type: ActionType.PRODUCTS,
    payload: response,
  };
};

export const OrdersAction = (response) => {
  return {
    type: ActionType.ORDERS,
    payload: response,
  };
};
export const userAction = (response) => {
  return {
    type: ActionType.ALL_USER,
    payload: response,
  };
};
export const CategoryAction = (response) => {
  return {
    type: ActionType.CATEGORY,
    payload: response,
  };
};
export const subCategoryAction = (response) => {
  return {
    type: ActionType.SUB_CATEGORY,
    payload: response,
  };
};
export const AdminUserAction = (response) => {
  return {
    type: ActionType.ADMIN_USER,
    payload: response,
  };
};
export const EditSellerAction = (response) => {
  return {
    type: ActionType.EDIT_SELLER,
    payload: response,
  };
};
export const CategoryEditAction = (response) => {
  return {
    type: ActionType.EDIT_CATEGORY,
    payload: response,
  };
};

// Toggle Action

export const LeftBarAction = (response) => {
  return {
    type: ActionType.LEFTBAR_TOGGLE,
    payload: response,
  };
};
export const AddOrEditSellerAction = (response) => {
  return {
    type: ActionType.EDIT_OR_ADD,
    payload: response,
  };
};
