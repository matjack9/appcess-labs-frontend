import { adapter } from "../services";

export const fetchUser = () => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.auth.getCurrentUser().then(user => {
		dispatch({ type: "SET_CURRENT_USER", user });
	});
};

export const loginUser = (email, password, history) => dispatch => {
	dispatch({ type: "ASYNC_START" });

	adapter.auth.login({ email, password }).then(user => {
		localStorage.setItem("token", user.jwt);
		dispatch({ type: "SET_CURRENT_USER", user });

		if (localStorage.getItem("token") !== "undefined") {
			history.push("/");
		} else {
			alert(user.error);
		}
	});
};

export const logoutUser = history => {
	localStorage.removeItem("token");
	history.push("/");
	return { type: "LOGOUT_USER" };
};

export const fetchUserProject = id => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.projects.getUserProject(id).then(payload => {
		dispatch({ type: "SET_PROJECTS", payload });
	});
};

export const fetchUserProjects = () => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.projects.getUserProjects().then(payload => {
		dispatch({ type: "SET_PROJECTS", payload });
	});
};

export const fetchUserContract = id => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.contracts.getUserContract(id).then(payload => {
		dispatch({ type: "SET_CONTRACTS", payload });
	});
};

export const fetchUserContracts = () => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.contracts.getUserContracts().then(payload => {
		dispatch({ type: "SET_CONTRACTS", payload });
	});
};

export const fetchSchool = id => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.schools.getSchool(id).then(payload => {
		dispatch({ type: "SET_SCHOOLS", payload });
	});
};

export const fetchSchools = () => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.schools.getSchools().then(payload => {
		dispatch({ type: "SET_SCHOOLS", payload });
	});
};

export const fetchUsers = () => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.users.getUsers().then(payload => {
		dispatch({ type: "SET_USERS", payload });
	});
};

export const createProject = (
	name,
	description,
	user_stories,
	requirements,
	history
) => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.projects
		.postProject({ name, description, user_stories, requirements })
		.then(project => {
			if (project.data) {
				history.push(`/projects/${project.data.id}`);
			} else {
				let errorMessage = project.errors;
				alert(errorMessage);
			}
		});
};

export const createContract = (project_id, school_id, history) => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.contracts.postContract({ project_id, school_id }).then(contract => {
		if (contract.data) {
			history.push(`/contracts/${contract.data.id}`);
		} else {
			let errorMessage = contract.errors;
			alert(errorMessage);
		}
	});
};

export const updateContract = (updateParams, history) => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.contracts.patchContract(updateParams).then(contract => {
		if (contract.data) {
			history.push(`/contracts/${contract.data.id}`);
		} else {
			let errorMessage = contract.errors;
			alert(errorMessage);
		}
	});
};

export const fetchUserContractAndProject = id => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.contracts.getUserContract(id).then(payload => {
		dispatch({ type: "SET_CONTRACTS", payload });
		adapter.projects
			.getUserProject(parseInt(payload.data.relationships.project.data.id))
			.then(payload => {
				dispatch({ type: "SET_PROJECTS", payload });
			});
	});
};

export const fetchGroup = (type, key) => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.groups.getGroup(type, key).then(payload => {
		if (payload.error) {
			alert(payload.error);
		} else if (type === "School") {
			dispatch({ type: "SET_SCHOOLS", payload });
		} else {
			dispatch({ type: "SET_COMPANIES", payload });
		}
	});
};

export const createUser = (data, history) => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.users.postUser(data).then(payload => {
		localStorage.setItem("token", payload.jwt);
		const user = payload;
		dispatch({ type: "SET_CURRENT_USER", user });
		if (localStorage.getItem("token") !== "undefined") {
			history.push("/");
		} else {
			alert(payload.errors);
		}
	});
};

export const createGroupAndUser = (
	type,
	group_data,
	user_data,
	history
) => dispatch => {
	dispatch({ type: "ASYNC_START" });
	adapter.groups.postGroup(type, group_data).then(payload => {
		if (payload.errors) {
			alert(payload.errors);
		} else {
			user_data["account_id"] = payload.data.id;
			adapter.users.postUser(user_data).then(user => {
				localStorage.setItem("token", user.jwt);
				dispatch({ type: "SET_CURRENT_USER", user });
				if (localStorage.getItem("token") !== "undefined") {
					history.push("/");
				} else {
					alert(user.error);
				}
			});
		}
	});
};
