import htmlBuilder from "./htmlBuilder";

export default {
    //Title of form, Array of original keys, array of original values, array of types of fields, id from dataset.
    buildForm: (title, keysArray, valuesArray, typesArray, id) => {
        //(elementType, elementId, elementTextContent, elementValue)
        //create form.
        const form = htmlBuilder.elementBuilder("form", `${title}--${id}`, undefined, undefined)
        //loops through keys and builds a form and label from the passed data.
        for (let i = 0; keysArray.length; i+=1){
            //container for the label/form pairs.
            const div = htmlBuilder.elementBuilder("div", `div--${keysArray[i]}--${id}`, undefined, undefined)
            //label and form
            const label = htmlBuilder.elementBuilder("label", `label--${keysArray[i]}--${id}`, `${keysArray[i]}`, undefined) //?
            const field = htmlBuilder.elementBuilder(`${typesArray[i]}`, `${typesArray[i]}--${keysArray[i]}--${id}`, undefined, `${valuesArray[i]}`) //?
            //append to div, append div to form.
            div.appendChild(label);
            div.appendChild(field);
            form.appendChild(div);
        }
        console.log(form);
        return form
    },
}