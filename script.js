
// creating new list item 
let addbutton = document.getElementById('submitButton');

addbutton.addEventListener('click', function(event){
    event.preventDefault();

    let form = document.getElementById('form');
    let myList = document.createElement('li');
    let myInput = document.getElementById('myInput');
    let myInputValue = myInput.value;

    let div = document.getElementById("div");

       let inputList = [];

      inputList.push(myInputValue);
      div.innerHTML = inputList;
       
    document.getElementById('myInput').value = '';
    console.log(inputList);
});
   




