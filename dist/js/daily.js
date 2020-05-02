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
        fontColor: 'black',
        fontFamily: 'bold'
        }
    }
    };

    var lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: confirmedData,
    options: chartOptions
    });
})

dailyReport()

