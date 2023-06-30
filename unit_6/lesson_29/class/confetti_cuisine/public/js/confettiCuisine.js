//Listing 29.4 Creating an Ajax function to retrieve course data
$(document).ready(() => {//Wait for the DOM to load.
  $("#modal-button").click(() => {//click event of the modal button
    $(".modal-body").html("");
    $.get(`/api/courses`, (results = {}) => {//GET request to API endpoint
      let data = results.data;
      if (!data || !data.courses) return;//if there is no data or course object
      data.courses.forEach(course => {//parse the data object for JSON and loop through its array of contents
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>//
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {//event listner after the courses are added
  $(".join-button").click(event => {//click event
    let $button = $(event.target),//button is the event target
      courseId = $button.data("id");
			console.log(`/api/courses/${courseId}/join`)
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {//GET request to API endpoint
      let data = results.data;
      if (data && data.success) {//if joined successfully
        $button
          .text("Joined")//add text joined
          .addClass("joined-button")//button changes color
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
