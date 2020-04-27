let table;
const get = (async()=> {
    // var response = await fetch("https://covid19-api.com/country/all?format=json", {
    //     "method": "GET"
    // })
    // const ar = await response.json();

    //new change
    const countriesData = await fetch("https://covid-19-data.p.rapidapi.com/help/countries?format=json", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host"   : "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key"    : "b43507d905msh5e02a61f003cd71p1fe870jsn56d2fe565361"
        }
    })

    const countriesDataJSON = await countriesData.json()
    
    const countriesStats = await fetch("https://covid19-api.com/country/all?format=json", {
        "method": "GET"
        }
    )
    
    const countriesStatsJSON = await countriesStats.json();
    
    let req = [];
    for(index in countriesStatsJSON){
        req[index] = countriesStatsJSON[index];
        req[index].alpha3code = countriesDataJSON[index].alpha3code;
    }

    createTable(req);
   
})

const createTable = ((data) => {
    table = new Tabulator("#all-country-table", {
        data:data,
        layout:"fitColumns",
        pagination:"local",
        paginationSize:10,
        responsiveLayout:"hide",
        initialSort:[
            {column:"confirmed", dir:"dsc"},
        ],
        columns:[
            {title:"Country",field:"country",},
            {title:"Confirmed", field:"confirmed"},
            {title:"Recovered",field:"recovered"},
            {title:"Deaths",field:"deaths"},
            {title:"Critical",field:"critical"},
            {title:"Code",field:"alpha3code",visible:false}            
        ],
        rowClick : row,
    });
})

const updateFilter = (() => {
    let value = document.getElementById("filter-country").value;
    table.setFilter("country", "like" , value)
})

const dailyReport = (async () => {
    const response = await fetch("https://covidapi.info/api/v1/global/count", {
        "method": "GET",
        "redirect": 'follow'
        }
    )
    const ar = await response.json();
    const obj = ar.result;
    const dates = Object.keys(obj)

    let dailyConfirm = [];
    let dailyDeaths = [];
    let dailyCured = [];
    let i =0;
    for(date in obj){
        dailyConfirm[i] = obj[date].confirmed;
        dailyDeaths[i] = obj[date].deaths;
        dailyCured[i] = obj[date].recovered;
        i++;
    }
    
    let speedCanvas = document.getElementById("speedChart");

    Chart.defaults.global.defaultFontFamily = "bold";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.responsive = true;
    let confirmed = {
        label: "Confirmed",
        data: dailyConfirm,
        lineTension: 0,
        fill: false,
        borderColor: 'red'
    };

    let deaths = {
        label: "Deaths",
        data: dailyDeaths,
        lineTension: 0,
        fill: false,
        borderColor: 'blue'
    };

    let cured = {
        label: "Cured",
        data: dailyCured,
        lineTension: 0,
        fill: false,
        borderColor: 'yellow'
    }

    let confirmedData = {
    labels: dates,
    datasets: [confirmed, deaths, cured]
    };

    let chartOptions = {
    legend: {
        display: true,
        position: 'top',
        labels: {
        boxWidth: 80,
        fontColor: 'black'
        }
    }
    };

    let lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: confirmedData,
    options: chartOptions
    });

    const latestTotalConfirmed = dailyConfirm[dailyConfirm.length-1];
    const latestTotalDeath = dailyDeaths[dailyDeaths.length-1];
    const latestTotalCured = dailyCured[dailyCured.length-1];
    const lastDate = dates[dates.length-1];
    const newCases = dailyConfirm[dailyConfirm.length-1]-dailyConfirm[dailyConfirm.length-2];
    document.getElementById("totalCases").innerHTML = latestTotalConfirmed;
    document.getElementById("totalRecovered").innerHTML = latestTotalCured;
    document.getElementById("totalDeaths").innerHTML = latestTotalDeath;
    document.getElementById("newCases").innerHTML = newCases;
    document.getElementById("lastUpdate").innerHTML = lastDate;

})

const row = ( async (e,row) => {
    const code = row._row.data.alpha3code;
    let url = "https://covidapi.info/api/v1/country/" + code;
    const countryData = await fetch(url , {
        "method" : "GET"
    })
    const countryDataJSON = await countryData.json();
    const obj = countryDataJSON.result;
    const dates = Object.keys(obj)

    let dailyConfirm = [];
    let dailyDeaths = [];
    let dailyCured = [];
    let i =0;
    for(date in obj){
        dailyConfirm[i] = obj[date].confirmed;
        dailyDeaths[i] = obj[date].deaths;
        dailyCured[i] = obj[date].recovered;
        i++;
    }

    let speedCanvas = document.getElementById("speedChart");

    Chart.defaults.global.defaultFontFamily = "bold";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.responsive = true;
    let confirmed = {
        label: "Confirmed",
        data: dailyConfirm,
        lineTension: 0,
        fill: false,
        borderColor: 'red'
    };

    let deaths = {
        label: "Deaths",
        data: dailyDeaths,
        lineTension: 0,
        fill: false,
        borderColor: 'blue'
    };

    let cured = {
        label: "Cured",
        data: dailyCured,
        lineTension: 0,
        fill: false,
        borderColor: 'yellow'
    }

    let confirmedData = {
    labels: dates,
    datasets: [confirmed, deaths, cured]
    };

    let chartOptions = {
    legend: {
        display: true,
        position: 'top',
        labels: {
        boxWidth: 80,
        fontColor: 'black'
        }
    }
    };

    let lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: confirmedData,
    options: chartOptions
    });

    url = "https://covid19-api.com/country/code?code="+code+"&format=json";
    const latestDataCountry = await fetch(url, {
        "method" : "GET"
    })
    const latestDataCountryJSON = await latestDataCountry.json();
    // console.log(latestDataCountryJSON[0])
    const latestTotalConfirmed = latestDataCountryJSON[0].confirmed;
    const latestTotalDeath = latestDataCountryJSON[0].deaths;
    const latestTotalCured = latestDataCountryJSON[0].recovered;
    const lastDate = dates[dates.length-1];
    const newCases = dailyConfirm[dailyConfirm.length-1]-dailyConfirm[dailyConfirm.length-2];
    document.getElementById("totalCases").innerHTML = latestTotalConfirmed;
    document.getElementById("totalRecovered").innerHTML = latestTotalCured;
    document.getElementById("totalDeaths").innerHTML = latestTotalDeath;
    document.getElementById("newCases").innerHTML = newCases;
    document.getElementById("lastUpdate").innerHTML = lastDate;

})

get();
dailyReport();

document.getElementById("filter-country").addEventListener("keyup", updateFilter);
