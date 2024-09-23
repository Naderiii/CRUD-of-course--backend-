const pool = require("../utilities/mysql_database");

class UsersModel {
  
  static insertUser = async(username , email , password) =>{
    const [result] = await pool.query(`insert into users 
    (username , email , password, id ) 
    values (? ,? , ?, uuid())` , [username , email , password])
    return result
  }

  static getUserByEmail = async(email)=>{
    const [result] = await pool.query("select * from users where email = ?" , [email])
    return result[0]
  }
}
module.exports = UsersModel;
