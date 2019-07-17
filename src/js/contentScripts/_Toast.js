export class Toast {
    constructor() {
        this.ELEMENT_ID = 'crx_toast';
    }

    createToastElement(body) {
        //create the element
        let div = document.createElement('div');
        div.id = this.ELEMENT_ID;
        div.innerHTML = body;

        //add the click listener to remove it when clicked
        div.addEventListener('click', this.removeToastElement.bind(this));

        //add it to the page
        document.body.appendChild(div);
    }

    removeToastElement() {
        let element = document.getElementById(this.ELEMENT_ID);
        if (element) {
            element.remove();
        }
    }

    show(msg) {
        //remove previous toast element if it exists (which will happen if text has
        //previously been selected on the page before)
        this.removeToastElement();

        //create new toast element
        this.createToastElement(msg);
    }
}
