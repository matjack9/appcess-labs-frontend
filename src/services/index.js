const API_ROOT = `http://localhost:3000/api/v1`;

const headers = {
	"Content-Type": "application/json",
	Accepts: "application/json"
};

const getWithToken = url => {
	const token = localStorage.getItem("token");
	return fetch(url, {
		headers: { Authorization: token }
	}).then(res => res.json());
};

const getCurrentUser = () => {
	return getWithToken(`${API_ROOT}/current_user`);
};

const login = data => {
	return fetch(`${API_ROOT}/login/`, {
		method: "POST",
		headers,
		body: JSON.stringify(data)
	}).then(res => res.json());
};

const getUserProject = id => {
	return getWithToken(`${API_ROOT}/projects/${id}`);
};

const getUserProjects = () => {
	return getWithToken(`${API_ROOT}/projects`);
};

const getUserContract = id => {
	return getWithToken(`${API_ROOT}/contracts/${id}`);
};

const getUserContracts = () => {
	return getWithToken(`${API_ROOT}/contracts`);
};

const getSchool = id => {
	return getWithToken(`${API_ROOT}/schools/${id}`);
};

const getSchools = () => {
	return getWithToken(`${API_ROOT}/schools`);
};

export const adapter = {
	auth: {
		login,
		getCurrentUser
	},
	projects: {
		getUserProject,
		getUserProjects
	},
	contracts: {
		getUserContract,
		getUserContracts
	},
	schools: {
		getSchool,
		getSchools
	}
};
