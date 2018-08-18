/*Stupidly, I'm creating my own toast b/c I can't find a good one that doesn't
require me to bring in bootstrap or jquery or something.  Since I don't want to
load those onto every single page just for a simple toast, I'm creating my own, but,
I agree, this is dumb.

Make this into an actual module in the future if I need it for something else.
*/

let Toast = {
    TOAST_ID: 'copy_selected_toast',
    TOAST_SHOW_CLASS_NAME: 'show',
    TOAST_TIMEOUT_IN_MS: 3000,

    addToastToPage() {
        let div = document.createElement('div');
        div.id = this.TOAST_ID;
        document.body.appendChild(div);
    },

    display(msg) {
        var toastEl = document.getElementById(this.TOAST_ID);

        //set msg
        toastEl.innerText = msg;

        //show it
        toastEl.className = this.TOAST_SHOW_CLASS_NAME;

        //hide it (after 3 sec)
        setTimeout(() => {
            toastEl.className = toastEl.className.replace(this.TOAST_SHOW_CLASS_NAME, '');
        }, this.TOAST_TIMEOUT_IN_MS);
    },
};