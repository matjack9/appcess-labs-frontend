const initialState = { schools: [] };

const schoolReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_SCHOOLS":
			let newSchools = [...state.schools];
			if (action.payload.data && action.payload.data.length) {
				newSchools = filterById([...newSchools, ...action.payload.data]);
			} else if (action.payload.data) {
				newSchools = filterById([...newSchools, action.payload.data]);
			}

			return {
				...state,
				schools: newSchools
			};
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

export default schoolReducer;
