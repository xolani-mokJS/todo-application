//getting elements from DOM
let addbutton = document.getElementById('submitButton');
let deleteButton = document.getElementById('delete');
let editButton = document.getElementById("edit");
let form = document.getElementById('form');
let listBox = document.getElementById('listBox');

let myTodoList =[];

//creating new list item 
//add to dom
form.addEventListener('submit', function(event){
    event.preventDefault();
    doStuff();
  });
   
  // building the to do list

function doStuff(){

  //empty out the list
  // listBox.textContent = '';

  //building the items

  //fetching relevant items we will need
  let myInput = document.getElementById('myInput').value;

  // add classe to the fetched items
  let li = document.createElement('li');
  li.classList.add('list-item');

  let spanEdit = document.createElement('button');
  spanEdit.innerHTML = 'edit';
  spanEdit.classList.add('edit');

  let input = document.createElement('input');
  input.classList.add('todo-item');
  input.setAttribute('type', 'checkbox');

  let spanDelete = document.createElement('button');
  spanDelete.innerHTML = 'delete';
  spanDelete.classList.add('delete');

  let outPutText = document.createTextNode(myInput);

  //check if the user has added relevant info in to do list
  if (myInput == '' || myInput == null){

    let error = document.getElementById('error');
    error.innerHTML = 'Please enter something to do.';
 } 
 else{
// if user added all relevant things build the list and appen the children

  listBox.appendChild(li);
  li.appendChild(input);
  li.appendChild(outPutText,);
  li.appendChild(spanEdit);
  li.appendChild(spanDelete);



  console.log(myInput);
  document.getElementById('myInput').value = '';
 }

  
}
