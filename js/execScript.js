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

    //tbx
    function addPaperToast(msg) {
        let div = document.createElement('div');
        div.innerHTML = `
            <script type="module">
            // import 'https://raw.githubusercontent.com/PolymerElements/paper-toast/master/paper-toast.js';
                import '${chrome.runtime.getURL('js/paper-toast.js')}';
            </script>
            <paper-toast text="${msg}" opened></paper-toast>
        `;

        document.body.appendChild(div);
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
                notifier.notify(`Copied: "${selectedText}"`);

                //tbx
                addPaperToast(selectedText);
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
