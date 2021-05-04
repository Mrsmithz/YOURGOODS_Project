import axios from "axios";
import url from "../api-config/api_url";

axios.defaults.headers.common["key"] = "my_doggo_name_jeff";
class CustomerService {
  static async createRequest(data, file, callback) {
    let config = {
      onUploadProgress(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (callback) {
          callback(percentCompleted, file);
        }
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await axios.post(url.customer.createRequest, data, config);
  }
  static async getAllRequestByCustomerId() {
    return await axios.get(url.customer.getAllRequestByCustomerId);
  }
  static async editRequest(id, data, file, callback) {
    let config = {
      onUploadProgress(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (callback) {
          callback(percentCompleted, file);
        }
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await axios.put(url.customer.editRequestById + id, data, config );
  }
  static async deleteRequest(id) {
    return await axios.delete(url.customer.deleteRequestById + id);
  }
  static async getOrdersHistory(){
      return await axios.get(url.customer.getOrdersHistory)
  }
  static async createFeedback(form){
    return await axios.post(url.Feedback.createFeedback, form)
  }
}
export default CustomerService;
