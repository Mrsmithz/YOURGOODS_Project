import axios from 'axios'
import url from '../api-config/api_url'

axios.defaults.headers.common['key'] = 'my_doggo_name_jeff'

class Contacts{
    static async sendMessage(data){
        return await axios.post(url.contacts.sendMessage, data)
    }
    static async getMessageBySender(data){
        return await axios.post(url.contacts.getMessageBySender, data)
    }
    static async getMessageByReceiver(data){
        return await axios.post(url.contacts.getMessageByReceiver, data)
    }
    static async getNameById(id){
        return await axios.get(url.contacts.getNameById+id)
    }
    static async getUnReadMessageByReceiver(){
        return await axios.get(url.contacts.getUnReadMessageByReceiver)
    }
    static async UpdateMessageStatusByReceiver(data){
        return await axios.put(url.contacts.updateMessageStatus, data)
    }
}
export default Contacts