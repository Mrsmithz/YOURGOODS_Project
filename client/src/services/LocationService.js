import axios from "axios";
import url from "../api-config/api_url";

axios.defaults.headers.common["key"] = "my_doggo_name_jeff";

class LocationService {
    static async addLocation(data){
        return await axios.post(url.Location.addLocation, data)
    }
    static async getLocationByOrderId(id){
        return await axios.get(url.Location.getLocationByOrderId+id)
    }
}
export default LocationService