import axios from "axios";
import url from "../api-config/api_url";

axios.defaults.headers.common["key"] = "my_doggo_name_jeff";

class StaffService{
    static async getStaffDetail(){
        return await axios.get(url.Supervisor.getStaffDetail)
    }
    static async getLatestFeedback(){
        return await axios.get(url.Supervisor.getLatestFeedback)
    }
}
export default StaffService