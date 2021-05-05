import axios from 'axios'
import url from '../api-config/api_url'

axios.defaults.headers.common['key'] = 'my_doggo_name_jeff'

class DashboardService{
    static async getCustomerAndOperator(){
        return await axios.get(url.Dashboard.CustomerAndOperator)
    }
    static async getStaffDashboard(){
        return await axios.get(url.Dashboard.StaffDashboard)
    }
    static async getSupervisorDashboard(){
        return await axios.get(url.Dashboard.SupervisorDashboard)
    }
}
export default DashboardService