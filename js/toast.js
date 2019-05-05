/*NOTE: I'm creating my own toast b/c I can't find a good one that doesn't
require me to bring in bootstrap or jquery or something.  Since I don't want to
load those onto every single page just for a simple toast, I'm creating my own.
*/

class Toast {
    constructor() {
        this.ELEMENT_ID = 'crx_toast';
        this.SHOW_CLASS_NAME = 'show';
        this.ELEMENT = this.createToastElement(this.ELEMENT_ID);
        this.TIMEOUT_IN_MS = 3000; //<-- this is related to css rules, so if you change this, change the css as well
        this.TIMEOUT_ID = null;
    }

    createToastElement(id) {
        let div = document.createElement('div');
        div.id = id;
        document.body.appendChild(div);
        return div;
    }

    display(msg) {
        var toastEl = this.ELEMENT;

        //set msg
        toastEl.innerText = msg;

        //show it
        toastEl.className = this.SHOW_CLASS_NAME;

        //hide it (after timeout)
        this.TIMEOUT_ID = setTimeout(() => {
            toastEl.className = '';
        }, this.TIMEOUT_IN_MS);
    }
}
