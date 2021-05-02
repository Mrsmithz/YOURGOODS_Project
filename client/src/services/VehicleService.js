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
    static async deleteVehicle(plate_number){
        return await axios.delete(url.Vehicle.deleteVehicle+plate_number)
    }
    static async updateVehicleStatus(data){
        return await axios.put(url.Vehicle.updateVehicleStatus, data)
    }
    static async editVehicle(data){
        return await axios.put(url.Vehicle.editVehicle, data)
    }
}

export default VehicleService