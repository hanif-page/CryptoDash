const getSymbolFromCurrency = require('../currency-symbol-map')

const euroSymbol = getSymbolFromCurrency('EUR') 
const usdollarSymbol = getSymbolFromCurrency('USD')
console.log(euroSymbol)
console.log(usdollarSymbol)
