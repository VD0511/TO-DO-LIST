const mybtn = document.querySelector('#addbtn');
const input = document.querySelector('#taskinput');
const list = document.querySelector('#list');

let taskarray = JSON.parse(localStorage.getItem('mytask')) || [];
function loadtask() {
  list.innerHTML = "";
  taskarray.forEach((taskobj, index) => {
    rendertask(taskobj, index)
  });
}

mybtn.addEventListener('click', function () {
  const tasktext = input.value;
  if (tasktext !== "") {
    taskarray.push({ text: tasktext, completed: false })
    localStorage.setItem('mytask', JSON.stringify(taskarray))
    savedata();
    loadtask();
    input.value = "";
  } else {
    alert('please write something!')
  }
});
function rendertask(taskobj, index) {
  const newitem = document.createElement('li')
  newitem.innerText = taskobj.text;
  if (taskobj.completed) {
    newitem.classList.add('completed')
  }
  newitem.addEventListener('dblclick', function () {
    taskarray[index].completed = !taskarray[index].completed;
    savedata();
    loadtask();
  })
  const dlbtn = document.createElement('button')
  dlbtn.innerText = "X";
  dlbtn.style.marginLeft = '10px';
  dlbtn.onclick = function () {
    taskarray.splice(index, 1)
    savedata();
    loadtask();
  }
  newitem.appendChild(dlbtn)
  list.appendChild(newitem);
}
function savedata() {
  localStorage.setItem('mytask', JSON.stringify(taskarray))
}
loadtask();
const darkbtn = document.querySelector('#darkbtn')
const body = document.body;
darkbtn.addEventListener('click', function () {
  body.style.backgroundColor = '#280905'
})
const lightbtn = document.querySelector('#lightbtn')
lightbtn.addEventListener('click', function () {
  body.style.backgroundColor = "#FFFBF1"
});
const deletebtn = document.querySelector('#deletebtn')
deletebtn.addEventListener('click', function () {
  list.innerHTML = "";
  taskarray = [];
  localStorage.removeItem('mytask')
  savedata();
})