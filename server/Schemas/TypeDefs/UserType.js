const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql


//All users in our data HAVE to follow this format
const UserType = new GraphQLObjectType({
    name: "User",
    //inside the arrow function is where we put general shape of our data
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })

})

module.exports = UserType;