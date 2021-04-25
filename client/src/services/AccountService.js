import axios from 'axios'
import url from '../api-config/api_url'

axios.defaults.headers.common['key'] = 'my_doggo_name_jeff'

class AccountService{
    static async createAccount(form){
        // var object = {};
        // form.forEach((value, key) => object[key] = value);
        // var data = JSON.stringify(object);
        // var json = JSON.parse(data);
        return await axios.post(url.resgister, form)
    }
    static async Login(form){
        // var object = {};
        // form.forEach((value, key) => object[key] = value);
        // var data = JSON.stringify(object);
        // var json = JSON.parse(data);
        return await axios.post(url.login, form)
    }
    static async getSession(){
        return await axios.get(url.session)
    }
    static async Logout(){
        return await axios.get(url.logout)
    }
}

export default AccountService
