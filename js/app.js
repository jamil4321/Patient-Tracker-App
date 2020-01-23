// initiate Variable
const addPatientModal = document.getElementById("addPatient");
const paitentID = document.getElementById("paitntID");
const name = document.getElementById("name");
const age = document.getElementById("age");
const number = document.getElementById("number");
const disease = document.getElementById("disease");
const date = document.getElementById("date");
const medication = document.getElementById("medication");
const btnAddHistory = document.getElementById("btnAddHistory");
const btnAddPaitent = document.getElementById("btnAddPaitent");
const showPaitent = document.getElementById("showPatient");
const notification = document.getElementById("notification");
const searchByName = document.getElementById("searchByName");
const radioButton = document.getElementsByName("gender");
const modalName = document.getElementById("modalName");
const modalbody = document.getElementById("body");
const history = document.getElementById('history')
let gender;
let paitentData = [];
let pid;
let arrDate = [];
let arrDisease = [];
let arrMedication = [];

// Add Button Function
function addButton() {
  modalName.innerHTML = "Add Paitent";
  name.disabled = false;
  age.disabled = false;
  number.disabled = false;
  if (paitentData.length == 0) {
    pid = "p-1";
  } else {
    pid = [...paitentData].pop();
    pid = pid.id.toString().split("-");
    let id = Number(pid[1]) + 1;
    pid[1] = id;
    pid = pid.join("-");
  }
  for (i = 0; i < radioButton.length; i++) {
    if (radioButton[i].checked) radioButton[i].checked = false;
  }
  paitentID.value = pid;
  paitentID.disable = true;
  name.value = "";
  age.value = "";
  number.value = "";
  body.innerHTML = "";
}
// View DATA in HTML
db.ref("patients/").on("value", snapshot => {
  showPaitent.innerHTML = "";
  if (!snapshot.val()) return;
  paitentData = Object.values(snapshot.val());
  for (let i = 0; i < paitentData.length; i++) {
    let key = paitentData[i].id.split("-");
    showPaitent.innerHTML += `
        <div class="col-3 mt-3" >
        <div class="card text-center card-shaddow">
            <div class="card-body ">
                <h5 class="card-title">Name : <strong>${paitentData[
                  i
                ].name.toUpperCase()}</strong></h5>
                <p class="card-text">Number : ${paitentData[
                  i
                ].number.toUpperCase()}</p>
                <p class="card-text">Age : ${paitentData[
                  i
                ].age.toUpperCase()}</p>
                <p class="card-text">Gender : ${paitentData[
                  i
                ].gender.toUpperCase()}</p>
                <p class="card-text">Paitent Id : ${paitentData[
                  i
                ].id.toUpperCase()}</p>
                <button class="btn btn-info" type="button" data-toggle="modal" 
                data-target="#addPatient" onclick="getPaitent(${key[1]})">
                <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-warning" type="button" data-toggle="modal" 
                data-target="#addPatient" onclick="getPaitentForUpdate(${
                  key[1]
                })">
                <i class="fas fa-user-edit"></i>
                </button>
                <button class="btn btn-danger" type="button" data-toggle="modal" 
                data-target="#delet-paitent" onclick="deletePaitent(${key[1]})">
                <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>`;
  }
});

// Add Paitent Data
function addPaitent() {
  for (i = 0; i < radioButton.length; i++) {
    if (radioButton[i].checked) gender = radioButton[i].value;
  }
  if (name.value != "" && age.value != "" && number.value != "" && gender) {
    db.ref("patients/" + pid).set({
      id: pid,
      name: name.value.toLowerCase(),
      age: age.value.toLowerCase(),
      number: number.value.toLowerCase(),
      gender: gender.toLowerCase()
    });
    notification.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <p>Paitent data Insert successfully</p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
    </div>
    `;
  } else {
    notification.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <p>Paitent data not inserted U have left some required field empty kindly fill form again</p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
    </div>
    `;
  }
}
// view Paitent
function getPaitent(getId) {
  arrDate = [];
  arrDisease = [];
  arrMedication = [];
  history.innerHTML = ''
  modalName.innerHTML = "View Paitent";
  name.disabled = true;
  age.disabled = true;
  number.disabled = true;
  db.ref("patients/p-" + getId).once("value", data => {
    dbData = data.val();
    name.value = dbData.name;
    paitentID.value = dbData.id;
    age.value = dbData.age;
    number.value = dbData.number;
    if (dbData.gender == "male") {
      radioButton[1].checdateked = true;
    } else {
      radioButton[0].checked = true;
    }
    if(dbData.date){
      arrDate = dbData.date
      arrDisease = dbData.disease
      arrMedication = dbData.medication
      
      for(let i = 0; i < arrDate.length;i++){
        history.innerHTML += `
            <h6>${arrDate[i]}</h6>
            <p>${arrDisease[i]}</p>
            <p>${arrMedication[i]}</p>
        `
      }
    }
  });
  body.innerHTML = "";
  body.innerHTML += `
        <hr/>
        <div class="row">
        <div class="col-6">
            <p><strong>Add Record</strong></p>
        </div>
        <div class="col-6">
            <button class="btn btn-success" 
            data-toggle="modal" 
            data-target="#addHistory" 
            onclick="addPaitentHistory(${getId})">
            <i class="fas fa-plus"></i>
            </button>
        </div>
        </div>
        <hr/>
  `;

  btnAddPaitent.onclick = "";
}

// add History Record

function addPaitentHistory(getId) {
  db.ref('patients/p-'+getId).once('value',data =>{
    dbData = data.val()
  })
  if(!dbData.date){
      arrDate = [];
      arrDisease = [];
      arrMedication = [];
  }else{
  arrDate = dbData.date
  arrDisease = dbData.disease
  arrMedication = dbData.medication
  }
  console.log(arrDate,arrDisease,arrMedication)
  btnAddHistory.onclick = () => historyBtn(getId)
}

// Add History
function historyBtn(getId){
  if(  date.value != ""&&
  disease.value != ""&&
  medication.value != ""){
    arrDate.push(date.value);
    arrDisease.push(disease.value);
    arrMedication.push(medication.value);
  db.ref('patients/p-'+getId).update({
    date:arrDate,
    disease:arrDisease,
    medication:arrMedication
  })
  }
  else{
    console.log("error")
  }
  date.value = ""
  disease.value = ""
  medication.value = ""

}

// getData for Upadte
function getPaitentForUpdate(getId) {
  modalName.innerHTML = "Update Paitent";
  name.disabled = false;
  age.disabled = false;
  number.disabled = false;
  body.innerHTML = "";
  db.ref("patients/p-" + getId).once("value", data => {
    dbData = data.val();
    name.value = dbData.name;
    paitentID.value = dbData.id;

    age.value = dbData.age;
    number.value = dbData.number;
    if (dbData.gender == "male") {
      radioButton[1].checked = true;
    } else {
      radioButton[0].checked = true;
    }
  });
  btnAddPaitent.onclick = () => {
    updatePaitnet(paitentID, name, age, number);
  };
}
// UpdatePaintent
function updatePaitnet(id, pname, page, pnumber) {
  for (i = 0; i < radioButton.length; i++) {
    if (radioButton[i].checked) gender = radioButton[i].value;
  }
  db.ref("patients/" + id.value).set({
    id: id.value,
    name: pname.value.toLowerCase(),
    age: page.value.toLowerCase(),
    number: pnumber.value.toLowerCase(),
    gender: gender.toLowerCase()
  });
}

// delete Paitent
function deletePaitent(getId) {
  db.ref("patients/p-" + getId).remove();
}

// Search
// let nameArr = [];
searchByName.addEventListener("keyup", e => {
  let key = e.target.value.toLowerCase();
  paitentData.forEach(name => {
    if (name.indexOf(key) != -1) {
      console.log(name);
    } else {
      console.log("no item found");
    }
  });
});
