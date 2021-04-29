import axios from "axios";
import url from "../api-config/api_url";

axios.defaults.headers.common["key"] = "my_doggo_name_jeff";

class ScheduleService{
    static async createSchedule(data){
        return await axios.post(url.Schedule.createSchedule, data)
    }
    static async getScheduleByOrder(id){
        return await axios.get(url.Schedule.getScheduleByOrder+id)
    }
    static async getScheduleById(id){
        return await axios.get(url.Schedule.getScheduleById+id)
    }
    static async getScheduleDetail(){
        return await axios.get(url.Schedule.getScheduleDetail)
    }
}
export default ScheduleService