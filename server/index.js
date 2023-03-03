require('dotenv').config()

const express = require('express')
const cors = require('cors');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas');

const PORT = 5000;


//later add config for bit.io server

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
}) 