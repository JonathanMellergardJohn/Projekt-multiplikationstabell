function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
};

addElement("questionContainer", "p", "firstTerm", "5");
addElement("questionContainer", "p", "operator", "+");
addElement("questionContainer", "p", "secondTerm", "5");
addElement("questionContainer", "p", "equals", "=");
addElement("questionContainer", "input", "guessField", "");

function 