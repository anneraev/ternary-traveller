import htmlBuilder from "./htmlBuilder";

export default {
    //Title of form, Array of original keys, array of original values, array of types of fields, id from dataset.
    buildForm: (title, keysArray, valuesArray, typesArray, id, arrayOptionsArray) => {
        //(elementType, elementId, elementTextContent, elementValue)
        //create form.
        const form = htmlBuilder.elementBuilder("fieldset", `${title}--${id}`, undefined, undefined)
        form.appendChild("legend", `legend--${title}--${id}`, `${title}:`, undefined);
        //loops through keys and builds a form and label from the passed data.
        for (let i = 0; keysArray.length; i += 1) {
            //container for the label/form pairs.
            const div = htmlBuilder.elementBuilder("div", `div--${keysArray[i]}--${id}`, undefined, undefined)
            //label and form
            const label = htmlBuilder.elementBuilder("label", `label--${keysArray[i]}--${id}`, `${keysArray[i]}`, undefined) //?
            //specify type
            let field
            if (typesArray[i] === "textarea") {
                field = htmlBuilder.elementBuilder(`${typesArray[i]}`, `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
            } else if (typesAray[i] === "select") {
                field = htmlBuilder.elementBuilder(`${typesArray[i]}`, `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
                //build out options for the select input type. The value is alwas an integer representing the Id of the item in the dataset.
                arrayOptionsArray[i].forEach(option => {
                    const newOption = htmlBuilder.elementBuilder("option", `${typesArray[i]}--${keysArray[i]}--${option.index}`, `${option}`, `${option.index}`)
                    field.appendChild(newOption);
                })
                //all other input types.
            } else {
                field = htmlBuilder.elementBuilder("input", `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
                field.setAtrribute("type", `${typesArray[i]}`);
                //if type is checkbox or radio button.
                if (typesArray[i] === "radio" || typesArray[i] === "checkbox"){
                    //stuff
                }
            }
            //append to div, append div to form.
            div.appendChild(label);
            div.appendChild(field);
            form.appendChild(div);
        }
        console.log(form);
        return form
    },
}