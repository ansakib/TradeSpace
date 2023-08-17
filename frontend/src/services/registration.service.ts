import API from "../api/axios.config";

class RegistrationService {
    async register(userinfo: any) {
        return (await API.post(`/auth/register`, userinfo));
    }

    async verifyPhone(phone_otp_pair: any) {
        console.log(phone_otp_pair);
        return (await API.post('/auth/verify-phone', phone_otp_pair));

    }
}

export const registrationService = new RegistrationService();