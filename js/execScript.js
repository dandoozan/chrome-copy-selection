(() => {
    let currentSelectedText = '';

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

            currentSelectedText = selectedText;
            if (selectedText) {
                //copy the selected text
                copy();

                //display message
                notifier.notify('Copied text:', selectedText);
            }
        }
    }

    function handleKeyUp(ev) {
        let selectedText = getSelectedText();
        if (selectedText !== currentSelectedText) {
            copyTextIfApplicableAndDisplayMessage(ev);
        }
    }

    //----------main----------
    const notifier = new Notifier();

    document.addEventListener('mouseup', copyTextIfApplicableAndDisplayMessage);
    document.addEventListener('keyup', handleKeyUp);
})();
