const pool = require('../database/mysql_connector')

class Order{
    constructor(id, company_name, receiver_address, pickup_address, invoice_id,
        container_id, request_id, operator_id){
        this.id = id
        this.company_name = company_name
        this.receiver_address = receiver_address
        this.pickup_address = pickup_address
        this.invoice_id = invoice_id
        this.container_id = container_id
        this.request_id = request_id
        this.operator_id = operator_id
    }
    async createOrder(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into ORDERS(company_name, receiver_address, pickup_address, \
                invoice_id, container_id, request_id, operator_id) values(?,?,?,?,?,?,?)'
            let result = await conn.query(stmt, [this.company_name, this.receiver_address, this.pickup_address,
            this.invoice_id, this.container_id, this.request_id, this.operator_id])
            this.id = result[0].insertId
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
    async getOrdersByOperator(operator_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from ORDERS where operator_id = ?'
            let [rows, fields] = await conn.query(stmt, [operator_id])
            await conn.commit()
            return Promise.resolve(rows)
        }
        catch(err){
            await conn.rollback()
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
    async getOrdersByRequestId(request_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from ORDERS where request_id = ?'
            let [rows, fields] = await conn.query(stmt, [request_id])
            await conn.commit()
            return Promise.resolve(rows)
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
            return Promise.resolve(rows)
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
            var stmt = 'delete from GOODS where order_id = ?'
            var stmt2 = 'delete from SCHEDULE where order_id = ?'
            var stmt3 = 'delete from ORDERS where id = ?'
            var stmt4 = 'delete from LOCATIONS where order_id = ?'
            await conn.query(stmt4, [id])
            await conn.query(stmt, [id])
            await conn.query(stmt2, [id])
            let result = await conn.query(stmt3, [id])
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
    async getOrdersHistoryByCustomer(customer_id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select o.*, c.status from ORDERS as o\
            join CUSTOMER_OPERATOR as c \
            on o.request_id = c.id \
            where c.customer_id = ?'
            let [rows, fields] = await conn.query(stmt, [customer_id])
            await conn.commit()
            return Promise.resolve(rows)
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
