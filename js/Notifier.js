/*NOTE: I'm creating my own toast b/c I can't find a good one that doesn't
require me to bring in bootstrap or jquery or something.  Since I don't want to
load those onto every single page just for a simple toast, I'm creating my own.
*/

class Notifier {
    constructor() {
        this.ELEMENT_ID = 'crx_toast';
    }

    createNotification(contentAsHtml) {
        //create the element
        let div = document.createElement('div');
        div.id = this.ELEMENT_ID;
        div.innerHTML = contentAsHtml;

        //add the click listener to remove it if clicked
        div.addEventListener('click', this.removeNotification.bind(this));

        //add it to the page
        document.body.appendChild(div);
        return div;
    }

    removeNotification() {
        if (document.getElementById(this.ELEMENT_ID)) {
            document.getElementById(this.ELEMENT_ID).remove();
        }
    }

    notify(contentAsHtml) {
        //remove previous toast element if it exists (this could happen if notify is called
        //before the previous notification fades out; in this case, just remove the previous
        //notification and fade in a new one)
        this.removeNotification();

        //create new toast element
        this.createNotification(contentAsHtml);
    }
}
