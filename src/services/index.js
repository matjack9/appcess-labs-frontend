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

const postWithToken = (url, data) => {
	const token = localStorage.getItem("token");
	return fetch(url, {
		method: "POST",
		headers: { ...headers, Authorization: token },
		body: JSON.stringify(data)
	}).then(res => res.json());
};

const patchWithToken = (url, data) => {
	const token = localStorage.getItem("token");
	return fetch(url, {
		method: "PATCH",
		headers: { ...headers, Authorization: token },
		body: JSON.stringify(data)
	}).then(res => res.json());
};

const deleteWithToken = (url, data) => {
	const token = localStorage.getItem("token");
	return fetch(url, {
		method: "DELETE",
		headers: { ...headers, Authorization: token },
		body: JSON.stringify(data)
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

const postProject = projectData => {
	return postWithToken(`${API_ROOT}/projects`, projectData);
};

const postContract = contractData => {
	return postWithToken(`${API_ROOT}/contracts`, contractData);
};

const patchContract = contractData => {
	return patchWithToken(
		`${API_ROOT}/contracts/${contractData.id}`,
		contractData.phaseParams
	);
};

const getUsers = () => {
	return getWithToken(`${API_ROOT}/users`);
};

const postUser = data => {
	return fetch(`${API_ROOT}/users`, {
		method: "POST",
		headers,
		body: JSON.stringify(data)
	}).then(res => res.json());
};

const getGroup = (type, key) => {
	let route = "";
	if (type === "School") {
		route = "schools_by_key";
	} else {
		route = "companies_by_key";
	}

	return fetch(`${API_ROOT}/${route}/${key}`).then(res => res.json());
};

const postGroup = (type, data) => {
	let route = "";
	if (type === "School") {
		route = "schools";
	} else {
		route = "companies";
	}

	return fetch(`${API_ROOT}/${route}`, {
		method: "POST",
		headers,
		body: JSON.stringify(data)
	}).then(res => res.json());
};

export const adapter = {
	auth: {
		login,
		getCurrentUser
	},
	projects: {
		getUserProject,
		getUserProjects,
		postProject
	},
	contracts: {
		getUserContract,
		getUserContracts,
		postContract,
		patchContract
	},
	schools: {
		getSchool,
		getSchools
	},
	users: {
		getUsers,
		postUser
	},
	groups: {
		getGroup,
		postGroup
	}
};
