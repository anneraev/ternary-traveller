import htmlBuilder from "./htmlBuilder";

const fieldFragment = document.createDocumentFragment()

export default {
    //Title of form, Array of original keys, array of original values, array of types of fields, id from dataset.
    buildForm: (title, keysArray, valuesArray, typesArray, id) => {
        //(elementType, elementId, elementTextContent, elementValue)
        //create form.
        const form = htmlBuilder.elementBuilder("form", `${title}--${id}`, undefined, undefined, )
        //loops through keys and builds a form and leble from the passed data.
        for (let i = 0; keysArray.length; i+=1){
            const label = htmlBuilder.elementBuilder("label", `${}--${}`, `${title}`, undefined, ) //?
            const field = htmlBuilder.elementBuilder(`${}`, `${}--${}`, `${}`, undefined, ) //?
            fieldFragment.appendChild(label);
            fieldFragment.appendChild(field);
        }
    },
}