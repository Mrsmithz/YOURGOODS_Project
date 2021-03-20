import axios from 'axios'

const register = 'http://192.168.1.10:25800/api/auth/register';
const login = 'http://192.168.1.10:25800/api/auth/login';

class AccountService{
    static async createAccount(form){
        var object = {};
        form.forEach((value, key) => object[key] = value);
        var data = JSON.stringify(object);
        var json = JSON.parse(data);
        return await axios.post(register, json)
    }
    static async Login(form){
        var object = {};
        form.forEach((value, key) => object[key] = value);
        var data = JSON.stringify(object);
        var json = JSON.parse(data);
        return await axios.post(login, json)
    }
}

export default AccountService