let tofix = 1;

function updateInput(id) {
  if (id == "input-object-net-price-squaremeter") {
    updateObjectPrice();
    updateLandTax();
    updateNotaryCost();
    updateTotalCost();
  }

  if (id == "input-object-net-price-object") {
    updateUnitPrice();
    updateLandTax();
    updateNotaryCost();
    updateTotalCost();
  }
  if (id == "input-object-net-price-parking") {
    updateLandTax();
    updateNotaryCost();
    updateTotalCost();
  }

  if(id == "input-object-additional-costs"){
    updateTotalCost();
  }

  if(id == "input-object-brokerage-fees-percentage"){
    updateBrokerageEuro();
    updateTotalCost();
  }

  if(id == "input-object-brokerage-fees-euro"){
    updateTotalCost();
  }



  if (id == "input-object-size-object") {
    updateObjectPrice();
    updateLandTax();
    updateNotaryCost();
    updateTotalCost();
  }

  if (id == "input-financing-object") {
    updateTotalPrice();
    updateDownPayment();
    updateLoanAmount();
    updateMortgagePayment();
    updateObjectSize();
    updateSellprice();
    updateSellYear();
  }

  if (id == "input-financing-downpayment-percentage") {
    updateDownPayment();
    updateLoanAmount();
    updateMortgagePayment();
  }

  if (id == "input-financing-downpayment-euro") {
    updateDownPaymentPercentage();
    updateLoanAmount();
    updateMortgagePayment();
  }

  if(id == 'input-financing-total-loan'){
    updateDownPaymentEuro();
    updateDownPaymentPercentage();
    updateMortgagePayment();
  }

  if (id == "input-financing-interest-rate") {
    updateMortgagePayment();
  }

  if (id == "input-financing-redemption-rate") {
    updateMortgagePayment();
  }

  if(id == "input-financing-payment-month"){
    updateMortgagePaymentYear();
  }

  if(id == "input-financing-payment-year"){
    updateMortgagePaymentMonth();
  }

  if (id == "input-financing-rent-persqmeter") {
    updateRentIncomeEuro();
  }

  if (id == "input-financing-rent-euro") {
    updateRentIncomePerSqMeter();
  }

  if (id == "input-financing-rent-raise-1") {
    updateRentRaise3Year();
  }

  if (id == "input-financing-rent-raise-3") {
    updateRentRaise1Year();
  }

  if (id == "input-financing-price-raise-object") {
    updateSellprice();
  }

  if (id == "input-financing-sell-time") {
    updateSellprice();
    updateSellYear();
  }

  if (id == "input-financing-sell-price") {
    updatePriceRaise();
  }

  if (id == "input-analyse-object") {
    updateFinancingSelect();
  }
}

function updateObjectPrice() {
  let size = +document.getElementById("input-object-size-object").value;
  let unitPrice = +document.getElementById("input-object-net-price-squaremeter")
    .value;
  document.getElementById("input-object-net-price-object").value = parseFloat(
    size * unitPrice
  ).toFixed(tofix);
}

function updateUnitPrice() {
  let size = +document.getElementById("input-object-size-object").value;
  let totalPrice = +document.getElementById("input-object-net-price-object")
    .value;

  if (size != "") {
    document.getElementById(
      "input-object-net-price-squaremeter"
    ).value = parseFloat(totalPrice / size).toFixed(tofix);
  }
}

function updateLandTax() {
  let totalPrice = +document.getElementById("input-object-net-price-object")
    .value;
  let priceOfGarage = +document.getElementById("input-object-net-price-parking")
    .value;
  let landTaxRate = +document.getElementById("input-object-land-tax-percentage")
    .value;
  document.getElementById(
    "input-object-land-tax-euro"
  ).innerHTML = `${parseFloat(
    ((totalPrice + priceOfGarage) * landTaxRate) / 100
  ).toFixed(tofix)}`;
}

function updateNotaryCost() {
  let totalPrice = +document.getElementById("input-object-net-price-object")
    .value;
  let priceOfGarage = +document.getElementById("input-object-net-price-parking")
    .value;
  let notaryRate = +document.getElementById("input-object-notary-percentage")
    .value;
  document.getElementById("input-object-notary-euro").innerHTML = `${parseFloat(
    ((totalPrice + priceOfGarage) * notaryRate) / 100
  ).toFixed(tofix)}`;
}

function updateTotalCost() {
  document.getElementById("input-object-total-price").innerHTML = "";

  let totalPrice = +parseFloat(
    document.getElementById("input-object-net-price-object").value
  ).toFixed(tofix);

  let priceOfGarage = +parseFloat(
    document.getElementById("input-object-net-price-parking").value
  ).toFixed(tofix);

  let additionalCosts = +parseFloat(
    document.getElementById("input-object-additional-costs").value
  ).toFixed(tofix);

  let brokerageEuro = +parseFloat(
    document.getElementById("input-object-brokerage-fees-euro").innerHTML
  ).toFixed(tofix);

  let notaryCost = +parseFloat(
    document.getElementById("input-object-notary-euro").innerHTML
  ).toFixed(tofix);

  let landTax = +parseFloat(
    document.getElementById("input-object-land-tax-euro").innerHTML
  ).toFixed(tofix);
  let totalCost = +totalPrice + +priceOfGarage + +additionalCosts + +brokerageEuro +notaryCost + +landTax;

  document.getElementById("input-object-total-price").innerHTML = totalCost;
}

function updateBrokerageEuro(){
  let totalPrice = +parseFloat(
    document.getElementById("input-object-net-price-object").value
  ).toFixed(tofix);

  let priceOfGarage = +parseFloat(
    document.getElementById("input-object-net-price-parking").value
  ).toFixed(tofix);

  let brokeragePercentage = +document.getElementById("input-object-brokerage-fees-percentage").value;

  let brokerageEuro = parseFloat((totalPrice + priceOfGarage) * brokeragePercentage / 100).toFixed(tofix);

  document.getElementById('input-object-brokerage-fees-euro').innerHTML = brokerageEuro;

}

function updateTotalPrice() {
  let object = new immoObject();
  let objectName = document.getElementById("input-financing-object").value;
  object = object.getObjectByName(objectName);
  if (object == null) {
    document.getElementById("input-financing-total-price").innerHTML = "0";
  } else {
    document.getElementById("input-financing-total-price").innerHTML =
      object.totalCost;
  }
}

function updateDownPayment() {
  let totalCost = +document.getElementById("input-financing-total-price")
    .innerHTML;
  let downPaymentRate = document.getElementById(
    "input-financing-downpayment-percentage"
  ).value;
  document.getElementById("input-financing-downpayment-euro").value =
    (totalCost * downPaymentRate) / 100;
}

function updateDownPaymentPercentage() {
  let totalCost = +document.getElementById("input-financing-total-price")
    .innerHTML;
  let downPayment = document.getElementById("input-financing-downpayment-euro")
    .value;
  document.getElementById(
    "input-financing-downpayment-percentage"
  ).value = parseFloat((100 * downPayment) / totalCost).toFixed(2);
}

function updateDownPaymentEuro(){
  let totalCost = +document.getElementById("input-financing-total-price")
    .innerHTML;
    let loan = +document.getElementById("input-financing-total-loan")
    .value;
    document.getElementById("input-financing-downpayment-euro")
    .value = parseFloat(totalCost - loan).toFixed(2);
    document.getElementById("input-financing-total-loan-percentage")
    .innerHTML = parseFloat(loan*100/totalCost).toFixed(2);
    updateDownPaymentPercentage();

}

function updateLoanAmount() {
  let totalCost = +document.getElementById("input-financing-total-price")
    .innerHTML;
  let downPayment = +document.getElementById("input-financing-downpayment-euro")
    .value;
  let loanAmount = totalCost - downPayment;
  document.getElementById("input-financing-total-loan").value = parseFloat(
    loanAmount
  ).toFixed(2);

  if (totalCost == 0) {
    document.getElementById("input-financing-total-loan-percentage").innerHTML =
      "0";
  } else {
    document.getElementById(
      "input-financing-total-loan-percentage"
    ).innerHTML = parseFloat((loanAmount * 100) / totalCost).toFixed(2);
  }
}

function updateMortgagePayment() {
  let loanAmount = +document.getElementById("input-financing-total-loan")
    .value;
  let interestRate = +document.getElementById("input-financing-interest-rate")
    .value;
  let redemptionRate = +document.getElementById(
    "input-financing-redemption-rate"
  ).value;
  let annaulMortgagePayment =
    (loanAmount * (interestRate + redemptionRate)) / 100;
  let montlyMortgagePayment = annaulMortgagePayment / 12;
  document.getElementById(
    "input-financing-payment-month"
  ).value = parseFloat(montlyMortgagePayment).toFixed(2);
  document.getElementById(
    "input-financing-payment-year"
  ).value = parseFloat(annaulMortgagePayment).toFixed(2);
}

function updateMortgagePaymentYear(){
  let paymentMonth = +document.getElementById(
    "input-financing-payment-month"
  ).value;
  let paymentYear = paymentMonth * 12;
  document.getElementById(
    "input-financing-payment-year"
  ).value = parseFloat(paymentYear).toFixed(2);
}

function updateMortgagePaymentMonth(){
  let paymentYear = +document.getElementById(
    "input-financing-payment-year"
  ).value;
  let paymentMonth = paymentYear / 12;
  document.getElementById(
    "input-financing-payment-month"
  ).value = parseFloat(paymentMonth).toFixed(2);
}

function updateRentIncomeEuro() {
  let rentPerSquareMeter = document.getElementById(
    "input-financing-rent-persqmeter"
  ).value;
  let objectSize = +document.getElementById("input-financing-rent-object-size")
    .innerHTML;
  let rentTotalEuro = rentPerSquareMeter * objectSize;
  document.getElementById("input-financing-rent-euro").value = rentTotalEuro;
}

function updateRentIncomePerSqMeter() {
  let rentTotalEuro = document.getElementById("input-financing-rent-euro")
    .value;
  let objectSize = +document.getElementById("input-financing-rent-object-size")
    .innerHTML;
  let rentPerSquareMeter = rentTotalEuro / objectSize;
  document.getElementById(
    "input-financing-rent-persqmeter"
  ).value = parseFloat(rentPerSquareMeter).toFixed(2);
}

function updateRentRaise3Year() {
  let rentRaise1Year = parseFloat(
    document.getElementById("input-financing-rent-raise-1").value
  ).toFixed(2);
  let rentRaise3Year = parseFloat(
    (Math.pow(rentRaise1Year / 100 + 1, 3) - 1) * 100
  ).toFixed(2);
  document.getElementById(
    "input-financing-rent-raise-3"
  ).value = rentRaise3Year;
}

function updateRentRaise1Year() {
  let rentRaise3Year = parseFloat(
    document.getElementById("input-financing-rent-raise-3").value
  ).toFixed(2);
  let rentRaise1Year = parseFloat(
    (Math.pow(rentRaise3Year / 100 + 1, 1 / 3) - 1) * 100
  ).toFixed(2);
  document.getElementById(
    "input-financing-rent-raise-1"
  ).value = rentRaise1Year;
}

function updateSellprice() {
  let objectName = document.getElementById('input-financing-object').value;

  let newObject = new immoObject();
  newObject = newObject.getObjectByName(objectName);

  totalObjectPrice = newObject.totalObjectPrice;

  let AnnualPriceRaise = +document.getElementById(
    "input-financing-price-raise-object"
  ).value;
  let sellTime = +document.getElementById("input-financing-sell-time").value;
  let sellPrice = parseFloat(
    Math.pow(AnnualPriceRaise / 100 + 1, sellTime) * totalObjectPrice
  ).toFixed(2);
  document.getElementById("input-financing-sell-price").value = sellPrice;
}

function updatePriceRaise() {
  let sellPrice = document.getElementById("input-financing-sell-price").value;
  let totalCost = +document.getElementById("input-financing-total-price")
    .innerHTML;

  let sellTime = document.getElementById("input-financing-sell-time").value;
  let AnnualPriceRaise = parseFloat(
    (Math.pow(sellPrice / totalCost, 1 / sellTime) - 1) * 100
  ).toFixed(2);
  document.getElementById(
    "input-financing-price-raise-object"
  ).value = AnnualPriceRaise;
}

function updateObjectSize() {
  let object = new immoObject();
  let objectName = document.getElementById("input-financing-object").value;
  object = object.getObjectByName(objectName);
  if (object == null) {
    document.getElementById("input-financing-rent-object-size").innerHTML = "0";
  } else {
    document.getElementById("input-financing-rent-object-size").innerHTML =
      object.sizeOfObject;
  }
}

function updateSellYear() {
  let object = new immoObject();
  let objectName = document.getElementById("input-financing-object").value;
  object = object.getObjectByName(objectName);
  let boughtYear = +object.boughtYear;
  let sellTime = +document.getElementById("input-financing-sell-time").value;
  let sellYear = boughtYear + sellTime;
  document.getElementById("input-financing-sell-year").innerHTML = sellYear;

  if (sellTime < 10) {
    document.getElementById("input-object-speculation-text").style.display =
      "block";
  } else {
    document.getElementById("input-object-speculation-text").style.display = "";
  }
}

function updateFinancingSelect() {
  let selectedObject = document.getElementById("input-analyse-object").value;
  let selectFinancing = document.getElementById("input-analyse-financing");
  selectFinancing.innerHTML =
    '<option selected="" selected disabled hidden> select a financial plan </option>';
  if (savedFinancing != null) {
    for (var i = 0; i < savedFinancing.length; i++) {
      if (savedFinancing[i].nameOfObject == selectedObject) {
        var opt = document.createElement("option");
        opt.value = savedFinancing[i].financingName;
        opt.innerHTML =
          savedFinancing[i].financingName +
          ": " +
          savedFinancing[i].downPayment +
          "€ down payment and interest rate of " +
          savedFinancing[i].interestRate +
          "% fixed for " +
          savedFinancing[i].interestFixtime +
          " years";
        selectFinancing.appendChild(opt);
      }
    }
  }
}
