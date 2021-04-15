class analyseObject {
  constructor(immoObject, financingObject) {
    this.nameOfObject = immoObject.name;
    this.nameOfFinancing = financingObject.financingName;
    this.iterateObjects = getIterateObjects(immoObject, financingObject);
    this.year = this.arrayOfYear(this.iterateObjects);
    this.loan = this.arrayOfLoan(this.iterateObjects);
    this.interest = this.arrayOfInterest(this.iterateObjects);
    this.redemption = this.arrayOfRedemption(this.iterateObjects);
    this.rent = this.arrayOfRent(this.iterateObjects);
    this.cashFlow = this.arrayOfCashFlow(this.iterateObjects);
    this.objectValue = this.arrayOfObjectValue(this.iterateObjects);

    this.sellPrice = +this.objectValue[this.objectValue.length - 1];
    this.restLoan = this.loan[this.loan.length - 1];

    this.totalInvestment =
      +financingObject.downPayment +
      +sumOf(this.redemption) -
      +this.redemption[this.redemption.length - 1] +
      +sumOf(this.interest) -
      +this.interest[this.interest.length - 1];

    this.sellProfit = +parseFloat(
      +this.sellPrice - +this.totalInvestment - +this.restLoan
    ).toFixed(1);

    this.speculationTax = this.getSpeculationTax(
      this.sellProfit,
      financingObject.objectSellTime
    );

    this.totalRentIncome = +parseFloat(
      +sumOf(this.rent) - +this.rent[this.rent.length - 1]
    ).toFixed(1);

    this.totalProfit = +this.sellProfit + +this.totalRentIncome;

    this.annualProfitRate = this.getAnnualProfitRate(
      this.totalProfit,
      this.speculationTax,
      this.totalInvestment,
      financingObject.objectSellTime
    );
    this.downPayment = financingObject.downPayment;
    this.totalInterestPayment =
      +sumOf(this.interest) - +this.interest[this.interest.length - 1];
    this.totalRedemptionPayment =
      +sumOf(this.redemption) - +this.redemption[this.redemption.length - 1];


    this.objectPrice = immoObject.priceOfObject;
    this.garagePrice = immoObject.priceOfGarage;
    this.additionalObjectCosts = immoObject.additionalCosts;
    this.brokerageFees = immoObject.brokerageEuro;
    this.landTax = immoObject.taxOfLand;
    this.notaryCost = immoObject.costOfNotary;  
  }

  arrayOfYear(iterateObjects) {
    let yearArray = [iterateObjects[0].year];
    for (var i = 1; i < iterateObjects.length; i++) {
      yearArray.push(iterateObjects[i].year);
    }
    return yearArray;
  }

  arrayOfLoan(iterateObjects) {
    let loanArray = [iterateObjects[0].restLoan];
    for (var i = 1; i < iterateObjects.length; i++) {
      loanArray.push(iterateObjects[i].restLoan);
    }
    return loanArray;
  }

  arrayOfInterest(iterateObjects) {
    let interestArray = [iterateObjects[0].interestPayment];
    for (var i = 1; i < iterateObjects.length; i++) {
      interestArray.push(iterateObjects[i].interestPayment);
    }
    return interestArray;
  }

  arrayOfRedemption(iterateObjects) {
    let redemptionArray = [iterateObjects[0].redemption];
    for (var i = 1; i < iterateObjects.length; i++) {
      redemptionArray.push(iterateObjects[i].redemption);
    }
    return redemptionArray;
  }

  arrayOfRent(iterateObjects) {
    let rentArray = [iterateObjects[0].rentIncome];
    for (var i = 1; i < iterateObjects.length; i++) {
      rentArray.push(iterateObjects[i].rentIncome);
    }
    return rentArray;
  }

  arrayOfCashFlow(iterateObjects) {
    let cashFlowArray = [iterateObjects[0].cashflow];
    for (var i = 1; i < iterateObjects.length; i++) {
      cashFlowArray.push(+parseFloat(iterateObjects[i].cashflow).toFixed(1));
    }
    return cashFlowArray;
  }

  arrayOfObjectValue(iterateObjects) {
    let valueArray = [iterateObjects[0].objectValue];
    for (var i = 1; i < iterateObjects.length; i++) {
      valueArray.push(iterateObjects[i].objectValue);
    }
    return valueArray;
  }

  getSpeculationTax(profit, sellTime) {

    let speculationTax = 0;
    let spTaxRate = 0.4;

    if (profit < 0) {
      return 0;
    }

    if (sellTime < 10) {
      speculationTax = +parseFloat(profit * spTaxRate).toFixed(1);
      return speculationTax;
    } else {
      return 0;
    }
  }

  getAnnualProfitRate(totalProfit, speculationTax, totalInvestment, duration) {
    let annualProfitRate =
      (Math.pow(1 + (totalProfit-speculationTax) / totalInvestment, 1 / duration) - 1) * 100;
    return annualProfitRate;
  }
}

function getIterateObjects(immoObject, financingObject) {
  let initYear = +parseInt(immoObject.boughtYear);
  let initLoan = +parseFloat(financingObject.loan).toFixed(1);
  let interestRate = +financingObject.interestRate;
  let initInterest = +parseFloat((initLoan * interestRate) / 100).toFixed(1);
  let initRedemption = +parseFloat(
    financingObject.mortgagePayment - initInterest
  ).toFixed(1);
  let initRent = +parseFloat(financingObject.montlyRent * 12).toFixed(1);
  let rentRaise = +parseFloat(financingObject.AnnualRentRaise).toFixed(1);
  let initValue = +parseFloat(immoObject.totalObjectPrice).toFixed(1);
  let priceRaise = +parseFloat(financingObject.annualPriceRaise).toFixed(1);
  let initElement = new iterateObject(
    initYear,
    initLoan,
    initInterest,
    initRedemption,
    initRent,
    initValue
  );
  let duration = financingObject.objectSellTime;

  let iterateObjects = [initElement];

  for (var i = 1; i <= duration; i++) {
    year = iterateObjects[i - 1].year + 1;
    restLoan = +parseFloat(
      iterateObjects[i - 1].restLoan - iterateObjects[i - 1].redemption
    ).toFixed(1);
    interestPayment = +parseFloat((restLoan * interestRate) / 100).toFixed(1);
    redemption = +parseFloat(
      financingObject.mortgagePayment - interestPayment
    ).toFixed(1);
    rentIncome = +parseFloat(
      iterateObjects[i - 1].rentIncome * (rentRaise / 100 + 1)
    ).toFixed(1);
    objectValue = +parseFloat(
      iterateObjects[i - 1].objectValue * (priceRaise / 100 + 1)
    ).toFixed(1);
    let newElement = new iterateObject(
      year,
      restLoan,
      interestPayment,
      redemption,
      rentIncome,
      objectValue
    );
    iterateObjects.push(newElement);
  }

  return iterateObjects;
}

class iterateObject {
  constructor(
    initYear,
    initLoan,
    initInterest,
    initRedemption,
    initRent,
    initValue
  ) {
    this.year = initYear;
    this.restLoan = initLoan;
    this.interestPayment = initInterest;
    this.redemption = initRedemption;
    this.rentIncome = initRent;
    this.cashflow = initRent - initRedemption - initInterest;
    this.objectValue = initValue;
  }
}

function sumOf(array) {
  let sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += +array[i];
  }
  return parseFloat(sum).toFixed(1);
}
