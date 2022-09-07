//getting elements from DOM
let addbutton = document.getElementById('submitButton');
let editButton = document.getElementById("edit");
let form = document.getElementById('form');
let listBox = document.getElementById('listBox');


//Litening to the submit buuton and calling the function to builds the element and prints to dom

//event handlers
form.addEventListener('submit', function(event){
    event.preventDefault();
    addUserInput();
  });
 

// building the to do list
function addUserInput(){
  //building the items
  //fetching relevant items we will need
  let userInput = document.getElementById('myInput').value;

  // add classe to the fetched items
  let li = document.createElement('li');
  li.classList.add('list-item');

  //check if the user has added relevant info in to do list
  if (userInput == '' || userInput == null){

    let error = document.getElementById('error');
    error.innerHTML = 'Please enter something to do.';
   } 
     else{
        // if user added all relevant things build the list and appen the children
          listBox.appendChild(li);
          li.innerHTML = `
                        <input 
                        class="todo-item"
                        type="checkbox" 
                        name="item" 
                        id="todo-item">
                        <input class="p-todo"
                        type="text"
                        value="${userInput}"
                        readonly
                        >
                        <button name="edit" class="edit" id="edit">edit</button>
                        <button name="delete" class="delete" id="delete">delete</button>
          `
          document.getElementById('myInput').value = '';
        }

}

