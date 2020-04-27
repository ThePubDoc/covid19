const getCodes = (async () => {
    const countriesData = await fetch("https://covid-19-data.p.rapidapi.com/help/countries?format=json", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "b43507d905msh5e02a61f003cd71p1fe870jsn56d2fe565361"
        }
    })

    const countriesDataJSON = await countriesData.json()
    
    var countriesStats = await fetch("https://covid19-api.com/country/all?format=json", {
        "method": "GET"
        }
    )
    
    const countriesStatsJSON = await countriesStats.json();
    
    let req = [];
    for(index in countriesStatsJSON){
        req[index] = countriesStatsJSON[index];
        req[index].alpha3code = countriesDataJSON[index].alpha3code;
    }
    console.log(req)
})

getCodes()