google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);


function drawChart(analyseObject) {
  if (analyseObject != null) {

    // pie chart 1
    let incomeTyp = ["Rent income", "Sell profit"];
    let incomeData = [analyseObject.totalRentIncome, analyseObject.sellProfit];
    //let incomeData =[50,50];
    var data = google.visualization.arrayToDataTable([
      ["incomeTyp", "Euro"],
      [incomeTyp[0], incomeData[0]],
      [incomeTyp[1], incomeData[1]],
    ]);

    var options = {
      title: "Incomes from object",
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("chart-pie-income")
    );

    chart.draw(data, options);


    // pie chart2
    let spendingTyp = ["Down payment", "Interest", "Redemption", "Speculation Tax"];
    let spendingData = [analyseObject.downPayment, analyseObject.totalInterestPayment, analyseObject.totalRedemptionPayment, analyseObject.speculationTax];
    //let incomeData =[50,50];

    var data = google.visualization.arrayToDataTable([
      ["incomeTyp", "Euro"],
      [spendingTyp[0], spendingData[0]],
      [spendingTyp[1], spendingData[1]],
      [spendingTyp[2], spendingData[2]],
      [spendingTyp[3], spendingData[3]],
    ]);

    var options = {
      title: "Investment spendings",
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("chart-pie-spending")
    );

    chart.draw(data, options);


    // pie chart3
    let costTyp = ["Net object price", "garage", "Upgrade/Renovation", "Brokerage fees", "Land tax", "Notary cost"];
    let costData = [analyseObject.objectPrice, analyseObject.garagePrice, analyseObject.additionalObjectCosts, analyseObject.brokerageFees, analyseObject.landTax, analyseObject.notaryCost];
    //let incomeData =[50,50];
    var data = google.visualization.arrayToDataTable([
      ["incomeTyp", "Euro"],
      [costTyp[0], costData[0]],
      [costTyp[1], costData[1]],
      [costTyp[2], costData[2]],
      [costTyp[3], costData[3]],
      [costTyp[4], costData[4]],
      [costTyp[5], costData[5]],
    ]);

    var options = {
      title: "Total purchase costs",
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("chart-pie-costs")
    );

    chart.draw(data, options);

  }
}


