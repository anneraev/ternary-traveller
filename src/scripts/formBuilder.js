import htmlBuilder from "./htmlBuilder";

export default {
    //Title of form, Array of original keys, array of original values, array of types of fields, id from dataset.
    buildForm: (title, keysArray, valuesArray, typesArray, id, arrayOptionsArray) => {
        //(elementType, elementId, elementTextContent, elementValue)
        //create form.
        const form = htmlBuilder.elementBuilder("fieldset", `${title}--${id}`, undefined, undefined)
        const legend = htmlBuilder.elementBuilder("legend", `legend--${title}--${id}`, `${title}:`, undefined);
        form.appendChild(legend);
        //loops through keys and builds a form and label from the passed data.
        for (let i = 0; i < keysArray.length; i += 1) {
            //container for the label/form pairs.
            const div = htmlBuilder.elementBuilder("div", `div--${keysArray[i]}--${id}`, undefined, undefined)
            //label and form
            const label = htmlBuilder.elementBuilder("label", `label--${keysArray[i]}--${id}`, `${keysArray[i]}`, undefined) //?
            div.appendChild(label)
            //specify type
            let field
            if (typesArray[i] === "textarea") {
                field = htmlBuilder.elementBuilder(`${typesArray[i]}`, `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
                div.appendChild(field);
            } else if (typesArray[i] === "select") {
                field = htmlBuilder.elementBuilder(`${typesArray[i]}`, `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
                //build out options for the select input type. The value is alwas an integer representing the Id of the item in the dataset.
                arrayOptionsArray[i].forEach(option => {
                    const newOption = htmlBuilder.elementBuilder("option", `${typesArray[i]}--${keysArray[i]}--${option.index}`, `${option}`, `${option.index}`)
                    field.appendChild(newOption);
                })
                div.appendChild(field);
                //all other input types.
            } else {
                //if type is checkbox or radio button.
                if (typesArray[i] === "radio" || typesArray[i] === "checkbox") {
                    arrayOptionsArray[i].forEach(option => {
                        let newItem = htmlBuilder.elementBuilder("input", `${typesArray[i]}--${keysArray[i]}--${option.index}`, `${option}`, `${option}`) //?
                        newItem.setAttribute("type", `${typesArray[i]}`);
                        div.appendChild(newItem);
                    })
                } else {
                    console.log(typesArray[i])
                    console.log(valuesArray[i])
                    field = htmlBuilder.elementBuilder("input", `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
                    field.setAttribute("type", `${typesArray[i]}`);
                    div.appendChild(field);
                }
            }
            form.appendChild(div);
        }
        console.log(form);
        return form
    },
}