import axios from "axios";
import url from "../api-config/api_url";

axios.defaults.headers.common["key"] = "my_doggo_name_jeff";

class GoodsService{
    static async createGoods(data){
        return await axios.post(url.Goods.createGoods, data)
    }
    static async editGoodsById(id, data){
        return await axios.put(url.Goods.editGoodsById+id, data)
    }
    static async deleteGoodsByOrderId(id){
        return await axios.delete(url.Goods.deleteGoodsByOrderId+id)
    }
    static async deleteGoodsById(id){
        return await axios.delete(url.Goods.deleteGoodsById+id)
    }
    static async getGoodsByOrderId(id){
        return await axios.get(url.Goods.getGoodsByOrderId+id)
    }
    static async getGoodsById(id){
        return await axios.get(url.Goods.getGoodsById+id)
    }
}
export default GoodsService