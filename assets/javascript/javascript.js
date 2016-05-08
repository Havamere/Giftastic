// beginning set of buttons array
var buttons = ['Luke Skywalker', 'Leia Organa', 'Han Solo', 'Darth Vader', 'Boba Fett', 'Greedo', 'Anakin Skywalker', 'Darth Sidious', 'Mace Windu', 'Obi Wan Kenobi', 'Yoda', 'Stormtroopers', 'Chewbacca', 'Ewoks', 'Darth Maul']
//puts button array into html doc
createButtonSet();
// button maker
function createButtonSet() {
	//clears current button set to make room for new button set
	$('#buttons').empty();
	//loops through buttons array to create buttons
	for (var i=0; i<buttons.length; i++) {
		//sets up easy to read button appending function
		var newButton = $('<button>');
		newButton.addClass('button');
		newButton.attr('data-name', buttons[i]);
		newButton.text(buttons[i]);
		$('#buttons').append(newButton);
	}
}
//Function to add new buttons to button array
$('#addButton').on('click', function() {
	//variable to hold new button info, removes excess spacearound word entry
	var button = $('#button-input').val().trim();
	//add new value to buttons array
	buttons.push(button);
	//creates new set of buttons to include new added button
	createButtonSet();
	//allows the enter key to trigger the button's effect
	return false;
})
//ajax call to produce 25 random gifs of button choice
function displayGIFS() {
	//random number to set offset parameter of API search so user gets different sets of images
	var randomNumber = Math.floor(Math.random()*50);
	//gets name to place into URL API call
	var gifImage = $(this).data('name');
	//assembles URL for API call
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifImage + "&api_key=dc6zaTOxFJmzC&offset="+randomNumber;
	//ajax call for gifs
	$.ajax({
		url: queryURL,
		method: 'GET'
	})
		.done(function(resopnse){
			//for testing and info gathering
			console.log(response);
			//array for objects returned by response
			var results = response.data;
			//iterates over each image object in response
			for (var i=0; i<results.length) {
				// builds img data source to display and control gif
				var imageDiv = $('<div>');
				var p = $("<p>").text("Rating: "+results[i].rating);
				var image = $("<img>");
			    image.attr("src", results[i].images.fixed_height.url);
			    image.attr("data-still", results[i].images.original_still.url);
			    image.attr("data-animate", results[i].images.original.url);
			    image.attr("data-state", "still");
			    image.addClass("image");
			    imageDiv.append(p);
			    imageDiv.append(image);
				$('#display').append(imageDiv);
			}
			$('.image')on('click', function(){
				
				//captures current state of image
				var state = $(this).attr("data-state");
		        //flips image animation on and off
	            if (state == 'still') {
	                $(this).attr("src", $(this).data('animate'));
	                $(this).attr('data-state', 'animate');
	            }
	            if (state == 'animate') {
	                $(this).attr("src", $(this).data('still'));
	                $(this).attr('data-still', 'still');
	            }
			})
		})
}


	// $('.animalImage').on('click', function(){
//           var state = $(this).attr("data-state");
//           if (state == 'still') {
//               $(this).attr("src", $(this).data('animate'));
//               $(this).attr('data-state', 'animate');
//           }
//           if (state == 'animate') {
//               $(this).attr("src", $(this).data('still'));
//               $(this).attr('data-still', 'still');
//           }
//    });