import axios from "axios";
import url from "../api-config/api_url";

axios.defaults.headers.common["key"] = "my_doggo_name_jeff";

class OrderService{
    static async getOrderByRequestId(id){
        return await axios.get(url.Order.getOrderByRequestId+id)
    }
    static async createOrder(data){
        return await axios.post(url.Order.createOrder, data)
    }
    static async getOrderById(id){
        return await axios.get(url.Order.getOrderById+id)
    }
    static async editOrderById(id, data){
        return await axios.put(url.Order.editOrderById+id, data)
    }
    static async deleteOrderById(id){
        return await axios.delete(url.Order.deleteOrderById+id)
    }
}
export default OrderService