import axios from 'axios'
import url from '../api-config/api_url'

axios.defaults.headers.common['key'] = 'my_doggo_name_jeff'

class DashboardService{
    static async getCustomerAndOperator(){
        return await axios.get(url.Dashboard.CustomerAndOperator)
    }
}
export default DashboardService