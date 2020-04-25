const dailyReport = (async () => {
    var response = await fetch("https://covidapi.info/api/v1/global/count", {
        "method": "GET",
        "redirect": 'follow'
        }
    )
    const ar = await response.json();
    const obj = ar.result;
    const dates = Object.keys(obj)
    // console.log(dates[0])

    let dailyConfirm = [];
    let i =0;
    for(date in obj){
        dailyConfirm[i] = obj[date].confirmed
        i++;
    }
    console.log(dailyConfirm)
    var speedCanvas = document.getElementById("speedChart");

    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.responsive = true;
    var dataFirst = {
        label: "Confirmed",
        data: dailyConfirm,
        lineTension: 0,
        fill: false,
        borderColor: 'red'
    };

    var speedData = {
    labels: dates,
    datasets: [dataFirst]
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
    data: speedData,
    options: chartOptions
    });
})

dailyReport()

