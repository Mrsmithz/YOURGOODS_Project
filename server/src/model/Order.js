const pool = require('../database/mysql_connector')

class Order{
    constructor(id, company_name, receiver_address, pickup_address, invoice_id,
        container_id, customer_id, operator_id){
        this.id = id
        this.company_name = company_name
        this.receiver_address = receiver_address
        this.pickup_address = pickup_address
        this.invoice_id = invoice_id
        this.container_id = container_id
        this.customer_id = customer_id
        this.operator_id = operator_id
    }
    async createOrder(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into ORDERS(company_name, receiver_address, pickup_address, \
                invoice_id, container_id, customer_id, operator_id) values(?,?,?,?,?,?,?)'
            let result = await conn.query(stmt, [this.company_name, this.receiver_address, this.pickup_address,
            this.invoice_id, this.container_id, this.customer_id, this.operator_id])
            this.id = result[0].insertId
            await conn.commit()
            return Promise.resolve()
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getOrdersByOperator(operator_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from ORDERS where operator_id = ?'
            let [rows, fields] = await conn.query(stmt, [operator_id])
            await conn.commit()
            return Promise.resolve(rows[0])
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getOrdersByCustomer(customer_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from ORDERS where customer_id = ?'
            let [rows, fields] = await conn.query(stmt, [customer_id])
            await conn.commit()
            return Promise.resolve(rows[0])
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getOrdersById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from ORDERS where id = ?'
            let [rows, fields] = await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve(rows[0])
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async updateOrderById(id, company_name, receiver_address, pickup_address, invoice_id, container_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update ORDERS set company_name = ?, receiver_address = ?, pickup_address = ?, \
            invoice_id = ?, container_id = ? where id = ?'
            let result = await conn.query(stmt, [company_name, receiver_address, pickup_address,
            invoice_id, container_id, id])
            await conn.commit()
            return Promise.resolve(result)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async deleteOrderById(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'delete from ORDERS where id = ?'
            let result = await conn.query(stmt, [id])
            await conn.commit()
            return Promise.resolve(result)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
}

module.exports = Order
