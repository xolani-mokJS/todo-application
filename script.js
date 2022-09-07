//getting elements from DOM
let addbutton = document.getElementById('submitButton');
let form = document.getElementById('form');
let listBox = document.getElementById('listBox');
let myList = [];

//event handlers Litening to the submit buuton and calling the function to builds the element and prints to dom

form.addEventListener('submit', function(event){
    event.preventDefault();
    addUserInput();
  });
 
// save to local storage
  function saveLocally(){

  }


// building the to do list
  function addUserInput(){
  let userInput = document.getElementById('myInput').value;

  todo = {
      inputName: userInput,
      id: new Date()
    }
  myList.push(todo);

  // add classe to the fetched items
  let li = document.createElement('li');
  li.classList.add('list-item');

  //check if the user has added relevant info in to do list
  if (userInput == null ||userInput.trim() == '' ){

    let error = document.getElementById('error');
    error.innerHTML = 'Please enter something to do.';
   } 
     else{
        // if user added all relevant things build the list and appen the children
          listBox.appendChild(li);
          li.innerHTML = `
                        <input class="p-todo" type="text" value="${todo.inputName}" readonly id="${todo.id}">
                        <button onclick="editButton()" name="edit" class="edit" id="edit">edit</button>
                        <button onclick="deletebutton()" name="delete" class="delete" id="delete">delete</button>
          `
          document.getElementById('myInput').value = '';
        }

        saveLocally();
        console.log(myList);
}

function editButton(){
 let editThis = document.getElementById('todo-item');

 if( editThis == 'readonly'){
  editThis.removeAttribute('readonly');
 } else {
  editThis.setAttribute('readonly', true)
 }
}

function deletebutton(){
  let removeThis = document.querySelector('.list-item');
  removeThis.remove();
}

function removeAll(){
document.getElementById('listBox').innerHTML = '';
}


