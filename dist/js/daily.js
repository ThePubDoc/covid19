const dailyReport = (async () => {
    var response = await fetch("https://covidapi.info/api/v1/global/count", {
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

})

dailyReport()

