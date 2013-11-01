
// main.js
//
// Packt Publishing - Build a Network Application with Node
// Assign click and hover event handlers for application

window.onload = function() {

  var i, j,
    d = document,
    bodyTag = d.getElementsByTagName("body")[0],
    removeLinks = d.querySelectorAll(".remove-link"),
    eventList = d.getElementById("event-list"),
    eventListItems = eventList ? eventList.children : [],
    handleHover = function(el) {
      el.onmouseover = function() { this.className = this.className + "hover"; };
      el.onmouseout = function() { this.className = ""; };
    };

  // Confirm delete action
  for (i=removeLinks.length-1; i >= 0; i--)
    removeLinks[i].onclick = function() { return confirm('Really remove?'); };

  for (i=eventListItems.length-1; i >= 0; i--) handleHover(eventListItems[i]);

};


