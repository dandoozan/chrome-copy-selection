(() => {
    let currentSelectedText = '';

    function getPageUrl() {
        return window.location.href;
    }

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

    function copyTextIfApplicableAndDisplayMessage() {
        // if (!inputFieldHasFocus()) {
        let selectedText = getSelectedText();
        console.log(`selectedText="${selectedText}"`);

        currentSelectedText = selectedText;
        if (selectedText) {
            //copy the selected text
            copy();

            //display toast
            notifier.notify(`Copied: "${selectedText}"`);
        }
        // }
    }

    function handleMouseUp(event) {
        copyTextIfApplicableAndDisplayMessage();
    }

    function handleKeyUp(event) {
        let selectedText = getSelectedText();

        //add this check to prevent the toast from showing when the
        //user makes unrelated keyboard presses (eg. pressing "down" to
        //scroll down the page) (without this check, the toast will show
        //up everytime the user presses "down")
        if (selectedText !== currentSelectedText) {
            copyTextIfApplicableAndDisplayMessage();
        }
    }

    function handleCopyEvent(event) {
        const selectedText = getSelectedText();

        //if there is no selected text on the page, then copy the url
        if (!selectedText) {
            let textToCopy = getPageUrl();

            //write the url to the clipboard
            event.clipboardData.setData('text/plain', textToCopy);

            //display toast
            notifier.notify(`Copied: "${textToCopy}"`);

            //prevent default to prevent the browser from executing a "copy" command
            event.preventDefault();
        }
    }

    //----------main----------
    const notifier = new Notifier();

    //add event listeners
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('copy', handleCopyEvent);
})();
