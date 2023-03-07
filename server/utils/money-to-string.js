//given float -> $100.00 format as string


const moneyToString = (value) => {
    console.log(value)
    return "$" + (value.toFixed(2));
}


module.exports =  moneyToString;