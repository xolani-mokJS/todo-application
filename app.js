//getting elements from DOM
let form = document.getElementById('form');
let listBox = document.getElementById('listBox');
const DB = [];

// Note: don't change value directly. Use nextId instead.
let _last_id = 0;

/**
 * Loads saved cookies,
 * ensures that global variables are in a valid state,
 * and updates the page
 */
function init() {
    loadTodos();
    updateIds();
    // update page with loaded todos
    DB.forEach(todo => addTodoElement(todo));
}

/**
 * generates the next entity id
 */
function nextId() {
    return ++_last_id;
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    addUserInput();
});

/**
 * Gets the value for a stored cookie.
 *
 * @param key the cookie to be fetched
 * @returns {string|null} the cookie's value, if it exists
 */
function getCookie(key) {
    let cookies = document.cookie.split('; ');
    console.log('All cookies:', cookies);
    let cookie = cookies.find(x => x.match(key))
    if (cookie == null) return null;
    // will break if the value contains '=' chars as well. Since
    // these will also be viewed as delimiters.
    let [k, v, ..._] = cookie.split('=');
    return v;
}

/**
 * Save a key-value string pair as a cookie
 * @param key
 * @param value
 */
function saveCookie(key, value) {
    document.cookie = `${key}=${value}`;
}

/**
 * Persist todos to local storage.
 *
 * The DB is actually saved into the user's cookies
 */
function saveTodos() {
    saveCookie('todo-db', JSON.stringify(DB));
}

/**
 * Ensures that the generated IDs don't clash with ones obtained from DB
 */
function updateIds() {
    _last_id = DB.map(x => x.id).reduce((prev, cur) => Math.max(prev, cur), 0);
}

/**
 * Load todos from persistent storage into in-memory DB.
 */
function loadTodos() {
    let todos = getCookie('todo-db');
    if (todos == null || todos.match(/[Nn]ull|[Nn]one|[Nn]il/)) {
        return;
    }
    JSON.parse(todos).forEach(todo => DB.push(todo));
}

/**
 * Adds an entity to the page as an element.
 * @param todo
 */
function addTodoElement(todo) {
    // add classe to the fetched items
    let li = document.createElement('li');
    li.classList.add('list-item', `item-${todo.id}`);

    //check if the user has added relevant info in to do list
    if (todo.value == null || todo.value.trim() === '') {
        let error = document.getElementById('error');
        error.innerHTML = 'Please enter something to do.';
    } else {
        // if user added all relevant things build the list and appen the children
        listBox.appendChild(li);
        li.innerHTML = `
                        <input class="p-todo" type="text" value="${todo.value}"
                        readonly id="p-todo-${todo.id}">
                        <button onclick="onEdit(${todo.id})" name="edit" class="edit" id="edit-${todo.id}">edit</button>
                        <button onclick="onDelete(${todo.id})" name="delete" class="delete" id="delete-${todo.id}">delete</button>
        `;
        document.getElementById('myInput').value = '';
        error.innerHTML = '';
    }
}

//building the to do list
function addUserInput() {

    //building the items
    //fetching relevant items we will need
    let userInput = document.getElementById('myInput').value;

    todo = {
        id: nextId(),
        value: userInput,
        date: new Date()
    }

    DB.push(todo);

    addTodoElement(todo);

    saveTodos();
}

function onUpdate(uid) {
    let todo = document.querySelector(`.list-item.item-${uid}`);
    let txtField = todo.children[1];

    txtField.setAttribute('readonly', '');

    let entity = DB.find(todo => todo.id === uid);

    entity.value = txtField.value;
    saveTodos();

    let el = document.getElementById(`edit-${uid}`);
    el.onclick = () => onEdit(uid);
    el.innerText = 'edit';
    el.classList.add('edit');
}

function onEdit(uid) {
    let todo = document.querySelector(`.list-item.item-${uid}`);
    let editThis = todo.children[1];
    console.log('readOnlyAttr =', editThis.getAttribute('readonly'));
    editThis.removeAttribute('readonly');

    let el = document.getElementById(`edit-${uid}`);
    el.onclick = () => onUpdate(uid);
    el.innerText = 'save';
    el.classList.add('update');
}

function onDelete(uid) {
    let removeThis = document.querySelector(`.list-item.item-${uid}`);
    let todo = DB.find(x => x.id === uid);
    DB.splice(DB.indexOf(todo), 1)
    removeThis.remove();
    saveTodos();
}

function removeAll() {
    while (DB.length > 0) DB.shift();

    document.getElementById('listBox').innerHTML = '';
    saveTodos();
}

init();
