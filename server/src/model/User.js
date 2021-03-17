class User{
    constructor(id, username, password){
        this.account_id = id
        this.account_username = username
        this.account_password = password
    }
    async login(){
        console.log(`${this.account_username} logged in`)
    }
    async logout(){

    }
    async getSession(){

    }
}
module.exports = User
