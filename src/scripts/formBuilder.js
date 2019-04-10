import htmlBuilder from "./htmlBuilder";

export default {
    buildForm: (information, fieldCount, origType, origValue) => {
        const form = htmlBuilder.elementBuilder("label", `${information}--${fieldCount}`, `${origType}`, undefined, )
        while (fieldCount > 0){
            fieldCount -= 1;
            //(elementType, elementId, elementTextContent, elementValue)
            const label = htmlBuilder.elementBuilder("label", `${information}--${fieldCount}`, `${origType}`, undefined, ) //?
            const field = htmlBuilder.elementBuilder("label", `${information}--${fieldCount}`, `${origType}`, undefined, ) //?
        }
    },
}