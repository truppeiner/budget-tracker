// create variable to hold db connection
let db;

// establish connection to indexedDB, set it to version 1
const request = indexedDB.open('budget_tracker', 1);

// event will emit if the database version changes 
request.onupgradeneeded = function(event) {
    // save reference to database 
    const db = event.target.result;
    // create object store (table) set it to auto increment 
    db.createObjectStore('new_budget', { autoIncrement: true });
};

// upon a successful connection 
request.onsuccess = function(event){
    // when db is successfully created. Save reference to db in global variable
    db = event.target.result;

    // check if app is online if yes push offline data to online database
    if (navigator.onLine){
        uploadBudget();
    }
}


// if error log it 
request.onerror = function(event) {
    // log error
    console.log(event.target.errorCode);
}

// will run if we attempt to submit a new pizza with no internet connection
function saveRecord(record){
    // open a new transaction with the batabase with read and write perms
    const transaction = db.transaction(['new_budget'], 'readwrite');

    // access the object store for `new_budget`
    const budgetObjectStore = transaction.objectStore('new_budget');

    // add record to store with add method
    budgetObjectStore.add(record);
}