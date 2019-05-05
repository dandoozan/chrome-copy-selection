(() => {
    function getSelectedText() {
        return window.getSelection().toString();
    }

    function copy() {
        document.execCommand('copy');
    }

    function isInputElement(el) {
        return (
            el.tagName === 'INPUT' ||
            el.tagName === 'SELECT' ||
            el.tagName === 'TEXTAREA' ||
            el.isContentEditable
        );
    }

    function getFocusedElement() {
        return document.activeElement;
    }

    function inputFieldHasFocus() {
        return isInputElement(getFocusedElement());
    }

    function copyTextIfApplicableAndDisplayMessage(ev) {
        if (!inputFieldHasFocus()) {
            let selectedText = getSelectedText();
            // console.log(`selectedText="${selectedText}"`);
            if (selectedText) {
                //copy the selected text
                copy();

                //display message
                toast.display(`Copied: "${selectedText}"`);
            }
        }
    }

    //----------main----------
    const toast = new Toast();

    //listen for 'mouseup' and 'keyup' events
    document.addEventListener('mouseup', copyTextIfApplicableAndDisplayMessage);
    document.addEventListener('keyup', copyTextIfApplicableAndDisplayMessage);
})();
