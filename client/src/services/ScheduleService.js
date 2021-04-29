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
    static async getScheduleInProgressDetail(){
        return await axios.get(url.Schedule.getScheduleInProgressDetail)
    }
    static async getScheduleCompletedDetail(){
        return await axios.get(url.Schedule.getScheduleCompletedDetail)
    }
    static async getAllDriver(){
        return await axios.get(url.Schedule.getAllDriver)
    }
    static async updateScheduleDriver(id, data){
        return await axios.put(url.Schedule.updateScheduleDriver+id, data)
    }
    static async updateScheduleVehicle(id, data){
        return await axios.put(url.Schedule.updateScheduleVehicle+id, data)
    }
}
export default ScheduleService