// inputs
let height = document.getElementById("height_value");
let heightVali = document.getElementById("height_vali");
let weight = document.getElementById("weight_value");
let weightVali = document.getElementById("weight_vali");
let age = document.getElementById("age_value");
let ageVali = document.getElementById("age_vali");
//Vki Value
let vkiParag = document.getElementById("parag_vki"); //paragraf
let vkiValue = document.getElementById("vki_value"); //span

//alertBox
let allAlert = document.getElementById("boxAlert");
let lowWeight = document.getElementById("low_weight");
let normalWeight = document.getElementById("normal_weight");
let overWeight = document.getElementById("over_weight");
let obezWeight = document.getElementById("obez_weight");
let morbidWeight = document.getElementById("morbid_weight");

//Buttons
let calc = document.getElementById("calculateBtn");
let allDeleteBtn = document.getElementById("allDelete");

//tablo
let tabloBody = document.getElementById("table_body");


calc.addEventListener("click", () => { // calculate button event
  validation();
  calculatorVKI();
});

// Validation Area
function validation() {
  if (height.value == "" || (height.value >= "251" && height.value <= "65")) {
    heightVali.classList.remove("d-none");
    heightVali.classList.add("d-block");
  } else {
    heightVali.classList.add("d-none");
  }
  if (weight.value == "" || !(weight.value > 0)) {
    weightVali.classList.remove("d-none");
    weightVali.classList.add("d-block");
  } else {
    weightVali.classList.add("d-none");
  }
  if (age.value == "" || age.value.split("").length <= 2) {
    ageVali.classList.remove("d-none");
    ageVali.classList.add("d-block");
  } else {
    ageVali.classList.add("d-none");
  }
}

// VKI CALC
function calculatorVKI() {
  let h = Math.pow(Number((+height.value / 100).toFixed(2)), 2);
  let w = +weight.value;
  let vki = +(w / h).toFixed(1);
  vkiValue.textContent = vki;

  if (vki) {
    vkiParag.classList.remove("d-none");
    vkiParag.classList.add("d-block");
    viewAlertBox(vki);
  }
}

// Show Alert Box Area
function viewAlertBox(vki) {
  if (vki < 18.5) {
    lowWeight.classList.remove("d-none");
    setTimeout(function () {
      lowWeight.classList.remove("d-block");
      lowWeight.classList.add("d-none");
    }, 5000);
  } else if (vki >= 18.5 && vki <= 24.9) {
    normalWeight.classList.remove("d-none");
    setTimeout(function () {
      normalWeight.classList.remove("d-block");
      normalWeight.classList.add("d-none");
    }, 5000);
  } else if (vki >= 25 && vki <= 29.9) {
    overWeight.classList.remove("d-none");
    setTimeout(function () {
      overWeight.classList.remove("d-block");
      overWeight.classList.add("d-none");
    }, 5000);
  } else if (vki >= 30 && vki <= 34.9) {
    obezWeight.classList.remove("d-none");

    setTimeout(function () {
      obezWeight.classList.remove("d-block");
      obezWeight.classList.add("d-none");
    }, 5000);
  } else {
    morbidWeight.classList.remove("d-none");
    setTimeout(function () {
      morbidWeight.classList.remove("d-block");
      morbidWeight.classList.add("d-none");
    }, 5000);
  }
}

// Delete Everything Button
allDeleteBtn.addEventListener("click", () => {
  localStorage.clear();
  height.value = "";
  weight.value = "";
  age.value = "";
  listArray = [];


  tabloBody.innerHTML = "";
  vkiParag.innerHTML = "";
  vkiParag.classList.remove("bg-primary");

  for (let i = 0; i < allAlert.children.length; i++) {
    const classList = allAlert.children[i].classList;
    if (classList.contains("d-block")) {
      classList.remove("d-block");
      classList.add("d-none");
    }
  }

//   window.location.reload()
});


// List Area(Save Button and Local Storeage Updater)
let count = 0; // list counter
let listArray = []; // base array

function saveBtn() {
  let h = Math.pow(Number((+height.value / 100).toFixed(2)), 2);
  let w = +weight.value;
  let vki = +(w / h).toFixed(1);
  if (vki) {
    listArray.push({
      count: count + 1,
      boy: height.value,
      kilo: weight.value,
      name: age.value,
      vki,
    });
    localStorage.setItem("value", JSON.stringify(listArray));
  }
  tabloBody.innerHTML = "";
  count++;

  localUpdater();
}

function localUpdater() {
  listArray.forEach((item, index) => {
    const newTr = document.createElement("tr");
    newTr.innerHTML = `
                            <th index=${index} scope="row">${item.count}
                            <td>${item.boy} cm</td>
                            <td>${item.kilo} kg</td>
                            <td>${item.name}</td>
                            <td>${item.vki}</td>
                            <button index=${index} class="btn p-2 delete" >
                            Sil</i>
                            </button>
                            </th>
                           
        `;
    tabloBody.appendChild(newTr);
  });
  listArray = [...listArray]
}


loadFromLocalStorage();

function loadFromLocalStorage() {
  const storedData = localStorage.getItem("value");
  if (storedData) {
    listArray = JSON.parse(storedData);
    localUpdater();
  }
}

// Table Delete Button 
tabloBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const indexToDelete = e.target.getAttribute("index");
    if (indexToDelete !== null) {
      listArray.splice(indexToDelete, 1);

      for (let i = 0; i < listArray.length; i++) {
        listArray[i].count = i + 1;
    }
    localStorage.setItem("value", JSON.stringify(listArray));


      tabloBody.innerHTML = "";
      loadFromLocalStorage();
    }
  }
});
