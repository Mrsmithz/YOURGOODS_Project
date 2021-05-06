const pool = require("../database/mysql_connector");
const bcrypt = require("bcrypt");
class User {
  constructor(
    id,
    username,
    password,
    name,
    email,
    gender,
    telephone,
    address,
    type,
    manage_by
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.telephone = telephone;
    this.address = address;
    this.type = type;
    this.manage_by = manage_by;
  }
  async createAccount() {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt =
        "insert into USER(username, password, name, email, gender, telephone, address, type, manage_by) \
            values(?,?,?,?,?,?,?,?,?)";
      let result = await conn.query(stmt, [
        this.username,
        this.password,
        this.name,
        this.email,
        this.gender,
        this.telephone,
        this.address,
        this.type,
        this.manage_by,
      ]);
      this.id = result[0].insertId;
      await conn.commit();
      return Promise.resolve();
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async updateUserProfile(id, name, telephone, address) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt =
        "update USER set name = ?, telephone = ?, address = ? where id = ?";
      let result = await conn.query(stmt, [name, telephone, address, id]);
      await conn.commit();
      return Promise.resolve(result);
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async updateUserPassword(id, old_password, new_password) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var check_pass = "select password from USER where id = ?";
      let [current_password, fields] = await conn.query(check_pass, [id]);
      if (await bcrypt.compare(old_password, current_password[0].password)) {
        var stmt = "update USER set password = ? where id = ?";
        await conn.query(stmt, [new_password, id]);
      } else {
        await conn.commit();
        return Promise.reject("Current password is invalid");
      }
      await conn.commit();
      return Promise.resolve();
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async updateUserEmail(id, old_email, new_email) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "update USER set email = ? where id = ? and email = ?";
      let result = await conn.query(stmt, [new_email, id, old_email]);
      await conn.commit();
      if (result[0].affectedRows == 0) {
        return Promise.reject("Email did not matched");
      }
      return Promise.resolve(result);
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async deleteAccount(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "DELETE from USER where id = ?";
      let result = await conn.query(stmt, [id]);
      await conn.commit();
      return Promise.resolve(result);
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async userLogin(username, password) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "select * from USER where username = ?";
      let [rows, field] = await conn.query(stmt, [username]);
      await conn.commit();
      var data = rows[0];
      if (await bcrypt.compare(password, data.password)) {
        this.id = data.id;
        this.username = data.username;
        // this.password = data.password
        this.name = data.name;
        this.email = data.email;
        this.telephone = data.telephone;
        this.gender = data.gender;
        this.address = data.address;
        this.type = data.type;
        this.manage_by = data.manage_by;
        return Promise.resolve();
      } else {
        return Promise.reject(`Couldn't find user or password didn't match`);
      }
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async getUserById(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "select * from USER where id = ?";
      let [rows, field] = await conn.query(stmt, [id]);
      await conn.commit();
      var data = rows[0];
      if (data) {
        this.id = data.id;
        this.username = data.username;
        // this.password = data.password
        this.name = data.name;
        this.email = data.email;
        this.telephone = data.telephone;
        this.gender = data.gender;
        this.address = data.address;
        this.type = data.type;
        this.manage_by = data.manage_by;
        return Promise.resolve();
      } else {
        return Promise.reject(`Couldn't find user or password didn't match`);
      }
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async checkUsernameDuplicate(username) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "select * from USER where username = ?";
      let [rows, fields] = await conn.query(stmt, [username]);
      await conn.commit();
      if (rows.length > 0) {
        return Promise.reject("Username duplicated");
      }
      return Promise.resolve();
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async checkEmailDuplicate(email) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "select * from USER where email = ?";
      let [rows, fields] = await conn.query(stmt, [email]);
      await conn.commit();
      if (rows.length > 0) {
        return Promise.reject("Email duplicated");
      }
      return Promise.resolve();
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async checkSupervisorId(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "select id, type from USER where id = ?";
      let [rows, fields] = await conn.query(stmt, [id]);
      await conn.commit();
      if (rows.length > 0) {
        if (rows[0].id == id && rows[0].type == "supervisor") {
          return Promise.resolve("Supervisor ID valid");
        } else {
          return Promise.reject("Supervisor ID invalid");
        }
      } else {
        return Promise.reject("Supervisor ID not found");
      }
    } catch (err) {
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  async getNameById(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt = "select name from USER where id = ?";
      let [rows, fields] = await conn.query(stmt, [id]);
      await conn.commit();
      return Promise.resolve(rows);
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  static async getStaffManageBy(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt =
        "select id, name, type, username, gender, telephone, email from USER where manage_by = ?";
      let [rows, fields] = await conn.query(stmt, [id]);
      await conn.commit();
      return Promise.resolve(rows);
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }

  static async getCustomerOrOperatorDashboard(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt =
        "select count(status) as status_count, c.status from CUSTOMER_OPERATOR as c \
            join USER as u \
            on u.id = c.customer_id or u.id = c.operator_id \
            where u.id = ? and (c.status = 'completed' or c.status = 'in progress' or c.status = 'pending') \
            group by status \
            order by c.status asc";
      var stmt2 =
        "select c.*, o.*, s.*, c.created_datetime as req_created_at, c.modified_datetime as req_modified_at, \
        o.created_datetime as order_created_at, o.modified_datetime as order_modified_at \
        from CUSTOMER_OPERATOR as c \
            join USER as u \
            on u.id = c.customer_id or u.id = c.operator_id \
            left join ORDERS as o \
            on o.request_id = c.id \
            left join SCHEDULE as s \
            on s.order_id = o.id \
            where u.id = ? and (c.status = 'completed' or c.status = 'in progress' or c.status = 'pending') \
            order by c.created_datetime asc";
      let [status_count, fields1] = await conn.query(stmt, [id]);
      let [request_detail, fields2] = await conn.query(stmt2, [id]);
      await conn.commit();
      return Promise.resolve({
        status_count: status_count,
        request_detail: request_detail,
      });
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  static async getStaffDashboard(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt =
        "select user.name as customer_name, o.*, c.*, s.*, s.create_datetime as schedule_created_at, s.modified_datetime as schedule_created_at, \
        s.vehicle_plate_number as plate_number \
        from CUSTOMER_OPERATOR as c \
        join ORDERS as o \
        on o.request_id = c.id \
        join SCHEDULE as s \
        on s.order_id = o.id \
        join USER as staff \
        on staff.id = s.transport_id or staff.id = s.shipping_id or staff.id = s.driver_id \
        join USER as user \
        on user.id = c.customer_id \
        where staff.id = ?";
      var stmt2 =
        "select count(status) as status_count, c.status from CUSTOMER_OPERATOR as c \
        join ORDERS as o \
        on o.request_id = c.id \
        join SCHEDULE as s \
        on s.order_id = o.id \
        join USER as staff \
        on staff.id = s.transport_id or staff.id = s.shipping_id or staff.id = s.driver_id \
        where staff.id = ? \
        group by status  \
        order by c.status asc";
      let [order_details, fields1] = await conn.query(stmt, [id]);
      let [order_status_count, fields2] = await conn.query(stmt2, [id]);
      await conn.commit();
      return Promise.resolve({
        order_details: order_details,
        order_status_count: order_status_count,
      });
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
  static async getSupervisorDashboard(id) {
    let conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      var stmt =
        "select count(c.status) as status_count, c.status from USER as supervisor \
        join USER as staff \
        on staff.manage_by = supervisor.id \
        join CUSTOMER_OPERATOR as c \
        on c.operator_id = staff.id \
        left join ORDERS as o \
        on o.request_id = c.id \
        left join SCHEDULE as s \
        on s.order_id = o.id \
        where supervisor.id = ? \
        group by status";
      var stmt2 =
        "select o.*, c.status, s.arrived_datetime, s.pickup_datetime from USER as supervisor \
        join USER as staff \
        on staff.manage_by = supervisor.id \
        join CUSTOMER_OPERATOR as c \
        on c.operator_id = staff.id \
        left join ORDERS as o \
        on o.request_id = c.id \
        left join SCHEDULE as s \
        on s.order_id = o.id \
        where supervisor.id = ? \
        order by s.pickup_datetime";
      let [status_count, fields1] = await conn.query(stmt, [id]);
      let [order_details, fields2] = await conn.query(stmt2, [id]);
      await conn.commit();
      return Promise.resolve({
        status_count: status_count,
        order_details: order_details,
      });
    } catch (err) {
      await conn.rollback();
      return Promise.reject(err);
    } finally {
      conn.release();
    }
  }
}

module.exports = User;
