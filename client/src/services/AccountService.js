import axios from 'axios'
import url from '../api-config/api_url'

axios.defaults.headers.common['key'] = 'my_doggo_name_jeff'

class AccountService{
    static async createAccount(form){
        return await axios.post(url.resgister, form)
    }
    static async Login(form){
        return await axios.post(url.login, form)
    }
    static async getSession(){
        return await axios.get(url.session)
    }
    static async Logout(){
        return await axios.get(url.logout)
    }
    static async updatePassword(data){
        return await axios.post(url.User.updatePassword, data)
    }
    static async updateEmail(data){
        return await axios.put(url.User.updateEmail, data)
    }
    static async updateProfile(data){
        return await axios.put(url.User.updateProfile, data)
    }
}

export default AccountService
