
// main.js
//
// Packt Publishing - Build a Network Application with Node
// Assign click and hover event handlers for application

window.onload = function() {

  var i, j, socket,
    d = document,
    bodyTag = d.getElementsByTagName("body")[0],
    bodyClass = bodyTag.className,
    removeLinks = d.querySelectorAll(".remove-link"),
    cancelButtons = d.querySelectorAll(".btn-cancel"),
    rsvpButtons = d.querySelectorAll(".button"),
    responseLists = d.querySelectorAll(".responses"),
    eventList = d.getElementById("event-list"),
    eventDetails = d.getElementById("event-details"),
    notification = d.getElementById("notification"),
    eventListItems = eventList ? eventList.children : [],
    handleHover = function(el) {
      el.onmouseover = function() { this.className = this.className + "hover"; };
      el.onmouseout = function() { this.className = ""; };
    },
    toggleResponseForm = function(state) {
      if (state) return bodyTag.className += " show-response-form";
      bodyTag.className = bodyTag.className.replace("show-response-form", "");
    },
    showNotification = function(msg) {
      if (/notify/.test(bodyClass)) return;
      var spanEl = d.createElement("span");
      spanEl.appendChild(d.createTextNode(msg));
      notification.appendChild(spanEl);
      bodyTag.className = bodyClass + " notify";
    };

  // Confirm delete action
  for (i=removeLinks.length-1; i >= 0; i--)
    removeLinks[i].onclick = function() { return confirm('Really remove?'); };

  // Show/hide hover menu for event items
  for (i=eventListItems.length-1; i >= 0; i--) handleHover(eventListItems[i]);

  // Show/hide hover menu for response items
  for (i=responseLists.length-1; i >= 0; i--) {
    for (j=responseLists[i].children.length-1; j >= 0; j--) handleHover(responseLists[i].children[j]);
  }

  // Show RSVP dialog and autoselect the response
  for (i=0; i < rsvpButtons.length; i++) {
    rsvpButtons[i].onclick = (function(index) {
      return function() {
        toggleResponseForm(true);
        d.getElementById("response-status").selectedIndex = index;
      };
    })(i);
  }

  // Hide RSVP dialog
  d.getElementById("overlay").onclick = function() { toggleResponseForm(false); };
  for (i=cancelButtons.length-1; i >= 0; i--)
    cancelButtons[i].onclick = function() { toggleResponseForm(false); };

  // Show notification bar for new events or responses
  if (eventList || eventDetails) {

    socket = io.connect(location.protocol + "//" + location.host);
    socket.on('connect', function() {

      if (eventList) {

        socket.on('new event', function() {
          showNotification("New event(s) added. Click here to reload the page.");
        });

      } else {

        socket.emit("show event", {
          "eventId": eventDetails.getAttribute("data-id")
        });

        socket.on('new response', function() {
          showNotification("New response(s) added. Click here to reload the page.");
        });

      }

      window.onbeforeunload = function() {
        socket.disconnect();
      };
      
    });
  }

};





