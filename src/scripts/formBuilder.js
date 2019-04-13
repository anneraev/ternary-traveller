import htmlBuilder from "./htmlBuilder";

export default {
    //Title of form, Array of original keys, array of original values, array of types of fields, id from dataset.
    buildForm: (wrapperType, title, keysArray, valuesArray, typesArray, id, arrayOptionsArray) => {
        //(elementType, elementId, elementTextContent, elementValue)
        //create form.
        const form = htmlBuilder.elementBuilder(wrapperType, `${title}--${id}`, undefined, undefined)
        if (wrapperType === "fieldset") {
            const legend = htmlBuilder.elementBuilder("legend", `legend--${title}--${id}`, `${title}:`, undefined);
            form.appendChild(legend);
        }
        //loops through keys and builds a form and label from the passed data.
        for (let i = 0; i < keysArray.length; i += 1) {
            //container for the label/form pairs.
            const div = htmlBuilder.elementBuilder("div", `div--${keysArray[i]}--${id}`, undefined, undefined)
            //label and form
            if (typesArray[i] !== "radio" && typesArray[i] !== "checkbox") {
                const label = htmlBuilder.elementBuilder("label", `label--${keysArray[i]}--${id}`, `${keysArray[i]}`, undefined) //?
                div.appendChild(label)
            } else {
                const heading = htmlBuilder.elementBuilder("h5", `label--${keysArray[i]}--${id}`, `${keysArray[i]}`, undefined)
                div.appendChild(heading);
            }
            //specify type
            let field
            if (typesArray[i] === "textarea") {
                field = htmlBuilder.elementBuilder(`${typesArray[i]}`, `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
                div.appendChild(field);
            } else if (typesArray[i] === "select") {
                field = htmlBuilder.elementBuilder(`${typesArray[i]}`, `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
                //build out options for the select input type. The value is alwas an integer representing the Id of the item in the dataset.
                arrayOptionsArray[i].forEach(option => {
                    let optionIndex = arrayOptionsArray[i].indexOf(option);
                    const newOption = htmlBuilder.elementBuilder("option", `${typesArray[i]}Option--${id}--${optionIndex}`, `${option}`, `${optionIndex}`)
                    field.appendChild(newOption);
                })
                div.appendChild(field);
                //all other input types.
            } else {
                //if type is checkbox or radio button.
                if (typesArray[i] === "radio" || typesArray[i] === "checkbox") {
                    arrayOptionsArray[i].forEach(option => {
                        let optionIndex = arrayOptionsArray[i].indexOf(option);
                        const label = htmlBuilder.elementBuilder("label", `${typesArray[i]}--${id}--${optionIndex}`, `${option}`, undefined)
                        ////
                        let newItem = htmlBuilder.elementBuilder("input", `${typesArray[i]}Option--${id}--${optionIndex}`, `${option}`, `${option}`) //?
                        newItem.setAttribute("name", `${valuesArray[i]}`)
                        newItem.setAttribute("type", `${typesArray[i]}`);
                        const optionDiv = htmlBuilder.elementBuilder("div", `optionDiv--${id}--${optionIndex}`, undefined, undefined)
                        optionDiv.appendChild(label)
                        optionDiv.appendChild(newItem);
                        div.appendChild(optionDiv);
                    })
                } else {
                    field = htmlBuilder.elementBuilder("input", `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, undefined) //?
                    field.setAttribute("type", `${typesArray[i]}`);
                    field.setAttribute("placeholder", `${valuesArray[i]}`)
                    div.appendChild(field);
                }
            }
            form.appendChild(div);
        }
        console.log(form);
        return form
    },
}