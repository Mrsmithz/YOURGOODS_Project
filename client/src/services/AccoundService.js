import axios from 'axios'
import url from '../api-config/api_url'

class AccountService{
    static async createAccount(form){
        var object = {};
        form.forEach((value, key) => object[key] = value);
        var data = JSON.stringify(object);
        var json = JSON.parse(data);
        return await axios.post(url.resgister, json)
    }
    static async Login(form){
        var object = {};
        form.forEach((value, key) => object[key] = value);
        var data = JSON.stringify(object);
        var json = JSON.parse(data);
        return await axios.post(url.login, json)
    }
    static async getSession(){
        return await axios.post(url.session, {
            api_key:'my_doggo_name_jeff'
        })
    }
}

export default AccountService
