/* This code was written by Corey Johnson
referenced from Learning Web App Development by Semmy Purewal
*/

var main = function(){
	"use strict";

	//Tab content
	var toDos = [
		"Finish writing this book",
		"Take Gracie to the park",
		"Answer emails",
		"Prep for Monday's class",
		"Make up some new toDos",
		"Get Groceries"
	];

	$(".tabs a span").toArray().forEach(function (element) {
		var $element = $(element);

		//Create a click handeler
		$(element).on("click", function(){

			var $content,
				$input,
				$button,
				i;

			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();


			//First tab
			if($element.parent().is(":nth-child(1)")){
				$content = $("<ul>");
				for(i = toDos.length-1; i>= 0; i--){
					$content.append($("<li id='" + i + "'>").text(toDos[i]));
					$content.append($("<button id='" + i + "'>").text("-"));
				}
			}
			//Second tab
			else if($element.parent().is(":nth-child(2)")){
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			}
			//Third tab
			else if($element.parent().is(":nth-child(3)")){
				$input = $("<input>"),
				$button = $("<button>").text("+");

				$button.on("click", function(){
					if($input.val() !== ""){
						toDos.push($input.val());
						$input.val("");
					}
				});

				$content = $("<div>").append($input).append($button);
			}

			$("main .content").append($content);

			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);