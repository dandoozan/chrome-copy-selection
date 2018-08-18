// console.log('dpd here');

function getSelectedText() {
    return window.getSelection().toString();
}

function copy() {
    document.execCommand('copy');
}

function copyTextIfAnyIsSelectedAndDisplayMessage() {
    let selectedText = getSelectedText();
    // console.log('selectedText=',selectedText);
    if (selectedText) {
        //copy the selected text
        copy();

        //display message
        Toast.display(`Copied: "${selectedText}"`);
    }
}

Toast.addToastToPage();

//listen for 'mouseup' and 'keyup' events
document.addEventListener('mouseup', copyTextIfAnyIsSelectedAndDisplayMessage);
document.addEventListener('keyup', copyTextIfAnyIsSelectedAndDisplayMessage);


