import axios from 'axios'

const register = 'http://localhost:25800/api/auth/register';
const login = 'http://localhost:25800/api/auth/login';
const session = 'http://localhost:25800/api/auth/login/session'
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
    static async getSession(){
        return await axios.post(session, {
            api_key:'my_doggo_name_jeff'
        })
    }
}

export default AccountService
