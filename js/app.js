// initiate Variable
const paitentID = document.getElementById("paitntID");
const name = document.getElementById("name");
const age = document.getElementById("age");
const number = document.getElementById("number");
const disease = document.getElementById("disease");
const date = document.getElementById("date");
const medication = document.getElementById("medication");
const btnAddPaitent = document.getElementById("btnAddPaitent");
const showPaitent = document.getElementById("showPatient");
const notification = document.getElementById("notification");
let paitentData = [];
let pid;
function addButton() {
  if (paitentData.length == 0) {
    pid = "p-1";
  } else {
    pid = [...paitentData].pop();
    pid = pid.id.toString().split("-");
    let id = Number(pid[1]) + 1;
    pid[1] = id;
    pid = pid.join("-");
  }

  paitentID.value = pid;
  paitentID.disable = true;
  name.value = "";
  age.value = "";
  number.value = "";
  disease.value = "";
  date.value = "";
  medication.value = "";
}
// View DATA in HTML
db.ref("patients/").on("value", snapshot => {
  showPaitent.innerHTML = "";
  if (!snapshot.val()) return;
  paitentData = Object.values(snapshot.val());
  for (let i = 0; i < paitentData.length; i++) {
    showPaitent.innerHTML += `
        <div class="col-3 mt-3" >
        <div class="card text-center">
            <div class="card-body card-shaddow">
                <h5 class="card-title">${paitentData[i].name}</h5>
                <p class="card-text">${paitentData[i].number}</p>
                <p class="card-text">${paitentData[i].id}</p>
                <button class="btn btn-info" type="button" data-toggle="modal" data-target="#addPatient" onclick="getPaitent(${paitentData[i].id})">View History</button>
            </div>
        </div>`;
  }
});

// Add Paitent Data
function addPaitent() {
  if (
    name.value != "" &&
    age.value != "" &&
    number.value != "" &&
    disease.value != "" &&
    date.value != "" &&
    medication.value != ""
  ) {
    db.ref("patients/" + pid).set({
      id: pid,
      name: name.value,
      age: age.value,
      number: number.value,
      disease: disease.value,
      date: date.value,
      medication: medication.value
    });
    notification.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <p>Paitent data Insert successfully</p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
    </div>
    `
  } else {
    notification.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <p>Paitent data not inserted U have left some required field empty kindly fill form again</p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
    </div>
    `
  }
}
// view Paitent

function getPaitent(getId){
  console.log(getId)
  // db.ref("patients/"+getId).once('value',data =>{
  //   dbData = data.val();
   
  // })
}