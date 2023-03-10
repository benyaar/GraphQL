
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./src/schema/schema')
const mongoose = require("mongoose");
const app = express()
const port = 3000
const mongoURI = process.env.mongoURI || "mongodb+srv://admin:admin@backapi.wojaaxk.mongodb.net/?retryWrites=true&w=majority";

async function runDB() {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected successfully to mongoose server")
    } catch {
        await mongoose.disconnect()
        console.log("Not connected")
    }
}

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


const startApp = async ()=>{
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()