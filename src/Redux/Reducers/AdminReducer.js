import ActionType from "../ActionType";


const AdminState = {
    adminOption:"dashboard",
    All_User:[],
    leftbar_toggle:false,
    admin:{
        _id:"6409f20a1b2b6dc26bd69960"
    }
}



const AdminReducer = (state = AdminState, {type, payload}) => {
    switch(type){
        case ActionType.ADMIN:
            return{...state, adminOption:payload};
        case ActionType.LEFTBAR_TOGGLE:
            return{...state, leftbar_toggle:!state.leftbar_toggle};
        case ActionType.ALL_USER:
            return{...state, All_User:payload};
        case ActionType.ADMIN_USER:
            return{...state, admin:payload};

        default:
            return state;
    }
}

export default AdminReducer;