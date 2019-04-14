import htmlBuilder from "./htmlBuilder";

//create an array of the created elements, iterate through them, dynamically build key/value pairs that refer to the element, store the object. That way, any of the form's elements can be easily referred to.

//Things you'll want a reference to:
//Inputs themselves (for getting values, adding options)
//The form itself.
//The wrapper for each input/label pair (for adding options, removing labels, fields, ect).

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
            const div = htmlBuilder.elementBuilder("div", `div--${key}--${id}`)
            //label and form
            if (type !== "radio" && type !== "checkbox") {
                const label = this.buildLabel(key, id)
                div.appendChild(label)
            } else {
                const heading = htmlBuilder.elementBuilder("h5", `label--${key}--${id}`, `${key}`)
                div.appendChild(heading);
            }
            //specify type
            if (type === "textarea") {
                let textArea = this.buildTextArea(type, key, id); //?
                div.appendChild(textArea);
            } else if (type === "select") {
                const dropDown = this.buildDropdown(type, key, id, value, optionsArray);
                div.appendChild(dropDown);
                //all other input types.
            } else {
                //if type is checkbox or radio button.
                if (type === "radio" || type === "checkbox") {
                    optionsArray.forEach(option => {
                        let optionIndex = optionsArray.indexOf(option);
                        let newItem = this.buildOption(option, optionIndex, type, id) //?
                        div.appendChild(newItem);
                    })
                } else {
                    const field = this.buildInput(type, key, id, value)
                    div.appendChild(field);
                }
            }
            form.appendChild(div);
        }
        console.log(form);
        return form
    },
    buildLabel: function (key, id) {
        const label = htmlBuilder.elementBuilder("label", `label--${key}--${id}`, `${key}`, undefined)
        return label
    },
    buildLegend: function (title, id) {
        const legend = htmlBuilder.elementBuilder("legend", `legend--${title}--${id}`, `${title}:`);
        return legend
    },
    buildTextArea: function (type, key, id) {
        const textArea = htmlBuilder.elementBuilder(`${type}`, `${type}--${key}--${id}`);
        return textArea;
    },
    buildDropdown: function (type, key, id, value, optionsArray) {
        const dropdown = htmlBuilder.elementBuilder(`${type}`, `${type}--${key}--${id}`, undefined, `${value}`) //?
        //build out options for the select input type. The value is alwas an integer representing the Id of the item in the dataset.
        optionsArray.forEach(option => {
            const optionIndex = optionsArray.indexOf(option);
            const addedOption = this.buildOption(option, optionIndex, type, id);
            dropdown.appendChild(addedOption);
        })

        return dropdown;
    },
    buildOption: function (option, optionIndex, type, id) {
        console.log("type", type);
        let optionValue
        let inputType
        if (type === "select" || type === "dropdown" || type === "option") {
            optionValue = optionIndex;
            inputType = "option"
        } else {
            optionValue = option;
            inputType = type;
        }
        const newOption = htmlBuilder.elementBuilder(`${inputType}`, `${type}${option}--${id}--${optionIndex}`, `${option}`, `${optionValue}`)
        if (inputType !== "option") {
            const label = htmlBuilder.elementBuilder("label", `${type}--${id}--${optionIndex}`, `${option}`);
            if (type === "radio") {
                newOption.setAttribute("name", `${option}`);
            }
            newOption.setAttribute("type", `${type}`);
            newOption.appendChild(label);
            const optionDiv = htmlBuilder.elementBuilder("div", `${type}${option}--${id}--${optionIndex}`)
            optionDiv.appendChild(newOption);
            return optionDiv;
        } else {
            return newOption;
        }
    },
    buildInput: function (type, key, id, value) {
        const input = htmlBuilder.elementBuilder("input", `${type}--${key}--${id}`);
        input.setAttribute("type", `${type}`);
        if (type === "text") {
            input.setAttribute("placeholder", `${value}`);
        }
        return input;
    }
}