const stringToMoney = (value) => {
    return parseFloat(parseFloat(value.replace('$','')).toFixed(2))
}

module.exports = stringToMoney;