import axios from 'axios'
import url from '../api-config/api_url'

axios.defaults.headers.common['key'] = 'my_doggo_name_jeff'

class VehicleService{
    static async addVehicle(data){
        return await axios.post(url.Vehicle.addVehicle, data)
    }
    static async getAllVehicleByManagerId(){
        return await axios.get(url.Vehicle.getAllVehicleByManagerId)
    }
}

export default VehicleService