
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./src/schema/schema2')
const mongoose = require("mongoose");
const cors = require("cors")
const User = require('./src/models/users')
const port = 3000
const mongoURI = process.env.mongoURI || "mongodb+srv://admin:admin@backapi.wojaaxk.mongodb.net/?retryWrites=true&w=majority";

const app = express()

async function runDB() {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected successfully to mongoose server")
    } catch {
        await mongoose.disconnect()
        console.log("Not connected")
    }
}

app.use(cors())

const root = {
    getAllUsers: () => {
        return User.find({})
    },
    getUser: ({id}) => {
        return User.findById(id)
    },
    createUser: ({input}) => {
        const user = new User ({
            username: input.username,
            age: input.age,
            posts: input.posts,
        })
        return user.save()
    },
}


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: root
}))


const startApp = async ()=>{
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()