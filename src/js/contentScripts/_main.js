import { showToast } from './_toast';

let currentSelectedText = '';

function isInputElement(el) {
    return (
        el.tagName === 'INPUT' ||
        el.tagName === 'SELECT' ||
        el.tagName === 'TEXTAREA' ||
        el.isContentEditable
    );
}

function inputFieldHasFocus() {
    return isInputElement(document.activeElement);
}

function getSelectedText() {
    return window.getSelection().toString();
}

function displayToast(msg) {
    showToast(`Copied: "${msg}"`);
}

function copySelectedTextIfApplicable() {
    if (!inputFieldHasFocus()) {
        let selectedText = getSelectedText();

        //check that selectedText is truthy to ensure we have something to copy AND check
        //that selectedText != currentSelectedText so that I don't do unnecessary work (of
        //double copying and also showing the toast twice for the same text); in other
        //words, if there is text already selected on the page, then it has already been
        //copied and the user has already been shown a toast about it, so don't show it again
        // console.log(`selectedText="${selectedText}; currentSelectedText="${currentSelectedText}"`);
        if (selectedText && selectedText !== currentSelectedText) {
            //copy the selected text
            document.execCommand('copy');

            //display toast
            displayToast(selectedText);
        }

        currentSelectedText = selectedText;
    }
}

function handleMouseUp(event) {
    copySelectedTextIfApplicable();
}

function handleKeyUp(event) {
    copySelectedTextIfApplicable();
}

function handleCopyEvent(event) {
    const selectedText = getSelectedText();

    //if there is no selected text on the page, then copy the url
    if (!selectedText) {
        let url = window.location.href;

        //put the url in an anchor tag so that it's copied as a link to the clipboard (so that
        //when it's pasted, it gets pasted as a link (instead of just plaintext))
        event.clipboardData.setData('text/html', `<a href="${url}">${url}</a>`);

        //fallback to plaintext if the above doesn't work (per MDN recommendation)
        event.clipboardData.setData('text/plain', url);

        //display toast
        displayToast(url);

        //prevent default to prevent the browser from executing a "copy" command
        event.preventDefault();
    }
}

(function main() {
    //add event listeners
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('copy', handleCopyEvent);
})();
