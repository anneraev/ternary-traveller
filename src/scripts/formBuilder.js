import htmlBuilder from "./htmlBuilder";
import formObjectManager from "./formObject";

//will be passed to the object that contains all the values of this form.
let inputsArray = [];

//ID style guide:
//Whole Form ("form"--id)
//wrapper for each item ("wrapper"--id--type)
//label for each item ("label"--id--type--key--optionId(if multiple))
//field item ("field"--id--type--key--optionId(if multiple))

//Title - defined title.
// id - id of data object.
// type - type of input
// key - name of item in data.

//create an array of the created elements, iterate through them, dynamically build key/value pairs that refer to the element, store the object. That way, any of the form's elements can be easily referred to.

//Things you'll want a reference to:
//Inputs themselves (for getting values, adding options)
//The form itself.
//The wrapper for each input/label pair (for adding options, removing labels, fields, ect).
//a reference to its submit button.

//A reference to the object needs to be made inside the button's event listener. Makes it easy to access.

//Object constructor needs to have in it functions to call the field creation functions, so that adding a new field to an existing form is as easy as calling that form and the field building function that is an attribute of it.

export default {
    //Title of form, Array of original keys, array of original values, array of types of fields, id from dataset.
    buildForm: function (wrapperType, title, keysArray, valuesArray, typesArray, id, arrayOptionsArray) {
        //(elementType, elementId, elementTextContent, elementValue)
        //create form.
        const form = htmlBuilder.elementBuilder(wrapperType, `${title}--${id}`)
        if (wrapperType === "fieldset") {
            const legend = this.buildLegend(title, id);
            form.appendChild(legend);
        }
        //loops through keys and builds a form and label from the passed data.
        for (let i = 0; i < keysArray.length; i += 1) {
            //container for the label/form pairs.
            const type = typesArray[i];
            const key = keysArray[i];
            const optionsArray = arrayOptionsArray[i];
            const value = valuesArray[i];
            //label and form
            if (type === "radio" || type === "checkbox") {
                const heading = this.buildHeader("h5", id, type, key)
                form.appendChild(heading);
            };
            //specify type
            if (type === "textarea") {
                let textArea = this.buildTextArea(type, key, id); //?
                form.appendChild(textArea);
            } else if (type === "select") {
                const dropDown = this.buildDropdown(type, key, id, value, optionsArray);
                form.appendChild(dropDown);
                //all other input types.
            } else {
                //if type is checkbox or radio button.
                if (type === "radio" || type === "checkbox") {
                    optionsArray.forEach(option => {
                        let optionIndex = optionsArray.indexOf(option);
                        let newItem = this.buildOption(option, optionIndex, type, id, key) //?
                        form.appendChild(newItem);
                    })
                } else {
                    const field = this.buildInput(type, key, id, value)
                    form.appendChild(field);
                }
            }
        }
        //append the elements to the form, create form object, and return an array containing the form itself for appending, as well as a reference to the form object. The form object contains methods for easy reference to any of the form's elements, as well as functions for adding elements.
        const submitButton = this.buildButton(id, "Submit");
        form.appendChild(submitButton);
        console.log(form);
        const newFormObject = formObjectManager.createFormObject(form, inputsArray, submitButton);
        newFormObject.referenceFormElements();
        const formArray = []
        formArray.push(form);
        formArray.push(newFormObject);
        return formArray;
    },
    buildHeader: function (tag, id, type, key) {
        const header = htmlBuilder.elementBuilder(tag, `label--${id}--${type}--${key}`, `${key}`);
        inputsArray.push(header);
        return header;
    },
    buildLabel: function (key, id, type) {
        const label = htmlBuilder.elementBuilder("label", `label--${id}--${type}--${key}`, `${key}`, undefined)
        inputsArray.push(label);
        return label
    },
    buildLegend: function (title, id) {
        const legend = htmlBuilder.elementBuilder("legend", `legend--${title}--${id}--legend`, `${title}:`);
        inputsArray.push(legend);
        return legend;
    },
    buildTextArea: function (type, key, id) {
        const label = this.buildLabel(key, id, type)
        const div = htmlBuilder.elementBuilder("div", `wrapper--${id}--${type}`)
        const textArea = htmlBuilder.elementBuilder(`${type}`, `field--${id}--${type}--${key}`);
        div.appendChild(label);
        div.appendChild(textArea);
        inputsArray.push(textArea);
        return div;
    },
    buildDropdown: function (type, key, id, value, optionsArray) {
        const label = this.buildLabel(key, id, type)
        const div = htmlBuilder.elementBuilder("div", `wrapper--${id}--${type}`)
        const dropdown = htmlBuilder.elementBuilder(`${type}`, `field--${id}--${type}--${key}`, undefined, `${value}`) //?
        //build out options for the select input type. The value is alwas an integer representing the Id of the item in the dataset.
        optionsArray.forEach(option => {
            const optionIndex = optionsArray.indexOf(option);
            const addedOption = this.buildOption(option, optionIndex, type, id, key);
            dropdown.appendChild(addedOption);
        })
        div.appendChild(label);
        div.appendChild(dropdown);
        inputsArray.push(dropdown);
        return div;
    },
    buildOption: function (option, optionIndex, type, id, key) {
        let optionValue
        let inputType
        if (type === "select" || type === "dropdown" || type === "option") {
            optionValue = optionIndex;
            inputType = "option"
        } else {
            optionValue = option;
            inputType = "input";
        }
        const newOption = htmlBuilder.elementBuilder(`${inputType}`, `field--${id}--${type}--${key}--${optionIndex}`, `${option}`, `${optionValue}`)
        inputsArray.push(newOption);
        if (inputType !== "option") {
            const label = htmlBuilder.elementBuilder("label", `label--${id}--${type}--${key}--${optionIndex}`, `${option}`);
            if (type === "radio") {
                newOption.setAttribute("name", `${key}`);
            }
            newOption.setAttribute("type", `${type}`);
            const optionDiv = htmlBuilder.elementBuilder("div", `divOption--${id}--${type}--${key}--${optionIndex}`)
            optionDiv.appendChild(label);
            optionDiv.appendChild(newOption);
            return optionDiv;
        } else {
            return newOption;
        }
    },
    buildInput: function (type, key, id, value) {
        const label = this.buildLabel(key, id, type)
        const div = htmlBuilder.elementBuilder("div", `wrapper--${id}--${type}`)
        const input = htmlBuilder.elementBuilder("input", `field--${id}--${type}--${key}`);
        input.setAttribute("type", `${type}`);
        if (type === "text") {
            input.setAttribute("placeholder", `${value}`);
        }
        div.appendChild(label);
        div.appendChild(input);
        inputsArray.push(input);
        return div;
    },
    buildButton: function (id, name) {
        const button = htmlBuilder.elementBuilder("button", `button--${id}--${name}`, name);
        return button;
    }
}