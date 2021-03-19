const conn = require('../database/mysql_connector')
const util = require('util')
const mysql_query = util.promisify(conn.query).bind(conn)

class Authorization{
    static async checkLoginRoute(username){
        try{
            var stmt = 'select * from User as u \
                        inner join Customer as c \
                        using (account_id) \
                        where u.account_username = ?'
            var stmt2 = 'select * from User as u \
                        inner join Staff as s \
                        on u.account_id = s.account_id \
                        where u.account_username = ?'
            var customer_data = JSON.parse(JSON.stringify(await mysql_query(stmt, username)))[0]
            var staff_data = JSON.parse(JSON.stringify(await mysql_query(stmt2, username)))[0]

            if (customer_data){
                return Promise.resolve('/login/customer')
            }
            else if (staff_data){
                var type = staff_data.staff_type
                if (type === 'supervisor'){
                    return Promise.resolve('/login/supervisor')
                }
                else if (type === 'order_manager'){
                    return Promise.resolve('/login/order_manager')
                }
                else if (type === 'messenger'){
                    return Promise.resolve('/login/messenger')
                }
            }
            else{
                return Promise.reject('user not found')
            }
        }
        catch(err){
            return Promise.reject(err)
        }
    }
    static async checkRegisterRoute(type, secret_key){
        if (type === 'customer'){
            return Promise.resolve('/register/customer')
        }
        else if (type === 'supervisor'){
            return Promise.resolve('/register/supervisor')
        }
        else if (type === 'order_manager'){
            return Promise.resolve('/register/order_manager')
        }
        else if (type === 'messenger'){
            return Promise.resolve('/register/messenger')
        }
        else{
            return Promise.reject('BAD REQUEST')
        }
    }
}

module.exports = Authorization
