const mangoose = require("mongoose")

async function connectDB (){
    try {
        await mangoose.connect(process.env.MANGODB_URI)

        const connection = mangoose.connection

        connection.on('connected', ()=>{
            console.log("connected to db")
        })

        connection.on('error', (error)=>{
            console.log("something is wrong in mangodb" , error)
        } )

    } catch (error) {

        console.log("something is wrong  " , error)
        
    }
}

module.exports =connectDB