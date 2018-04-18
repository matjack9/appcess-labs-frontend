const initialState = { companies: [] };

const companyReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_COMPANIES":
			let newCompanies = [...state.companies];
			if (action.payload.data && action.payload.data.length) {
				newCompanies = filterById([...newCompanies, ...action.payload.data]);
			} else if (action.payload.data) {
				newCompanies = filterById([...newCompanies, action.payload.data]);
			}

			return { ...state, companies: newCompanies };
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

export default companyReducer;
