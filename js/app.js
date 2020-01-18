const paitentID = document.getElementById("paitntID");
const name = document.getElementById("name");
const age = document.getElementById("age");
const number = document.getElementById("number");
const disease = document.getElementById("disease");
const date = document.getElementById("date");
const medication = document.getElementById("medication");
const btnAddPaitent = document.getElementById("btnAddPaitent");
const showPaitent = document.getElementById("showPatient");
const dbRef = db.ref("patients/");
let paitentData = [];
const viewData = () => {
  showPaitent.innerHTML = "";

  dbRef.on("value", snapshot => {
    if (!snapshot.val()) return;
    paitentData = Object.values(snapshot.val());
    for (let i = 0;i < paitentData.length;i++){
        showPaitent.innerHTML += `
        <div class="col-3 mt-3" >
        <div class="card text-center">
            <div class="card-body card-shaddow">
                <h5 class="card-title">${paitentData[i].name}</h5>
                <p class="card-text">${paitentData[i].number}</p>
                <p class="card-text">${paitentData[i].id}</p>
                <button class="btn btn-info" type="button" onclick="getPaitent(${paitentData[i].id})">View History</button>
            </div>
        </div>
        `;

    }
   
  });
};

function addPaitent() {
  if(paitentData.length == 0){
      let pid = 'p-1'
  }else{
    let pid = [...paitentData].pop();
    pid = pid.id.toString().split("-");
    let id = Number(pid[1]) + 1;
    pid[1] = id;
    pid = pid.join("-");
  }
  console.log(pid);
  db.ref("patients/" + pid).set({
    id: pid,
    name: name.value,
    age: age.value,
    number: number.value,
    disease: disease.value,
    date: date.value,
    medication: medication.value
  });
}
viewData();
