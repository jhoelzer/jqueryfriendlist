// ajax
var $friends = $('#friends');
// friends variable
var $name = $('#name');
// friend name variable
var $age = $('#age');
// friend age variable
// names the variables; $ in front unnecessary for var name (it just ids it as jQuery); jQuery object

var friendTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<button id='{{id}}' class='remove'>Remove</button>" +
	"</li>";
	//Mustache template
	//this is used below for the mustache {{}}/friend function to display the info
	//runs every time you add a friend

function addFriend(friend) {
	$friends.append(Mustache.render(friendTemplate, friend));
};
//mustache = class that allows you to do editing
//whatever info made it through the template goes through this
// takes this and replace the {{name}} with whatever was typed in

$(document).ready(function() {
	// says for when the document is ready
	$.ajax ({
		type: 'GET',
		// ajax request for data
		url: 'http://rest.learncode.academy/api/learncode/friends',
		// site the program is requesting data from
		success: function(friends) {
			$.each(friends, function(i, friend) {
				addFriend(friend);
				// if the request for data is successful, runs function to display list
				// success means it did go through and returned, but done means it went through even if not errored ;
					// better to use done because it can run but not finish
				// when the request is finished, it adds all the friends
				// the i is the index location in the array; it could be w/e like an _

			});
		},
		error: function() {
			alert('error loading friends');
			// if the request fails/has an error, sends alert to let you know
		}
	});
	$('#add-friend').on('click', function() {
		//could do just '.click'
		//on the click, do the function; makes a friend object
		var friend = {
			name: $name.val(),
			//object:value
			// name data
			age: $age.val(),
			//age data
			// function that lets you add friend data
		};
		//create new object
		$.ajax({
			//submit ajax request to post the url
			type: 'POST',
			// don't need the '/' because it doesn't have anything after/no id
			url: 'http://rest.learncode.academy/api/learncode/friends',
			// site with api data
			// for this object friend from the click event since still inside the quick event, pass to the url above
			data: friend,
			success: function(newFriend) {
				addFriend(newFriend);
				// if data request successful, it means you revieved the requested data adds new friend to list
			},
			error: function() {
				alert('error saving order');
				// if data request fails/has an error, sends alert to let you know
			}
		});
	});
	//end click event
	//.delegate allows you to remove items that were loaded by other students; works for things you haven't even added yet; you decide
	//  how many friends you will have
	$friends.delegate('.remove', 'click', function() {
		//delegate ays that for every object with the remove class, for the click event, do the function; document delegate could 
		//  have worked, but the $friends is just the name and number
		var $li = $(this).closest('li');
		//closest list item in w/e you clicked, get it and pass it to var to use it; the li is for us to know, except the 'li' is needed 
		//looks for the nearest list item when you click
		//the 'this' references above
		//AJAX delete function: click the .remove class button and the is identifies what to delete
		$.ajax({
			type: 'DELETE',
			//asks ajax to delete
			url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
			// site with api data and button information
			success: function() {
				//this is a diff because it's in a diff function; its a keyword that changes
				//this is relative to w/e (whatever) it's contained in
				$li.fadeOut(300, function() {
					$(this).remove();
					// if successul, function that fades out and removes a friend's data from the list
				});
			}
		});
	});
});

//back to top button
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});

// you can practice on your own server (no one else can edit) by changing the url
		// ex: http://rest.learncode.academy/api/learncode/friends/ ---->
			//	http://rest.learncode.academy/api/learncode/jenfriends/