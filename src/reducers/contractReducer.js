const initialState = { contracts: [] };

const contractReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_CONTRACTS":
			let newContracts = [...state.contracts];
			if (action.payload.data && action.payload.data.length) {
				newContracts = filterById([...newContracts, ...action.payload.data]);
			} else if (action.payload.data) {
				newContracts = filterById([...newContracts, action.payload.data]);
			}

			return {
				...state,
				contracts: newContracts
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

export default contractReducer;
