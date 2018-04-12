// import React from "react";

const initialState = { currentUser: {} };

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_CURRENT_USER":
			const {
				id,
				email,
				first_name,
				last_name,
				is_admin,
				account_type,
				account_id
			} = action.user;
			return {
				...state,
				currentUser: {
					id,
					email,
					first_name,
					last_name,
					is_admin,
					account_type,
					account_id
				}
			};
		case "LOGOUT_USER":
			return { ...state, currentUser: {} };
		default:
			return { ...state };
	}
};

export default authReducer;
