import ActionType from "../ActionType";

const UtilState = {
    Products: null,
    Orders: null,
    OrderDelivered: null,
    EditProduct: null,
    OrderDetails: null,
    editOrAdd:true,
    Seller: [],
    EditSeller: null,
    Category: [],    
    subCategory: [],
    EditCategory:{
        category:null,
        subCategory:null
    }
}

const UtilsReducer = (state = UtilState, { type, payload }) => {
    switch (type) {
        case ActionType.PRODUCTS:
            return { ...state, Products: payload };

        case ActionType.ORDERS:
            return { ...state, Orders: payload };

        case ActionType.ORDERDELIVERED:
            return { ...state, OrderDelivered: payload };

        case ActionType.SHOWORDERDETAILS:
            return { ...state, OrderDetails: payload };

        case ActionType.EDITPRODUCT:
            return { ...state, EditProduct: payload };

        case ActionType.SELLER:
            return { ...state, Seller: payload };
        case ActionType.CATEGORY:
            return { ...state, Category: payload };
        case ActionType.SUB_CATEGORY:
            return { ...state, subCategory: payload };
        case ActionType.EDIT_SELLER:
            return { ...state, EditSeller: payload };
        case ActionType.EDIT_CATEGORY:
            return { ...state, EditCategory: payload };
        case ActionType.EDIT_OR_ADD:
            return { ...state, editOrAdd: payload };

        default:
            return state;
    }
}

export default UtilsReducer;