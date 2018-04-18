import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import contractReducer from "./contractReducer";
import schoolReducer from "./schoolReducer";
import companyReducer from "./companyReducer";
import userReducer from "./userReducer";

export default combineReducers({
	auth: authReducer,
	userProjects: projectReducer,
	userContracts: contractReducer,
	schools: schoolReducer,
	companies: companyReducer,
	users: userReducer
});
