let savedObjects = [];
let savedFinancing = [];
let windowAktiv;

function init() {
  windowAktiv = localStorage.getItem("windowAktiv");
  if (windowAktiv == null) {
    windowAktiv = "objects";
  }

  savedObjects = getArray("savedImmoObjects");
  savedFinancing = getArray("savedFinancingObjects");
  resetCheck();
  showWindowAktiv();
}

function getArray(arrayName) {
  return JSON.parse(localStorage.getItem(arrayName));
}

function navBarClicked(tabID) {
  let elements = document.getElementsByClassName("nav-bar-item");

  for (i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("nav-bar-item-clicked")) {
      elements[i].classList.remove("nav-bar-item-clicked");
    }
  }

  document.getElementById(tabID).classList.add("nav-bar-item-clicked");
}

function setWindowAktiv(tabName) {
  windowAktiv = tabName;
  localStorage.setItem("windowAktiv", windowAktiv);
  showWindowAktiv();
}

function showWindowAktiv() {
  savedObjects = getArray("savedImmoObjects");
  savedFinancing = getArray("savedFinancingObjects");
  showGallerys();
  navBarClicked(`nav-bar-${windowAktiv}`);
  //resetSelect();
}

function saveObject(objectType) {
  if (objectType == "objects") {
    let object = new immoObject();
    object.saveObject();
  } else if (objectType == "financing") {
    let object = new financingObject();
    object.saveObject();
  }
}

function showGallerys() {
  let elements = document.getElementsByClassName("gallery-show");
  for (i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }

  initTabObjects();
  initTabFinancing();
  initTabAnalyse();

  resetCheck();

  document.getElementById(`show-${windowAktiv}`).style.display = "block";
}

function initTabObjects() {
  document.getElementById("tab-function").style.display = "";
  document.getElementById("gallery-row-objects").innerHTML = "";

  let newObject = new immoObject();
  let picOfObject = "";
  if (savedObjects != null) {
    for (var i = 0; i < savedObjects.length; i++) {
      newObject = savedObjects[i];

      if (newObject.type == "apartment") {
        picOfObject = "./img/apartment.jpg";
      } else if (newObject.type == "house") {
        picOfObject = "./img/house.jpg";
      }

      document.getElementById(
        "gallery-row-objects"
      ).innerHTML += `<div class="object-box box-big flex-column" onclick="initObject('${newObject.name}')">
    <div class="object-information-row">
      <i class="check-icon far fa-check-circle" id="select-${newObject.name}" onclick="checkObject('${newObject.name}','object',event)"></i>
      <span>${newObject.name}</span>
    </div>
    <img class="object-bg-img" src="${picOfObject}" />
    <div class="object-information-row">
      <span>bought in: ${newObject.boughtYear} </span>
    </div>
    <div class="object-information-row">
      <span>last modified: ${newObject.lastModified}</span>
    </div>
  </div> `;
    }
  }
}

function initTabFinancing() {
  document.getElementById("tab-function").style.display = "";
  document.getElementById("element-saved-financing").innerHTML = "";
  let showedObject = [];
  let newObject = new financingObject();
  if (savedFinancing != null) {
    for (var i = 0; i < savedFinancing.length; i++) {
      newObject = savedFinancing[i];
      if (showedObject == null) {
        showedObject = [newObject.nameOfObject];
        document.getElementById(
          "element-saved-financing"
        ).innerHTML += `<h2>saved financial plans of ${newObject.nameOfObject}:</h2>`;
        document.getElementById(
          "element-saved-financing"
        ).innerHTML += `<div class="gallery-row" id = "gallery-row-${newObject.nameOfObject}"></div>`;
      } else if (!showedObject.includes(newObject.nameOfObject)) {
        showedObject.push(newObject.nameOfObject);
        document.getElementById(
          "element-saved-financing"
        ).innerHTML += `<h2>saved financial plans of ${newObject.nameOfObject}:</h2>`;
        document.getElementById(
          "element-saved-financing"
        ).innerHTML += `<div class="gallery-row" id = "gallery-row-${newObject.nameOfObject}"></div>`;
      }
      document.getElementById(
        `gallery-row-${newObject.nameOfObject}`
      ).innerHTML += `<div class="object-box box-big flex-column" onclick="initFinancing('${newObject.financingName}')">
    <div class="object-information-row">
      <i class="check-icon far fa-check-circle" id="select-${newObject.financingName}" onclick="checkObject('${newObject.financingName}','financing',event)"></i>
      <span>${newObject.financingName}</span>
    </div>
    <div class="object-information-row">
      <span>${newObject.nameOfObject}</span>
    </div>
    <img class="object-bg-img" src="img/finance.jpg" />
    <div class="object-information-row">
      <span>Interest rate: ${newObject.interestRate}</span>
    </div>
    <div class="object-information-row">
      <span>Fixed for: ${newObject.interestFixtime}</span>
    </div>
    <div class="object-information-row">
      <span>last modified: ${newObject.lastModified}</span>
    </div>
  </div>`;
    }
  }
}

function initTabAnalyse() {
  if (windowAktiv == "analyse") {
    document.getElementById("tab-function").style.display = "none";
  }
  initAnalyse();
}

function closeWindow(windowName) {
  document.getElementById("full-screen-window").style.display = "";
  document.getElementById(windowName).style.display = "";
}

function initObject(objectName) {
  let newObject = new immoObject();
  if (objectName != "") {
    newObject = newObject.getObjectByName(objectName);
  }

  document.getElementById("input-object-name").value = newObject.name;
  document.getElementById("input-object-type").value = newObject.type;
  document.getElementById("input-object-state").value = newObject.state;
  document.getElementById("input-object-built-year").value =
    newObject.builtYear;
  document.getElementById("input-object-bought-year").value =
    newObject.boughtYear;
  document.getElementById("input-object-size-object").value =
    newObject.sizeOfObject;
  document.getElementById("input-object-net-price-object").value =
    newObject.priceOfObject;
  document.getElementById("input-object-net-price-squaremeter").value =
    newObject.unitPrice;
  document.getElementById("input-object-net-price-parking").value =
    newObject.priceOfGarage;
  document.getElementById("input-object-additional-costs").value =
    newObject.additionalCosts;
  document.getElementById("input-object-brokerage-fees-euro").innerHTML =
    newObject.brokerageEuro;
  document.getElementById("input-object-land-tax-euro").innerHTML =
    newObject.taxOfLand;
  document.getElementById("input-object-notary-euro").innerHTML =
    newObject.costOfNotary;
  document.getElementById("input-object-total-price").innerHTML =
    newObject.totalCost;

  document.getElementById("full-screen-window").style.display = "flex";
  document.getElementById("full-screen-window-object").style.display = "block";
}

function initAnalyse() {
  let selectObject = document.getElementById("input-analyse-object");
  selectObject.innerHTML =
    '<option selected="" selected disabled hidden> select an object </option>';
  let selectFinancing = document.getElementById("input-analyse-financing");
  selectFinancing.innerHTML =
    '<option selected="" selected disabled hidden> select a financial plan </option>';
  if (savedObjects != null) {
    for (var i = 0; i < savedObjects.length; i++) {
      var opt = document.createElement("option");
      opt.value = savedObjects[i].name;
      opt.innerHTML = savedObjects[i].name;
      selectObject.appendChild(opt);
    }
  }

  document.getElementById("statistics-table").innerHTML =
    "<tr><th>Year</th><th>Rest loan amount</th><th>Interest payment</th><th>Redemption</th><th>Rent income</th><th>Cash flow</th><th>Object value</th></tr>";

  document.getElementById("return-table").innerHTML =
    "<tr><th>Total investment:</th></tr><tr><th>Rest amount of loan:</th></tr><tr><th>Sell price:</th></tr><tr><th>Sell profit:</th></tr><tr><th>Total rent income:</th></tr><tr><th>Profit(before tax) of investment:</th></tr><tr><th>Speculation tax(40%):</th></tr><tr><th>Annual profit rate:</th></tr>";

  let chartElements = document.getElementsByClassName("chart");

  for (var i = 0; i < chartElements.length; i++) {
    chartElements[i].innerHTML = "";
  }
}

function checkObject(objectName, type, event) {
  if (type == "object") {
    newObject = new immoObject();
    index = newObject.indexOf(objectName);
    if (!savedObjects[index].select) {
      savedObjects[index].select = true;
      setObjectChecked(objectName);
    } else {
      savedObjects[index].select = false;
      setObjectUnChecked(objectName);
    }
  }

  if (type == "financing") {
    newObject = new financingObject();
    index = newObject.indexOf(objectName);
    if (!savedFinancing[index].select) {
      savedFinancing[index].select = true;
      setObjectChecked(objectName);
    } else {
      savedFinancing[index].select = false;
      setObjectUnChecked(objectName);
    }
  }

  event.stopPropagation();
}

function setObjectChecked(objectName) {
  document.getElementById(`select-${objectName}`).style.color = "green";
  document.getElementById(`select-${objectName}`).style.fontWeight = 700;
}

function setObjectUnChecked(objectName) {
  document.getElementById(`select-${objectName}`).style.color = "";
  document.getElementById(`select-${objectName}`).style.fontWeight = 400;
}

function resetCheck() {
  if (savedObjects != null) {
    for (var i = 0; i < savedObjects.length; i++) {
      savedObjects[i].select = false;
    }
  }
  if (savedFinancing != null) {
    for (var i = 0; i < savedFinancing.length; i++) {
      savedFinancing[i].select = false;
    }
  }
}

function deleteSelected() {
  let newSavedObjects = [];
  for (i = 0; i < savedObjects.length; i++) {
    if (savedObjects[i].select == false) {
      if (newSavedObjects == null) {
        newSavedObjects = [savedObjects[i]];
      } else {
        newSavedObjects.push(savedObjects[i]);
      }
    }
  }
  localStorage.setItem("savedImmoObjects", JSON.stringify(newSavedObjects));

  newSavedObjects = [];
  for (i = 0; i < savedFinancing.length; i++) {
    if (savedFinancing[i].select == false) {
      if (newSavedObjects == null) {
        newSavedObjects = [savedFinancing[i]];
      } else {
        newSavedObjects.push(savedFinancing[i]);
      }
    }
  }
  localStorage.setItem(
    "savedFinancingObjects",
    JSON.stringify(newSavedObjects)
  );

  showWindowAktiv();
}

function deleteConfirm() {
  var confirmMessage = confirm("Do you want to delete selected objects?");
  if (confirmMessage == true) {
    deleteSelected();
  }
}

function changeLandTaxRate() {
  let state = document.getElementById("input-object-state").value;
  let taxRate = 0;
  let notary = 0;

  switch (state) {
    case "bw":
      taxRate = 5;
      notary = 1.5;
      break;
    case "by":
      taxRate = 3.5;
      notary = 1.5;
      break;

    case "brl":
      taxRate = 6;
      notary = 1.5;
      break;

    case "bra":
      taxRate = 6.5;
      notary = 1.5;
      break;

    case "bre":
      taxRate = 5;
      notary = 1.5;
      break;

    case "ham":
      taxRate = 4.5;
      notary = 1.5;
      break;

    case "he":
      taxRate = 6;
      notary = 1.5;
      break;

    case "mkl":
      taxRate = 6;
      notary = 1.5;
      break;

    case "nds":
      taxRate = 5;
      notary = 1.5;
      break;

    case "ndw":
      taxRate = 6.5;
      notary = 1.5;
      break;

    case "rp":
      taxRate = 5;
      notary = 1.5;
      break;

    case "sl":
      taxRate = 6.5;
      notary = 1.5;
      break;

    case "sas":
      taxRate = 3.5;
      notary = 1.5;
      break;

    case "saa":
      taxRate = 5;
      notary = 1.5;
      break;

    case "sh":
      taxRate = 6.5;
      notary = 1.5;
      break;

    case "th":
      taxRate = 6.5;
      notary = 1.5;
      break;

    default:
      taxRate = 5;
      notary = 1.5;
  }

  document.getElementById("input-object-land-tax-percentage").value = taxRate;
  document.getElementById("input-object-notary-percentage").value = notary;
}

function showStatistics() {
  let objectName = document.getElementById("input-analyse-object").value;
  let newObject = new immoObject();
  newObject = newObject.getObjectByName(objectName);

  let financingName = document.getElementById("input-analyse-financing").value;
  let newFinancing = new financingObject();
  newFinancing = newFinancing.getObjectByName(financingName);

  let newAnalyse = new analyseObject(newObject, newFinancing);

  

  loadStatistics(newAnalyse);
  drawChart(newAnalyse);
  drawStacked(newAnalyse);
}

function loadStatistics(analyseObject) {
  document.getElementById("statistics-table").innerHTML =
    "<tr><th>Year</th><th>Rest loan amount</th><th>Interest payment</th><th>Redemption</th><th>Rent income</th><th>Cash flow</th><th>Object value</th></tr>";

  document.getElementById("return-table").innerHTML =
    "<tr><th>Total investment:</th></tr><tr><th>Rest amount of loan:</th></tr><tr><th>Sell price:</th></tr><tr><th>Sell profit:</th></tr><tr><th>Total rent income:</th></tr><tr><th>Profit(before tax) of investment:</th></tr><tr><th>Speculation tax(40%):</th></tr><tr><th>Annual profit rate:</th></tr>";
  let table1 = document.getElementById("statistics-table");

  for (var i = 0; i < analyseObject.iterateObjects.length; i++) {
    row = table1.insertRow(i + 1);
    cell0 = row.insertCell(0);
    cell1 = row.insertCell(1);
    cell2 = row.insertCell(2);
    cell3 = row.insertCell(3);
    cell4 = row.insertCell(4);
    cell5 = row.insertCell(5);
    cell6 = row.insertCell(6);

    cell0.innerHTML = `${analyseObject.iterateObjects[i].year}`;
    cell1.innerHTML = `${analyseObject.iterateObjects[i].restLoan}`;
    cell2.innerHTML = `${analyseObject.iterateObjects[i].interestPayment}`;
    cell3.innerHTML = `${analyseObject.iterateObjects[i].redemption}`;
    cell4.innerHTML = `${analyseObject.iterateObjects[i].rentIncome}`;
    cell5.innerHTML = `${parseFloat(
      analyseObject.iterateObjects[i].cashflow
    ).toFixed(1)}`;
    cell6.innerHTML = `${analyseObject.iterateObjects[i].objectValue}`;
  }

  let table2 = document.getElementById("return-table");

  for (var i = 0; i < table2.rows.length; i++) {
    table2.rows[i].insertCell(1);
  }

  table2.rows[0].cells[1].innerHTML = `-${parseFloat(
    analyseObject.totalInvestment
  ).toFixed(1)}`;
  table2.rows[1].cells[1].innerHTML = `-${analyseObject.restLoan}`;

  table2.rows[2].cells[1].innerHTML = `+${analyseObject.sellPrice}`;
  table2.rows[3].cells[1].innerHTML = `+${analyseObject.sellProfit}`;
  table2.rows[4].cells[1].innerHTML = `+${analyseObject.totalRentIncome}`;
  table2.rows[5].cells[1].innerHTML = parseFloat(
    analyseObject.totalProfit
  ).toFixed(1);
  table2.rows[6].cells[1].innerHTML = `-${analyseObject.speculationTax}`;
  table2.rows[7].cells[1].innerHTML = `${parseFloat(
    analyseObject.annualProfitRate
  ).toFixed(2)} %`;
}

function saveAsNew() {
  document.getElementById("input-financing-name").innerHTML =
    "Add a new financial plan";
  saveObject("financing");
  closeWindow("full-screen-window-add-financing");
}
