// this file, is for generating dynamic HTML content
/*
    - content that generated from API
*/

const changeTypeUnit = (number, isCompleteNumber = true) => {
    // example : number = 890890987, isCompleteNumber = true   
    // it will return 890,890,987
    
    // example : number = 890890987, isCompleteNumber = false
    // it will return 890.9 million

    if (number.toString().length <= 3) return number
    else if (isCompleteNumber)
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

const generateTable = () => {
    // generate table with dynamic data 
}

window.addEventListener('load', async () => {
    let APIurl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true"
    const mainData = await getData(APIurl)
    // mainData.forEach((item, index) => {
    //     if(item.price_change_percentage_24h < 0) console.log(`${index+1}.) ${item.name} 24h Change %c${item.price_change_percentage_24h}%`, "color: #E75757")
    //     else if(item.price_change_percentage_24h > 0) console.log(`${index+1}.) ${item.name} 24h Change %c+${item.price_change_percentage_24h}%`, "color: #79EA86")
    // })

    const sparklineExample = mainData[0].sparkline_in_7d.price
    
    // make a format that can be accepted by the calculation
    let dataObj = []
    sparklineExample.forEach(number => {
        let temp = {}
        temp.y = number 

        dataObj.push(temp)
    })

    // generate canvas
    const chart = new CanvasJS.Chart("chartDemo", {
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
    // chart.render()
})
