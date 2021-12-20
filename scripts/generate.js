// this file, is for generating dynamic HTML content
/*
    - content that generated from API
*/

const getData = async (url) => {
    return await fetch(url)
                .then(response => response.json())
                .then(response => response)
                .catch(error => error)
}

window.addEventListener('load', async () => {
    let APIurl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&sparkline=true"
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
    chart.render()
})

/*
    when we call the API, it still cause a CORS error
    Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.coinranking.com/v2/coins. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing). Status code: 200.

    So in english, it says that the API response didn't have the Access-Control-Allow-Origin. So, the browser can't allow us to consume the API :)LOL. Meanwhile the status code is 200, so the API is ok and fine, it's just the matter of the CORS. 
    
    note: for me, I think there is a problem from the API, it's not the problem that we can solve from the client side
    
*/