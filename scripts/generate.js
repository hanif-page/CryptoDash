// GLOBAL VARIABLE
var currentCoinID = ""
/*
    I haven't set the global variable for the currency. So for the next update, set the global variable for the current currency, and it can be use and change anywhere.
    For now, the initial currency is getting set to the USD 
*/

const changeTypeUnit = (number, isCompleteNumber = true) => {
    // example : number = 890890987, isCompleteNumber = true   
    // it will return 890,890,987
    
    // example : number = 890890987, isCompleteNumber = false
    // it will return 890.9 million

    if (number < 1000) return number
    else if (isCompleteNumber)
    {
        if(isDecimal(number)) // example => 3127.56
        {
            let numString = number.toString()
            let dotPosition = (numString.match(/./g) || []).indexOf(".")
            let intNumber = numString.slice(0, dotPosition)
            return `${changeTypeUnit(intNumber, true)}${numString.slice(dotPosition, numString.length)}`
        }
        else // example => 3127
        {
            let numString = number.toString()
            let maxIndex = numString.length - 1
            let countTo3 = 1
            for(let i = maxIndex; i >= 0; i--)
            {
                maxIndex = numString.length - 1
                if (countTo3 === 3) 
                {
                    if(numString.slice(0, 1) === "") return numString 
                    else 
                    {
                        /*
                            kalo misal dia pas berhenti di angka ratusan, maka ada bug jadinya, yaitu didepan angka jadi ada koma 
                            contoh : 
                            => 123456 -> ,123,456
                            => 123456789 -> ,123,456,789
                            solve nya bisa dengan buat if statement, jika index 0 nya kosong, maka tidak usah tambahin koma
                        */
                        const temp = numString
                        numString = numString.slice(0, i) + "," + numString.slice(i, maxIndex + 1)
                        countTo3 = 1
    
                        // prevent the "," bug on the first index
                        if(numString[0] === ",") return temp
                    }
                }
                else countTo3 += 1
            }
            return numString
        }
    } 
    else 
    {
        let completeNumber = changeTypeUnit(number, true)
        let countComa = (completeNumber.match(/,/g) || []).length // got this regex code to count specific characters in string (from codegrepper.com)
        let typeUnit = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion"]
        
        return `${completeNumber.slice(0, completeNumber.indexOf(","))}.${completeNumber[completeNumber.indexOf(",")+1]} ${typeUnit[countComa-1]}`
    }
}

const getData = async (url) => {
    return await fetch(url)
                .then(response => response.json())
                .then(response => response)
                .catch(error => error)
}

const isDecimal = (number) => {
    return number % 1 !== 0 
}

const changePercentageColor = (number) => {
    return (roundNumber(number, 2)).toString()[0] !== "-" ? "!text-green-500" : "!text-loss-color" 
}

const changePercentageSign = (number) => {
    return (roundNumber(number, 2)).toString()[0] !== "-" ? "+" : "" /* add + sign, if the change is not minus */
}

const roundNumber = (num, totalDecimalNumBehind) => {
    // make the function work !
    if (totalDecimalNumBehind <= 1) return Math.round(num * 10)/10
    return Math.round(num * 10**totalDecimalNumBehind)/10**totalDecimalNumBehind
}

async function detailCryptoInformation(coinID, currency = "usd", isInitialLoad) {
    startLoadingAnimation()

    currentCoinID = coinID
    const APIurl = `https://api.coingecko.com/api/v3/coins/${coinID}?sparkline=true&localization=false&tickers=false&community_data=false&developer_data=false`
    const mainData = await getData(APIurl)

    const mainContentContainer = document.querySelector("main .main-content-container")
    mainContentContainer.innerHTML = ""
    mainContentContainer.className += " flex flex-col items-end"

    const displayDetailUI = `
        <header class="flex items-center w-full space-x-4">
            <a href="${mainData.links.homepage[0]}" target="_blank">
                <img class="w-16 object-cover md:w-20 lg:w-24" src="${mainData.image.large}" alt="${mainData.name} Image">
            </a>
            <div>
                <h1 class="font-bold text-2xl text-c-black-purple-dark 2xl:text-3xl">${mainData.name}</h1>
                <h2 class="uppercase text-xl text-c-black-purple-dark 2xl:text-2xl">${mainData.symbol}</h2>
            </div>
        </header>

        <main class="specificInformationLayout w-full my-9">
            <div class="mb-6 w-full">
                <h3 class="md:text-right mb-2">${mainData.name} Last 7 Days Price Chart (USD)</h3>
                <div id="chartContainer" class="w-full">
                    <!-- the chart comes here !!! -->
                </div>
            </div>
            <div class="mt-[450px] space-y-6 md:space-y-0 md:grid md:gap-y-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                <div>
                    <h3>Rank</h3>
                    <p>${mainData.market_cap_rank}</p>
                </div>
                <div>
                    <h3>Price to ${currency.toUpperCase()}</h3>
                    <p>${currency==="usd" ? "$" : currency.toUpperCase()} ${ changeTypeUnit(mainData.market_data.current_price[currency], true) }</p>
                </div>
                <div>
                    <h3>Market Cap in ${currency.toUpperCase()}</h3>
                    <p>${currency==="usd" ? "$" : currency.toUpperCase()} ${ isDecimal(mainData.market_data.market_cap[currency]) ? mainData.market_data.market_cap[currency] : changeTypeUnit(mainData.market_data.market_cap[currency], true) /* if decimal, then just display without changing the type unit */ }</p>
                </div>
                <div>
                    <h3>24h Mkt Cap Change Percentage</h3>
                    <p class="${changePercentageColor(mainData.market_data.market_cap_change_percentage_24h)}">${ changePercentageSign(mainData.market_data.market_cap_change_percentage_24h) }${ roundNumber(mainData.market_data.market_cap_change_percentage_24h, 2) /* round 2 decimal behind */  }%</p>
                </div>
                <div>
                    <h3>24h Change Percentage</h3>
                    <p class="${changePercentageColor(mainData.market_data.price_change_percentage_24h)}">${ changePercentageSign(mainData.market_data.price_change_percentage_24h) }${roundNumber(mainData.market_data.price_change_percentage_24h, 2) /* round 2 decimal behind */ }%</p>
                </div>
                <div>
                    <h3>7d Change Percentage</h3>
                    <p class="${changePercentageColor(mainData.market_data.price_change_percentage_7d)}">${ changePercentageSign(mainData.market_data.price_change_percentage_7d) }${roundNumber(mainData.market_data.price_change_percentage_7d, 2) /* round 2 decimal behind */ }%</p>
                </div>
                <div>
                    <h3>14d Change Percentage</h3>
                    <p class="${changePercentageColor(mainData.market_data.price_change_percentage_14d)}">${ changePercentageSign(mainData.market_data.price_change_percentage_14d) }${roundNumber(mainData.market_data.price_change_percentage_14d, 2) /* round 2 decimal behind */ }%</p>
                </div>
                <div>
                    <h3>30d Change Percentage</h3>
                    <p class="${changePercentageColor(mainData.market_data.price_change_percentage_30d)}">${ changePercentageSign(mainData.market_data.price_change_percentage_30d) }${roundNumber(mainData.market_data.price_change_percentage_30d, 2)}%</p>
                </div>
            </div>
        </main>

        <button onclick="location.reload()" class="btn-red text-base">Return</button>
    `

    // add the crypto name on the website title
    document.querySelector("head title").innerText = `${mainData.name} (${mainData.symbol.toUpperCase()}) - Live Stats | CryptoDash`

    // remove the search bar, when open the specific information display
    let searchBar = document.querySelectorAll(".searchBar")
    searchBar.forEach(search => {
        search.querySelector("input").value = ""
        search.parentElement.remove()
    })
    document.querySelector("body").style.backgroundColor = "white"

    // important things !
    scroll(0,0) // set the screen to the top
    mainContentContainer.innerHTML = displayDetailUI
    generateChart(APIurl)

    // check if the isInitialLoad true or false. If true then display the currency converter
    if(isInitialLoad)
    {
        // disply the currency converter
        const selectCurrency1 = document.querySelector("#currencyList1")
        const selectCurrency2 = document.querySelector("#currencyList2")
        selectCurrency2.innerHTML = ""
        for(objectKey in mainData.market_data.current_price)
        {
            if(objectKey === "usd")
            {
                let option = `
                <option selected class="cursor-pointer text-c-black-purple-dark" value="">${objectKey.toUpperCase()}</option>
                `
                selectCurrency2.innerHTML += option 
            }
            else  
            {
                let option = `
                <option class="cursor-pointer text-c-black-purple-dark" value="">${objectKey.toUpperCase()}</option>
                `
                selectCurrency2.innerHTML += option
            }
        }
        selectCurrency1.classList.add("hidden")
        selectCurrency2.classList.remove("hidden")
    }

    stopLoadingAnimation()
}

const generateChart = async (url) => {

    // generate table with dynamic data 
    let APIurl = url
    const mainData = await getData(APIurl)
    const sparklineExample = mainData.market_data.sparkline_7d.price

    // make a format that can be accepted by the calculation
    let dataObj = []
    sparklineExample.forEach(number => {
        let temp = {}
        temp.y = number 

        dataObj.push(temp)
    })

    // generate canvas
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: false
        },
        axisY: {
            includeZero: false
        },
        data: [{
            type: "line",
            dataPoints: dataObj
        }]

    });
    chart.render()
}

const generateTable = async (currency = "usd", isInitialLoad = true) => {
    if(!isInitialLoad) startLoadingAnimation()

    const selectCurrency1 = document.querySelector("#currencyList1")
    if(isInitialLoad)
    {
        const APIurl = `https://api.coingecko.com/api/v3/coins/bitcoin?sparkline=true&localization=false&tickers=false&community_data=false&developer_data=false`
        const data = await getData(APIurl)

        selectCurrency1.innerHTML = ""
        for(objectKey in data.market_data.current_price)
        {
            if(objectKey === "usd") 
            {
                let option = `
                <option selected class="cursor-pointer text-c-black-purple-dark" value="">${objectKey.toUpperCase()}</option>
                `
                selectCurrency1.innerHTML += option
            }
            else 
            {
                let option = `
                <option class="cursor-pointer text-c-black-purple-dark" value="">${objectKey.toUpperCase()}</option>
                `
                selectCurrency1.innerHTML += option
            }
        }
    }

    // generate table with dynamic data 
    let APIurl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&sparkline=false&price_change_percentage=1h,7d`
    const mainData = await getData(APIurl)
    let countData = 0

    const mainTableBody = document.querySelector(".main-table tbody")
    mainTableBody.innerHTML = ""
    mainData.forEach(data => {
        let tableRow = `
        <tr data-coinid="${data.id}" onclick="detailCryptoInformation(this.dataset.coinid, 'usd', true)"> 
            <td class="rank"> 
                ${data.market_cap_rank}.
            </td>
            <td class="cryptocurrencyCell">
                <img src="${data.image}" alt="${data.name} image" class="">

                <div>
                    <h2>${data.name}</h2>
                    <h3 class="uppercase">${data.symbol}</h3>
                </div>
            </td>
            <td>${currency.toLowerCase() === "usd" ? "$" : currency} ${ changeTypeUnit(data.current_price, true) }</td>
            <td>${currency.toLowerCase() === "usd" ? "$" : currency} ${ changeTypeUnit(Math.round(data.market_cap), false) }</td>
            <td class="${ changePercentageColor(data.price_change_percentage_1h_in_currency) } change24hData hidden lg:table-cell">${ changePercentageSign(data.price_change_percentage_1h_in_currency) }${ roundNumber(data.price_change_percentage_1h_in_currency, 1) /* round 1 decimal behind */ }%</td>
            <td class="${ changePercentageColor(data.price_change_percentage_24h) } change24hData">${ changePercentageSign(data.price_change_percentage_24h) }${ roundNumber(data.price_change_percentage_24h, 1) /* round 1 decimal behind */ }%</td>
            <td class="${ changePercentageColor(data.price_change_percentage_7d_in_currency) } change24hData hidden lg:table-cell">${ changePercentageSign(data.price_change_percentage_7d_in_currency) }${ roundNumber(data.price_change_percentage_7d_in_currency, 1) /* round 1 decimal behind */ }%</td>
        </tr>
        `
        mainTableBody.innerHTML += tableRow
        countData += 1  
    })
    scroll(0,0) // set the screen to the top
    if(countData === mainData.length) stopLoadingAnimation() // stop the loading animation, if the table were completed
}
generateTable("usd", true)

let searchBar = document.querySelectorAll(".searchBar input")
searchBar.forEach(inp => {
    inp.addEventListener("input", function(){
        let currentValue = inp.value.toLowerCase();

        let mainTbodyRow = document.querySelectorAll(".main-table tbody tr")
        mainTbodyRow.forEach(tr => {
            let cryptoName = tr.querySelector(".cryptocurrencyCell h2").innerText.toLowerCase()
            let cryptoSymbol = tr.querySelector(".cryptocurrencyCell h3").innerText.toLowerCase()

            // filter logic
            if(cryptoName.indexOf(currentValue) === -1) 
            {
                if(cryptoSymbol.indexOf(currentValue) === -1) tr.classList.add("hidden")
            }
            else tr.classList.remove("hidden")
        })
    })
})

// change currency functionality (this is the select list on the main/table display)
const selectCurrency1 = document.querySelector("#currencyList1")
selectCurrency1.addEventListener("change", function(){
    let currentCurrency = this.options[this.selectedIndex].text;

    generateTable(currentCurrency, false)
})

// change currency functionality (this is for the select list on the detail information display)
const selectCurrency2 = document.querySelector("#currencyList2")
selectCurrency2.addEventListener("change", function(){
    let currentCurrency = this.options[this.selectedIndex].text;

    detailCryptoInformation(currentCoinID, currentCurrency.toLowerCase(), false)
})