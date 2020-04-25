const india = (async () => {
    
    const today = new Date(Date.now());
    console.log(today.getMonth()+1)
    const latestDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();

    const url = "https://covidapi.info/api/v1/country/IND/timeseries/2020-01-22/" + latestDate;
    
    
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
        dates[i] = obj[index].date;
        i++;
    }
    
    var speedCanvas = document.getElementById("india-speedChart");

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

    // const latestTotalConfirmed = dailyConfirm[dailyConfirm.length-1];
    // const latestTotalDeath = dailyDeaths[dailyDeaths.length-1];
    // const latestTotalCured = dailyCured[dailyCured.length-1];
    // const lastDate = dates[dates.length-1];
    // const newCases = dailyConfirm[dailyConfirm.length-1]-dailyConfirm[dailyConfirm.length-2];
    // document.getElementById("totalCases").innerHTML = latestTotalConfirmed;
    // document.getElementById("totalRecovered").innerHTML = latestTotalCured;
    // document.getElementById("totalDeaths").innerHTML = latestTotalDeath;
    // document.getElementById("newCases").innerHTML = newCases;
    // document.getElementById("lastUpdate").innerHTML = lastDate;
    // // let newDate = new Date(lastDate)
    // // console.log(newDate.get)
})

india()

