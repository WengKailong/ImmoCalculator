class immoObject {
  constructor() {
    this.name = "";
    this.type = "";
    this.state = "";
    this.builtYear = "";
    this.boughtYear = "";
    this.sizeOfObject = "";
    this.priceOfObject = "";
    this.unitPrice = "";
    this.sizeOfLand = "";
    this.priceOfLand = "";
    this.priceOfGarage = 0;
    this.additionalCosts = 0;
    this.taxOfLand = 0;
    this.costOfNotary = 0;
    this.brokeragePercentage = 3.75;
    this.brokerageEuro = 0;
    this.totalCost =
      +this.priceOfObject +
      +this.priceOfGarage +
      +this.additionalCosts +
      +this.brokerageEuro +
      +this.taxOfLand +
      +this.costOfNotary;
    this.select = false;
    this.totalObjectPrice =
      +this.priceOfObject + +this.priceOfGarage + +this.additionalCosts;

    

    this.lastModified = "";
  }

  saveObject() {
    this.getObjectByInput();
    if (this.name == "") {
      alert("object name can not be empty, plesae enter an object name!");
    } else {
      if (this.objectExist(this.name)) {
        var confirmMessage = confirm(
          `do you want to overwrite the existing object of ${this.name}?`
        );
        if (confirmMessage == true) {
          this.saveChangesToObject();
        }
      } else {
        this.saveNewObject();
      }
    }
  }

  getObjectByInput() {
    this.name = document.getElementById("input-object-name").value;
    this.type = document.getElementById("input-object-type").value;
    this.state = document.getElementById("input-object-state").value;
    this.builtYear = document.getElementById("input-object-built-year").value;
    this.boughtYear = +document.getElementById("input-object-bought-year")
      .value;
    this.sizeOfObject = +document.getElementById("input-object-size-object")
      .value;
    this.priceOfObject = +document.getElementById(
      "input-object-net-price-object"
    ).value;
    this.unitPrice = +document.getElementById(
      "input-object-net-price-squaremeter"
    ).value;
    //this.sizeOfLand = +document.getElementById("input-object-size-land").value;
    //this.priceOfLand = +document.getElementById("input-object-land-price-euro").value;
    this.priceOfGarage = +document.getElementById(
      "input-object-net-price-parking"
    ).value;
    this.additionalCosts = +document.getElementById(
      "input-object-additional-costs"
    ).value;

    this.brokeragePercentage = +document.getElementById("input-object-brokerage-fees-percentage").value;
    this.brokerageEuro = +document.getElementById("input-object-brokerage-fees-euro").innerHTML;
    this.taxOfLand = +document.getElementById("input-object-land-tax-euro")
      .innerHTML;
    this.costOfNotary = +document.getElementById("input-object-notary-euro")
      .innerHTML;
    this.totalCost = +document.getElementById("input-object-total-price")
      .innerHTML;
    this.totalObjectPrice =
      +this.priceOfObject + +this.priceOfGarage + +this.additionalCosts;
    this.lastModified = this.getCurrentTime();
  }

  getObjectByName(objectName) {
    for (i = 0; i < savedObjects.length; i++) {
      if (savedObjects[i].name == objectName) {
        return savedObjects[i];
      }
    }
    alert("selected object doesn't exist! Please choose a new Object.");
  }

  objectExist(objectName) {
    if (savedObjects == null) {
      return false;
    } else {
      for (i = 0; i < savedObjects.length; i++) {
        if (savedObjects[i].name == objectName) {
          return true;
        }
      }
      return false;
    }
  }

  indexOf(objectName) {
    let index = -1;
    for (i = 0; i < savedObjects.length; i++) {
      if (savedObjects[i].name == objectName) {
        index = i;
      }
    }
    return index;
  }

  saveNewObject() {
    if (savedObjects == null) {
      savedObjects = [this];
    } else {
      savedObjects.push(this);
    }
    localStorage.setItem("savedImmoObjects", JSON.stringify(savedObjects));
    closeWindow("full-screen-window-object");
    showWindowAktiv();
  }

  saveChangesToObject() {
    for (i = 0; i < savedObjects.length; i++) {
      if (savedObjects[i].name == this.name) {
        savedObjects[i] = this;
      }
    }
    localStorage.setItem("savedImmoObjects", JSON.stringify(savedObjects));
    closeWindow("full-screen-window-object");
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
