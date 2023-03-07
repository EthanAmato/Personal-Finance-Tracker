const { GraphQLScalarType, Kind } = require("graphql");

const moneyToString =  require("../../utils/money-to-string");
const stringToMoney = require("../../utils/string-to-money");

const currencyScalar = new GraphQLScalarType({
    name: "money",
    description: "Simple 2-decimal floating point scalar",
    serialize(value) {
        //helps us store value into JSON
        return moneyToString(value);
    },
    parseValue(value) {
        //parse value from JSON
        console.log("Inside")
        return stringToMoney(value);
    },
    parseLiteral(ast) {
        //helps us parse HARD-CODED AST STRING
        if (ast.kind === Kind.STRING) {
            return stringToMoney(ast.value)
        }
        throw new UserInputError('The Provided Data is not formatted correctly.')
    }, 
},)


module.exports = currencyScalar