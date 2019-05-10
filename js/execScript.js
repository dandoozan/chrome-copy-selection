(() => {
    const URL = window.location.href;

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

    //tbx
    // function addPaperToast(msg) {
    //     let div = document.createElement('div');
    //     div.innerHTML = `
    //         <script type="module">
    //             import '@polymer/paper-toast/paper-toast.js';
    //         </script>
    //         <paper-toast text="${msg}" opened></paper-toast>
    //     `;

    //     document.body.appendChild(div);
    // }

    function isGoogleSheet() {
        return URL.startsWith('https://docs.google.com/spreadsheets/d/');
    }

    function shouldIgnoreDueToSpecialCase(selectedText) {
        //ignore when an empty cell is clicked on in a google sheet (in this case, the
        //the page thinks that a newline has been selected, but really nothing has been selected)
        return isGoogleSheet(URL) && selectedText === '\n';
    }

    function copyTextIfApplicableAndDisplayMessage(ev) {
        // if (!inputFieldHasFocus()) {
            let selectedText = getSelectedText();
            console.log(`selectedText="${selectedText}"`);

            currentSelectedText = selectedText;
            if (selectedText) {

                //handle special cases
                if (shouldIgnoreDueToSpecialCase(selectedText)) {
                    return;
                }

                //copy the selected text
                copy();

                //display message
                notifier.notify(`Copied: "${selectedText}"`);

                //tbx
                // addPaperToast(selectedText);
            }
        // }
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
