import formBuilder from "./formBuilder.js"
const display = document.getElementById("display-container")


//(title, keysArray, valuesArray, typesArray, id)
const title = "Test"
const id = 3

//select and textarea are tags on their own and not input types, but the code will understand and build the proper element. Checkbox and radio are defined each individually, but again the code is set up to understand that.

//The intent with the form builder is that the function that its called within will pull its keys, original values and IDs from information passed from either the function that its called from, or from the data the information from the form will eventually be written to. The function will build all the associated arrays and pass them to the form builder function.

//The other intent is that it simplifies and standardizes creating inputs, as well as their IDs. Class declarations for styling purposes are still to be done outside the code, which is why the form builder returns the form instead of appending it to the dom itself.


let keysArray = ["Test1", "Test2", "Dropdown", "Radio", "Checkbox", "Textarea"];
let valuesArray = ["This is test1", undefined, undefined, undefined,undefined, undefined];
let typesArray = ["text", "date", "select", "radio", "checkbox", "textarea"];
let dropDownOptions = ["Love", "Hate", "Indifference"]
let radioOptions = ["True", "False"]
let checkboxOptions = ["This is a test!", "This is also a test!"]
let arrayOptionsArray = [undefined, undefined, dropDownOptions, radioOptions, checkboxOptions, undefined]

const form = formBuilder.buildForm(title, keysArray, valuesArray, typesArray, id, arrayOptionsArray)

display.appendChild(form);

