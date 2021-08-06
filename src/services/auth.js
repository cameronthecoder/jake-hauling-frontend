import axios from "axios";

class AuthenticationService {
    async authenticate(user) {
        try {
            const { data } = await axios.post('/api/auth/token/', `grant_type=password&username=${user.username}&password=${user.password}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            console.log(data);
            return [data, null];
        } catch (error) {
            console.log(error);
            return [null, error];
        }
    }
    async authenticateWithIntuit() {
        // This function authenticates the user with QuickBooks online
        try {
            const { data } = await axios.get('/api/oauth/');
            window.location.replace(data.authorization_url);
        } catch (error) {
            return [null, error];
        }
    }
    async loadUser() {
        try {
            const { data } = await axios.get('/api/auth/me');
            return [data, null];
        } catch (error) {
            console.log(error);
            return [null, error];
        }
    }
}

export default new AuthenticationService();