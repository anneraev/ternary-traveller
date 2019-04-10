export default {
    // Function to build any elements needed.
    elementBuilder: (elementType, elementId, elementTextContent, elementValue) => {
        let htmlElement = document.createElement(elementType);
        if (elementId) {
            htmlElement.setAttribute("id", elementId);
        }

        if (elementValue) {
            htmlElement.setAttribute("value", elementValue);
        }
        htmlElement.textContent = elementTextContent;
        return htmlElement;
    },
    // Function to enable us to clear DOM.
    clearElement: domElement => {
        while (domElement.firstChild) {
            domElement.removeChild(domElement.firstChild);
        }
    }
}