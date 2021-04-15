class financingObject {
  constructor() {
    this.nameOfObject = "";
    this.totalPrice = 0;
    this.downPaymentPercentage = 20;
    this.downPayment = 0;
    this.loan = 0;
    this.interestRate = 1.5;
    this.redemptionRate = 2;
    this.mortgagePayment = 0;
    this.interestFixtime = 10;
    this.montlyRent = 0;
    this.AnnualRentRaise = 0;
    this.annualPriceRaise = 3;
    this.objectSellTime = 10;
    this.objectSellPrice = 0;
    this.select = false;
    this.financingName = "";
    this.sizeOfObject = 0;
    this.sellYear = "";
    this.lastModified = "";
  }

  saveObject() {
    this.getObjectByInput();
    if (this.objectName == "") {
      alert("object name can not be empty, plesae enter an object name!");
    } else if (this.objectExist(this.financingName)) {
      var confirmMessage = confirm(
        `do you want to overwrite the ${this.financingName} of ${this.nameOfObject}?`
      );
      if (confirmMessage == true) {
        this.saveChangesToObject();
      }
    } else {
      this.saveNewObject();
    }
  }

  getObjectByInput() {
    this.nameOfObject = document.getElementById("input-financing-object").value;
    this.totalPrice = +document.getElementById("input-financing-total-price")
      .innerHTML;
    this.downPaymentPercentage = +document.getElementById(
      "input-financing-downpayment-percentage"
    ).value;
    this.downPayment = +document.getElementById(
      "input-financing-downpayment-euro"
    ).value;
    this.loan = +document.getElementById("input-financing-total-loan").value;
    this.interestRate = +document.getElementById(
      "input-financing-interest-rate"
    ).value;
    this.redemptionRate = +document.getElementById(
      "input-financing-redemption-rate"
    ).value;
    this.mortgagePayment = +document.getElementById(
      "input-financing-payment-year"
    ).value;
    this.interestFixtime = document.getElementById(
      "input-financing-interest-fix-time"
    ).value;
    this.montlyRent = +document.getElementById(
      "input-financing-rent-euro"
    ).value;
    this.AnnualRentRaise = +document.getElementById(
      "input-financing-rent-raise-1"
    ).value;
    this.annualPriceRaise = +document.getElementById(
      "input-financing-price-raise-object"
    ).value;
    this.objectSellTime = +document.getElementById(
      "input-financing-sell-time"
    ).value;
    this.objectSellPrice = +document.getElementById(
      "input-financing-sell-price"
    ).value;
    this.financingName = this.getFinancingName();
    this.select = false;

    this.sizeOfObject = +document.getElementById(
      "input-financing-rent-object-size"
    ).innerHTML;
    this.sellYear = +document.getElementById("input-financing-sell-year")
      .innerHTML;
    this.lastModified = this.getCurrentTime();
  }

  getObjectByName(objectName) {
    for (i = 0; i < savedFinancing.length; i++) {
      if (savedFinancing[i].financingName == objectName) {
        return savedFinancing[i];
      }
    }
    alert("selected financial plan doesn't exist! Please choose a new plan.");
  }

  objectExist(financingName) {
    if (savedFinancing == null) {
      return false;
    } else {
      for (i = 0; i < savedFinancing.length; i++) {
        if (savedFinancing[i].financingName == financingName) {
          return true;
        }
      }
      return false;
    }
  }

  indexOf(financingName) {
    let index = -1;
    for (i = 0; i < savedFinancing.length; i++) {
      if (savedFinancing[i].financingName == financingName) {
        index = i;
      }
    }
    return index;
  }

  saveNewObject() {
    if (savedFinancing == null) {
      savedFinancing = [this];
    } else {
      savedFinancing.push(this);
    }
    localStorage.setItem(
      "savedFinancingObjects",
      JSON.stringify(savedFinancing)
    );
    closeWindow("full-screen-window-add-financing");
    showWindowAktiv();
  }

  saveChangesToObject() {
    for (i = 0; i < savedFinancing.length; i++) {
      if (savedFinancing[i].financingName == this.financingName) {
        savedFinancing[i] = this;
      }
    }
    localStorage.setItem(
      "savedFinancingObjects",
      JSON.stringify(savedFinancing)
    );
    closeWindow("full-screen-window-add-financing");
    showWindowAktiv();
  }

  select() {
    this.select = true;
    this.objectAsSelected();
  }

  objectAsSelected() {
    //show object as selected
  }

  unSelect() {
    this.select = false;
    this.objectAsUnSelected();
  }

  objectAsUnSelected() {
    //show object as unselected
  }

  getFinancingName() {
    let inputName = document.getElementById("input-financing-name").innerHTML;
    let numOfFinancing = 0;
    if (inputName == "Add a new financial plan") {
      if (savedFinancing == null) {
        numOfFinancing = 1;
      } else {
        let lastName = savedFinancing[savedFinancing.length - 1].financingName;
        numOfFinancing = +lastName.substring(18) + 1;
      }
      inputName = `Financial-plan-No.${numOfFinancing}`;
    }

    return inputName;
  }

  getCurrentTime() {
    var current = new Date();
    var year = current.getFullYear();
    var month = current.getMonth() + 1;
    var day = current.getDate();
    var hour = current.getHours();
    var min = current.getMinutes();

    var date = `${year}-${month}-${day}, ${hour}:${min}`;
    return date;
  }
}
