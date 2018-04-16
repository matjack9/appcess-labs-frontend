const initialState = { users: [] };

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_USERS":
			let newUsers = [...state.users];
			if (action.payload.data && action.payload.data.length) {
				newUsers = filterById([...newUsers, ...action.payload.data]);
			} else if (action.payload.data) {
				newUsers = filterById([...newUsers, action.payload.data]);
			}

			return {
				...state,
				users: newUsers
			};
		case "LOGOUT_USER":
			return initialState;
		default:
			return { ...state };
	}
};

function filterById(arr) {
	let f = [];
	return arr.filter(function(n) {
		return f.indexOf(n.id) == -1 && f.push(n.id);
	});
}

export default userReducer;
