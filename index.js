
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./src/schema/schema')
const app = express()
const port = 3000


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})