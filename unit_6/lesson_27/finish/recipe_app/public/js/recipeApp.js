//Listing 27.5 Adding an event listener to each button
$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    //Listing 27.3 Modifying AJAX call
    $.get("/api/courses", (results = {}) => {//API course goes here
      let data = results.data;//set up local variable to represent data
      if (!data || !data.courses) return;//Check that the data object contains course info
      data.courses.forEach(course => {//Loop array course
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();//Call addJoinButtonListener to add an event listener on your buttons 
    });//after the AJAX request completes
  });
});

let addJoinButtonListener = () => {//Add a button with target-class join-button  to join a course. Buttons must e there b4 creating event listner to them
  $(".join-button").click(event => {
    let $button = $(event.target),//button is the target of the click event
      courseId = $button.data("id");//allows you to know which course listing you chose
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {//make new AJAX GET request
      let data = results.data;
      if (data && data.success) {//if joined successfully
        $button//button changes color
          .text("Joined")//text says joined
          .addClass("joined-button")//button says joined
          .removeClass("join-button");//removed the previous join button
      } else {
        $button.text("Try again");//try again if thsi does not work
      }
    });
  });
};
