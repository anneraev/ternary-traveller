import formBuilder from "./formBuilder";

const formObject = function (wholeForm, inputArray, submitButton) {
    this.form = wholeForm;
    this.inputs = inputArray;
    this.button = submitButton;
    this.referenceFormElements = function () {
        //all the various form inputs are indentified by their key value (the same as the key value that was originall passed to them when the formBuilder function called--they keys stored in the keysArray variable) The keys are also used to identify their label and container. Calling them in this way allows easy access to manipulate the attributes of these elements.
        this.inputs.forEach(input => {
            const id = input.id
            const idArray = id.split("--")
            const key = idArray[3];
            const containerKey = `${key}Container`;
            const labelKey = `${key}Label`;
            this[key] = input;
            this[containerKey] = this[key].parentNode;
            this[labelKey] = this[containerKey].firstChild
        })
    };
    //these methods allow the user to easily add new elements to the form object, as well as the DOM.
    this. newHeader = function (tag, id, type, key, target) {
        const header = formBuilder.buildHeader(tag, id, type, key);
        target.appendChild(header);
        const containerKey = `${key}Container`;
        const labelKey = `${key}Label`;
        this[key] = header;
        this[containerKey] = target
        this[labelKey] = target.firstChild

    }
    this.newTextArea = function (type, key, id, target) {
        const textArea = formBuilder.buildTextArea(type, key, id);
        target.appendChild(textArea);
        const containerKey = `${key}Container`;
        const labelKey = `${key}Label`;
        this[key] = textArea;
        this[containerKey] = target
        this[labelKey] = target.firstChild

    };
    this.newdropDown = function (type, key, id, value, optionsArray, target) {
        const dropDown = formBuilder.buildDropdown(type, key, id, value, optionsArray)
        target.appendChild(dropDown);
        const containerKey = `${key}Container`;
        const labelKey = `${key}Label`;
        this[key] = dropDown;
        this[containerKey] = this[key].parentNode;
        this[labelKey] = this[containerKey].firstChild

    };
    this.newRadio = function (option, optionIndex, id, key, target) {
        const radio = formBuilder.buildOption(option, optionIndex, "radio", id, key)
        target.appendChild(radio);
        const containerKey = `${key}Container`;
        const labelKey = `${key}Label`;
        this[key] = radio;
        this[containerKey] = this[key].parentNode;
        this[labelKey] = this[containerKey].firstChild

    };
    this.newCheckbox = function (option, optionIndex, id, key, target) {
        const checkbox = formBuilder.buildOption(option, optionIndex, "checkbox", id, key)
        target.appendChild(checkbox);
        const containerKey = `${key}Container`;
        const labelKey = `${key}Label`;
        this[key] = checkbox;
        this[containerKey] = target
        this[labelKey] = this[containerKey].firstChild

    };
    this.newInput = function (type, key, id, value, target) {
        const input = formBuilder.buildInput(type, key, id, value)
        target.appendChild(input);
        const containerKey = `${key}Container`;
        const labelKey = `${key}Label`;
        this[key] = input;
        this[containerKey] = this[key].parentNode;
        this[labelKey] = this[containerKey].firstChild

    };
    this.newButton = function (id, name, target) {
        const button = formBuilder.buildButton(id, name)
        target.appendChild(button);
    };
}

export default {
    createFormObject: function (form, inputArray, submitButton) {
        const newFormObject = new formObject(form, inputArray, submitButton);
        return newFormObject;
    }
}