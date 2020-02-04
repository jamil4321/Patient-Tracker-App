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
const searchByID = document.getElementById('searchByID');
const searchByDate = document.getElementById('searchByDate')
const radioButton = document.getElementsByName("gender");
const modalName = document.getElementById("modalName");
const modalbody = document.getElementById("body");
const history = document.getElementById('history');
const cardShaddow = showPaitent.getElementsByClassName('card-shaddow');
const btnDelete  = document.getElementById('btnDelete');
let gender;
let paitentData = [];
let pid;
let arrDate = [];
let arrDisease = [];
let arrMedication = [];

// Add Button Function
function addButton() {
  modalName.innerHTML = "Add Paitent";
  radioButton[0].disabled = false;
  radioButton[1].disabled = false;
  history.style.overflowY='';
  history.style.height= ''
  name.disabled = false;
  age.disabled = false;
  number.disabled = false;
  history.style.overflowY='';
  history.style.height= '';
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
  history.innerHTML = "";
}
// View DATA in HTML
db.ref("patients/").on("value", snapshot => {
  showPaitent.innerHTML = "";
  if (!snapshot.val()){
    showPaitent.innerHTML = `
    <div class="col-12">
    <h6 class ="mt-5" >There is no Record Click Add Button to Add New Record
  </h6>
  </div>
  
    `;
  }else{
  paitentData = Object.values(snapshot.val());
  for (let i = 0; i < paitentData.length; i++) {
    let key = paitentData[i].id.split("-");
    showPaitent.innerHTML += `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-3" >
        <div class="card text-center card-shaddow">
            <div class="card-body ">
                <h5 class="card-title">Name<br/> <strong>${paitentData[
                  i
                ].name.toUpperCase()}</strong></h5>
                <p class="card-text">Number<br/> ${paitentData[
                  i
                ].number.toUpperCase()}</p>
                <p class="card-text">Age<br/> ${paitentData[
                  i
                ].age.toUpperCase()}</p>
                <p class="card-text">Gender<br/>${paitentData[
                  i
                ].gender.toUpperCase()}</p>
                <p class="card-text paitentID">Paitent Id<br/>${paitentData[
                  i
                ].id.toUpperCase()}</p>
                <p style="display: none;"> ${paitentData[
                  i
                ].date}</p>
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
}});

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
  radioButton[0].disabled = true;
  radioButton[1].disabled = true;
  history.style.overflowY='';
  history.style.height= '';
  db.ref("patients/p-" + getId).on("value", data => {
    history.innerHTML = ""
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
    if(dbData.date){
      history.style.overflowY='scroll';
      history.style.height= '150px'
      arrDate = dbData.date
      arrDisease = dbData.disease
      arrMedication = dbData.medication
      arrDate = arrDate.reverse()
      arrDisease =arrDisease.reverse()
      arrMedication = arrMedication.reverse()
      for(let i = 0; i < arrDate.length;i++){
        history.innerHTML += `
          <hr/>
            <h6>Appointment Date : ${arrDate[i]}</h6>
            <p>Paitent Disease : ${arrDisease[i]}</p>
            <p>Medication : ${arrMedication[i]}</p>
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
  db.ref('patients/p-'+getId).once  ('value',data =>{
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

  btnDelete.onclick = function(){ promptDelet(getId)}
}

function promptDelet(getId){
  db.ref("patients/p-" + getId).remove();
}

// Search By Name
searchByName.addEventListener("keyup", e => {
  let key = e.target.value.toUpperCase();
  let cardShaddow = showPaitent.getElementsByClassName('card-shaddow')
  for (let i = 0 ; i < cardShaddow.length; i++){
        if (cardShaddow[i].getElementsByTagName('strong')[0].innerText.toUpperCase().indexOf(key) > -1) {
      cardShaddow[i].parentElement.style.display = ''
      console.log(key)
    } else {
      cardShaddow[i].parentElement.style.display = 'none'
      console.log(key,'notfound')
    }
  }
});


// search By ID
searchByID.addEventListener("keyup", e => {
  let key = e.target.value.toUpperCase();
  for (let i = 0 ; i < cardShaddow.length; i++){
        if (cardShaddow[i].getElementsByClassName('paitentID')[0].innerText.indexOf(key) > -1) {
      cardShaddow[i].parentElement.style.display = ''
      console.log(key)
    } else {
      cardShaddow[i].parentElement.style.display = 'none'
      console.log(key,'notfound')
    }
  }
});


// search by Date

searchByDate.addEventListener("keyup", e => {
  let key = e.target.value;
  for (let i = 0 ; i < cardShaddow.length; i++){
        if (cardShaddow[i].innerText.toUpperCase().indexOf(key) > -1) {
      cardShaddow[i].parentElement.style.display = ''
      console.log(key,'found')
    } else {
      cardShaddow[i].parentElement.style.display = 'none'
      console.log(key,'notfound')
    }
  }
});