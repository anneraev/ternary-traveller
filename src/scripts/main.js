import formBuilder from "./formBuilder.js"

//(title, keysArray, valuesArray, typesArray, id)
const title = "Test"
const id = 3

//select and textarea are tags on their own and not input types, but the code will understand and build the proper element. Checkbox and radio are defined each individually, but again the code is set up to understand that.

let keysArray = ["Test1", "Test2", "Dropdown", "Radio", "Checkbox", "Textarea"];
let valuesArray = ["This is test1", "This is test2", undefined, undefined,undefined, undefined];
let typesArray = ["text", "date", "select", "radio", "checkbox", "textarea"];
let dropDownOptions = ["Love", "Hate", "Indifference"]
let radioOptions = ["True", "False"]
let checkboxOptions = ["This is a test!", "This is also a test!"]
let arrayOptionsArray = [undefined, undefined, dropDownOptions, radioOptions, checkboxOptions, undefined]

formBuilder.buildForm(title, keysArray, valuesArray, typesArray, id, arrayOptionsArray)