function initFinancing(financingName) {
  let newObject = new financingObject();
  document.getElementById("input-financing-object").innerHTML = '<option value="" selected="" selected disabled hidden>select an object</option>';
  document.getElementById("button-save-as-new-object").style.display = '';
  if (financingName != "") {
    newObject = newObject.getObjectByName(financingName);
    
  } 

  
  
  if (newObject.financingName == "") {
    document.getElementById("input-financing-name").innerHTML =
      "Add a new financial plan";
  } else {
    document.getElementById(
      "input-financing-name"
    ).innerHTML = `${newObject.financingName}`;
    document.getElementById("button-save-as-new-object").style.display = 'flex';
  }

  if (savedObjects != null) {
    
    for (var i = 0; i < savedObjects.length; i++) {
      var opt = document.createElement("option");
      opt.value = savedObjects[i].name;
      opt.innerHTML = savedObjects[i].name;
      document.getElementById("input-financing-object").appendChild(opt);
    }
  }



  document.getElementById("input-financing-object").value = newObject.nameOfObject;
  document.getElementById(
    "input-financing-total-price"
  ).innerHTML = `${newObject.totalPrice}`;
  document.getElementById("input-financing-downpayment-percentage").value =
    newObject.downPaymentPercentage;
  document.getElementById("input-financing-downpayment-euro").value =
    newObject.downPayment;
  document.getElementById(
    "input-financing-total-loan"
  ).value = `${newObject.loan}`;
  document.getElementById(
    "input-financing-total-loan-percentage"
  ).innerHTML = parseFloat(100 - newObject.downPaymentPercentage
  ).toFixed(2);
  document.getElementById("input-financing-interest-rate").value =
    newObject.interestRate;
  document.getElementById("input-financing-redemption-rate").value =
    newObject.redemptionRate;
  document.getElementById(
    "input-financing-payment-month"
  ).value = `${parseFloat(newObject.mortgagePayment / 12).toFixed(2)}`;
  document.getElementById(
    "input-financing-payment-year"
  ).value = `${newObject.mortgagePayment}`;
  document.getElementById("input-financing-interest-fix-time").value =
    newObject.interestFixtime;
  document.getElementById("input-financing-rent-persqmeter").value = `${parseFloat(newObject.montlyRent / newObject.sizeOfObject).toFixed(2)}`;
  document.getElementById("input-financing-rent-euro").value =
    newObject.montlyRent;
    document.getElementById("input-financing-rent-object-size").innerHTML =
    `${newObject.sizeOfObject}`;
  document.getElementById("input-financing-rent-raise-1").value =
    newObject.AnnualRentRaise;
  //document.getElementById("input-financing-rent-raise-3").value = 0;
  document.getElementById("input-financing-price-raise-object").value =
    newObject.annualPriceRaise;
  document.getElementById("input-financing-sell-time").value =
    newObject.objectSellTime;
  document.getElementById("input-financing-sell-price").value =
    newObject.objectSellPrice;
    document.getElementById("input-financing-sell-year").innerHTML =
    `${newObject.sellYear}`;

  

  document.getElementById("full-screen-window").style.display = "flex";
  document.getElementById("full-screen-window-add-financing").style.display =
    "block";
}
