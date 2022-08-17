
// creating new list item 

function newItemElement(){
    let listItem = document.createElement("li");
    let myInput = document.getElementById('myInput');
    let myInputValue = myInput.value;

    let txt = document.createTextNode(myInputValue);
    listItem.appendChild(txt);

    if (myInputValue === ''){
        alert('Please write something to add on list');
    } else {
        document.getElementById('myList').appendChild(listItem);
    }

    document.getElementById('myInput').value = '';

    // let inputs =[];

    // for (let i = 0; i < inputs.length; i++ ){
    //     inputs.push(myInputValue);
    // }
    // console.log(inputs);
}



