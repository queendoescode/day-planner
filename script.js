// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  // This function is invoked after page and all its dependencies have loaded.

  var workHours = $("#work-hours"); 

  // Create the DOM elements for each working hour in the day

  for (var hour = 9; hour <= 17; hour++) {
    // These `if` statements help us convert 24 hour time (9-17) 
    // to 12 hour time (9am-5pm):

    var amPm;
    if (hour < 12) {
      amPm = 'AM';
    } else {
      amPm = 'PM';
    }

    var hourOfDay;
    if (hour > 12) {
      hourOfDay = hour - 12;
    } else {
      hourOfDay = hour;
    }

    var timeBlockId = `hour-${hour}`;
    var newElement = $(
      `<div id="${timeBlockId}" class="row time-block past">
        <div class="col-2 col-md-1 hour text-center py-3">${hourOfDay}${amPm}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`);  

    // (DONE): Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    var savedText = localStorage.getItem(timeBlockId);
    var descriptionElement = newElement.find(".description");
    descriptionElement.val(savedText);

    workHours.append(newElement); // add to DOM so it will be visible
  }

  // (DONE): Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function updateColourClasses() {

    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var isPresent = hour === currentHour;
      var isFuture = hour > currentHour;

      var colourClass;
      if (isPresent) {
        colourClass = "present";
      } else if (isFuture) {
        colourClass = "future";
      } else {
        colourClass = "past";
      }

      $(`#hour-${hour}`).removeClass("present future past").addClass(colourClass);
    }
  }

  // (TODO): Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function clickHandler() {
    // Inside this handler function, `this` refers to the button element that was clicked    
    // There is nothing about the BUTTON element that indicates the hour.
    // The event listener has to look at the parent with class time-block
    // to find out which hour.

    // .closest() looks for the nearest ancestor element that matches the given query
    // in this case the query is class `time-block`:

    var timeBlockDiv = $(this).closest(".time-block");
    var timeBlockId = timeBlockDiv.attr("id");
    // timeBlockId is now a string like "hour-10" depending on which button was clicked
    var enteredText = timeBlockDiv.find(".description").val();

    localStorage.setItem(timeBlockId, enteredText);
  }

  $(".saveBtn").on("click", clickHandler);

  //
  // (DONE): Add code to display the current date in the header of the page.

  var timeElement =$("#currentDay");
  
  // See: https://day.js.org/docs/en/parse/now

  function doThisEverySecond() {
    var currentTime = dayjs();
    var formattedString = currentTime.format(" dddd,MMMM Do");

    timeElement.text(formattedString);

    updateColourClasses();
  }

  var timerId = setInterval(doThisEverySecond, 1000);



  
});
