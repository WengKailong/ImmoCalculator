google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(drawStacked);

function drawStacked(analyseObject) {
  if (analyseObject != null) {
    let iterateObjects = analyseObject.iterateObjects;
    var mortgageData = [["year", "Interest", "Redemption"]];

    for (var i = 0; i < iterateObjects.length; i++) {
      var newData = [
        `${iterateObjects[i].year}`,
        iterateObjects[i].interestPayment,
        iterateObjects[i].redemption,
      ];
      mortgageData.push(newData);
    }


    var data = google.visualization.arrayToDataTable(mortgageData);

    var options_fullStacked = {
      isStacked: "percent",
      height: 300,
      legend: { position: "top", maxLines: 3 },
      vAxis: {
        minValue: 0,
        ticks: [0, 0.3, 0.6, 0.9, 1],
      },
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("chart-trend-mortgage")
    );
    chart.draw(data, options_fullStacked);
  }
}
