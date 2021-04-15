const pool = require('../database/mysql_connector')

class User{
    constructor(id, username, password, name, email, gender, telephone, address, type, manage_by){
        this.id = id
        this.username = username
        this.password = password
        this.name = name
        this.email = email
        this.gender = gender
        this.telephone = telephone
        this.address = address
        this.type = type
        this.manage_by = manage_by
    }
    async createAccount(){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'insert into USER(username, password, name, email, gender, telephone, address, type, manage_by) \
            values(?,?,?,?,?,?,?,?,?)'
            let result = await conn.query(stmt, [this.username, this.password, this.name, this.email,
                this.gender, this.telephone, this.address, this.type, this.manage_by])
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
    async updateUserProfile(id, name, gender, telephone, address){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update USER set name = ?, gender = ?, telephone = ?, address = ? where id = ?'
            let result = await conn.query(stmt, [name, gender, telephone, address, id])
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
    async updateUserPassword(id, old_password, new_password){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update USER set password = ? where id = ? and password = ?'
            let result = await conn.query(stmt, [new_password, id, old_password])
            await conn.commit()
            if (result[0].affectedRows == 0){
                return Promise.reject('password did not matched')
            }
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
    async updateUserEmail(id, old_email, new_email){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'update USER set email = ? where id = ? and email = ?'
            let result = await conn.query(stmt, [new_email, id, old_email])
            await conn.commit()
            if (result[0].affectedRows == 0){
                return Promise.reject('email did not matched')
            }
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
    async deleteAccount(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'DELETE from USER where id = ?'
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
    async userLogin(username, password){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from USER where username = ? and password = ?'
            let [rows, field] = await conn.query(stmt, [username, password])
            await conn.commit()
            var data = rows[0]
            this.id = data.id
            this.username = data.username
            // this.password = data.password
            this.name = data.name
            this.email = data.email
            this.telephone = data.telephone
            this.gender = data.gender
            this.address = data.address
            this.type = data.type
            this.manage_by = data.manage_by
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
    async checkUsernameDuplicate(username){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from USER where username = ?'
            let [rows, fields] = await conn.query(stmt, [username])
            await conn.commit()
            if (rows.length > 0){
                return Promise.reject('username duplicated')
            }
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
    async checkEmailDuplicate(email){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select * from USER where email = ?'
            let [rows, fields] = await conn.query(stmt, [email])
            await conn.commit()
            if (rows.length > 0){
                return Promise.reject('email duplicated')
            }
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
    async checkSupervisorId(id){
        let conn = await pool.getConnection()
        await conn.beginTransaction()
        try{
            var stmt = 'select id, type from USER where id = ?'
            let [rows, fields] =  await conn.query(stmt, [id])
            await conn.commit()
            if (rows.length > 0){
                if (rows[0].id == id && rows[0].type == 'supervisor'){
                    return Promise.resolve('ID valid')
                }
                else{
                    return Promise.reject('ID invalid')
                }
            }
            else{
                return Promise.reject('ID not found')
            }
        }
        catch(err){
            return Promise.reject(err)
        }
        finally{
            conn.release()
        }
    }
}

module.exports = User
