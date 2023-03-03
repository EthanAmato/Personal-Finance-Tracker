const graphql = require('graphql');
const UserType = require('./TypeDefs/UserType')
//For each datatype in your data, you need to import the corresponding graphql equivalent
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql

//Create connection with PostgresQL DB
const Pool = require('pg').Pool;
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'personal-finance-app',
    password:process.env.PASSWORD,
    port:5432
})

//Defines the types of operations we can run in regards to retrieving data (GET)
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    //kinda similar to different endpoints in REST servers
    //can put things like getAllUsers / getUserById
    fields: {
        getAllUsers: {
            //This function will return a list of users and this line below is how we define that
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                const data = await pool.query('select * from users;')
                return data.rows;
            }
        },
        getUserById: {
            //This function will return a list of users and this line below is how we define that
            type: UserType,
            args: { id: { type: GraphQLInt } },
            //args is how we access the user-inputted 'id' in this field's case
            async resolve(parent, args) {
                // console.log(pool.query(`select * from users where id = ${args.id};`).then((res)=>console.log(res)))
                const data = await pool.query(`select * from users where id = ${args.id};`);
                return data.rows[0];
            }
        }
    } 
});



//Defines the types of operations we can run in regards to manipulating data (DELETE, PUT/PATCH, POST)
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                pool.query(
                    `INSERT INTO users (name, email, password) VALUES
                     (${args.name},${args.email},${args.password})`
                )
                return args;
            }
        }
    }
});

//Combination between mutations (Mutating data) and queries (getting data)
const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation })


module.exports = schema;