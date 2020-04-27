const india = (async () => {
    
    document.getElementById("filter-state").style.display = "block";
    document.getElementById("filter-country").style.display = "none";
    const today = new Date(Date.now());
    const latestDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
    
    const url = "https://covidapi.info/api/v1/country/IND";
    var response = await fetch(url, {
        "method": "GET",
        "redirect": 'follow'
        }
    )
    const ar = await response.json();
    const obj = ar.result;

    let dailyConfirm = [];
    let dailyDeaths = [];
    let dailyCured = [];
    let dates = [];
    let i =0;
    for(index in obj){
        dailyConfirm[i] = obj[index].confirmed;
        dailyDeaths[i] = obj[index].deaths;
        dailyCured[i] = obj[index].recovered;
        dates[i] = index;
        i++;
    }
    
    var speedCanvas = document.getElementById("speedChart");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.responsive = true;
    var confirmed = {
        label: "Confirmed",
        data: dailyConfirm,
        lineTension: 0,
        fill: false,
        borderColor: 'red'
    };

    var deaths = {
        label: "Deaths",
        data: dailyDeaths,
        lineTension: 0,
        fill: false,
        borderColor: 'blue'
    };

    var cured = {
        label: "Cured",
        data: dailyCured,
        lineTension: 0,
        fill: false,
        borderColor: 'yellow'
    }

    var confirmedData = {
    labels: dates,
    datasets: [confirmed, deaths, cured]
    };

    var chartOptions = {
    legend: {
        display: true,
        position: 'top',
        labels: {
        boxWidth: 80,
        fontColor: 'black'
        }
    }
    };

    var lineChart = new Chart(speedCanvas, {
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
    document.getElementById("stats").innerHTML = "State Wise Stats"
    statesData();
})

const statesData = (async () => {
    const states = await fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
            "x-rapidapi-key": "b43507d905msh5e02a61f003cd71p1fe870jsn56d2fe565361"
        }
    })
    
    const json = await states.json();
    const json_state = json.state_wise;
    const keys = Object.keys(json_state);
    // console.log(json_state)
    let ar = [];
    for(key in json_state){
        ar.push({
            "state" : key,
            "confirmed" : json_state[key].confirmed,
            "recovered" : json_state[key].recovered,
            "deaths" : json_state[key].deaths
        })
    }
    // console.log(ar)
    table = new Tabulator("#all-country-table", {
        data:ar,
        layout:"fitColumns",
        pagination:"local",
        paginationSize:10,
        responsiveLayout:"hide",
        initialSort:[
            {column:"confirmed", dir:"dsc"},
        ],
        columns:[
            {title:"State",field:"state"},
            {title:"Confirmed", field:"confirmed"},
            {title:"Recovered",field:"recovered"},
            {title:"Deaths",field:"deaths"},
            // {title:"Critical",field:"critical"},            
        ],
    });
    // document.getElementById("filter")
})

const updateStateFilter = (() => {
    let value = document.getElementById("filter-state").value;
    table.setFilter("state", "like" , value)
})