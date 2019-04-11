import formBuilder from "./formBuilder.js"

//(title, keysArray, valuesArray, typesArray, id)
const title = "Test"
const id = 3

//select and textarea are tags on their own and not input types, but the code will understand and build the proper element. Checkbox and radio are defined each individually, but again the code is set up to understand that.

keysArray = ["Test1", "Test2", "Dropdown", "Radio", "checkbox", "textarea"];
valuesArray = ["This is test1", "This is test2", undefined, undefined,undefined, undefined];
typesArray = ["text", "date", "select", "radio", "checkbox", "textarea"];
dropDownOptions = ["Love", "Hate", "Indifference"]
radioOptions = ["True", "False"]
checkboxOptions = ["This is a test!", "This is also a test!"]
arrayOptionsArray = [undefined, undefined, dropDownOptions, radioOptions, checkboxOptions, undefined]

formBuilder.buildForm(title, keysArray, valuesArray, typesArray, id, arrayOptionsArray)