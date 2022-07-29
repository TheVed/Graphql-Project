const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
CONNECTION_URL = 'mongodb+srv://graphqlproject:mytimeisnow@cluster0.4imba.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL)
mongoose.connection.once('open',() => {
    console.log('Connected To Database')
})

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql: true
}))

app.listen(5000,()=>{
    console.log('Server is running on Port 5000')
})