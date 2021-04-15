import serverUrl, {authHeaderName} from "./ServiceConstants";

const AuthService = {

    login: function (username, password, setAuthenticatedUser, history) {
        fetch(serverUrl + 'auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.status);
            })
            .then(response => {
                if (response.token) {
                    localStorage.setItem(authHeaderName, JSON.stringify(response));
                    setAuthenticatedUser(response)
                    history.push('/records');
                    window.location.reload();
                }
            }).catch((error) => {
                alert('error: ' + error);
            });
    },

    logout: function (setAuthenticatedUser) {
        localStorage.removeItem("user");
        setAuthenticatedUser(null);
    },

    register: function (username, email, password) {
        return fetch(serverUrl + 'auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
                'email': email
            })
        });
    },

    getCurrentUser: function () {
        return JSON.parse(localStorage.getItem(authHeaderName));
    }
}

export default AuthService;
