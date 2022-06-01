const ELEMENT_ID = 'crx_toast';

function createToastElement(body) {
  //create the element
  let div = document.createElement('div');
  div.id = ELEMENT_ID;
  div.innerHTML = body;

  //add the click listener to remove it when clicked
  // div.addEventListener('click', removeToastElement);

  //add it to the page
  document.body.appendChild(div);
}

function removeToastElement() {
  let element = document.getElementById(ELEMENT_ID);
  if (element) {
    element.remove();
  }
}

export function showToast(msg) {
  //remove previous toast element if it exists (which will happen if text has
  //previously been selected on the page before)
  removeToastElement();

  //create new toast element
  createToastElement(msg);
}

//Remove the toast element so that it doesn't interfere with interacting with other things on the page
document.addEventListener('animationend', function (e) {
  if (e.animationName === 'fadeout') {
    removeToastElement();
  }
});
