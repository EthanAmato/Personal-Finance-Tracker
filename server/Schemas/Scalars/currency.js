const { GraphQLScalarType, Kind, parse } = require('graphql');

const currencyScalar = new GraphQLScalarType({
  name: 'Money',
  description: 'Custom scalar type for handling money values',

  serialize(value) {
      if (typeof value !== 'string') {
          throw new TypeError(`Money cannot represent non-string type ${typeof value}`);
        }
    console.log(value)
    const parsedValue = parseFloat(value.replace(/^\$/, '').replace(/,/, ''));
    console.log(parsedValue)
    if (isNaN(parsedValue)) {
      throw new TypeError(`Money cannot represent non-numeric value: ${value}`);
    }
    return parsedValue.toFixed(2);
  },

  parseValue(value) {
      if (typeof value !== 'string') {
          throw new TypeError(`Money cannot represent non-string type ${typeof value}`);
    }
    const parsedValue = parseFloat(value.replace(/^\$/, ''));
    if (isNaN(parsedValue)) {
      throw new TypeError(`Money cannot represent non-numeric value: ${value}`);
    }
    return parsedValue.toFixed(2);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(`Money cannot represent non-string type ${ast.kind}`);
    }
    const parsedValue = parseFloat(ast.value.replace(/^\$/, ''));
    if (isNaN(parsedValue)) {
      throw new TypeError(`Money cannot represent non-numeric value: ${ast.value}`);
    }
    return parsedValue.toFixed(2);
  }
});

module.exports = currencyScalar