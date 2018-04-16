const initialState = { projects: [] };

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_PROJECTS":
			let newProjects = [...state.projects];
			if (action.payload.data && action.payload.data.length) {
				newProjects = filterById([...newProjects, ...action.payload.data]);
			} else if (action.payload.data) {
				newProjects = filterById([...newProjects, action.payload.data]);
			}

			return {
				...state,
				projects: newProjects
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

export default projectReducer;
