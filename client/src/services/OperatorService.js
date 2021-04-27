import axios from "axios";
import url from "../api-config/api_url";

axios.defaults.headers.common["key"] = "my_doggo_name_jeff";

class OperatorService{
    static async getRequestByOperatorId(){
        return await axios.get(url.Operator.getRequestByOperatorId)
    }
    static async updateRequestStatus(id, data){
        return await axios.put(url.Operator.updateRequestStatus+id, data)
    }
}
export default OperatorService