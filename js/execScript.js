// console.log('dpd here');

//todo: put this in CommonJavaScript
function getSelectedText() {
    return window.getSelection().toString();
}

//todo: put this in CommonJavaScript
function copy() {
    document.execCommand('copy');
}

//todo: put this in CommonJavaScript
function isInputElement(el) {
    return el.tagName === 'INPUT' ||
    el.tagName === 'SELECT' ||
    el.tagName === 'TEXTAREA' ||
    el.isContentEditable;
}

//todo: put this in CommonJavaScript
function getFocusedElement() {
    return document.activeElement;
}

function inputFieldHasFocus() {
    return isInputElement(getFocusedElement());
}

function copyTextIfApplicableAndDisplayMessage(ev) {
    if (!inputFieldHasFocus()) {
        let selectedText = getSelectedText();
        // console.log('selectedText=',selectedText);
        if (selectedText) {
            //copy the selected text
            copy();

            //display message
            Toast.display(`Copied: "${selectedText}"`);
        }
    }
}

Toast.addToastToPage();

//listen for 'mouseup' and 'keyup' events
document.addEventListener('mouseup', copyTextIfApplicableAndDisplayMessage);
document.addEventListener('keyup', copyTextIfApplicableAndDisplayMessage);


