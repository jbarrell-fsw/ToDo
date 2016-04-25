var toDoObjects = 
[
    {
        "name": "shopping",
        "toDos": ["Get Groceries"]
    },

    {
        "name": "chores",
        "toDos": ["Get Groceries", "Take Gracie to the park"]
    },

    {
        "name": "writing",
        "toDos": ["Make up some new toDos", "Finish writing this book"]
    },

    {
        "name": "work",
        "toDos": ["Make up some new toDos", "Prep for Monday's class",
                    "Answer emails", "Finish writing this book!"]
    },

    {
        "name": "teaching",
        "toDos": ["Prep for Monday's class"]
    },

    {
        "name": "pets",
        "toDos": ["Take Gracie to the park"]
    }
];

var organizeByTags = function (toDoObjects){
	//Create an array of tags
	var tags = [];

	//Iterate over toDos
	toDoObjects.forEach(function (toDo) {
		toDo.tags.forEach(function (tag) {
			//check if tag exists in the array
			if(tags.indexOf(tag) === -1){
				tags.push(tag);
			}
		});
	});

    var tagObjects = tags.map(function (tag) {
        //Find all todo objects with the tag
        var toDosWithTag = [];
        toDoObjects.forEach(function (toDo) {
            //Check the index of
            if(toDo.tags.indexOf(tag) !== -1) {
                toDosWithTag.push(toDo.description);
            }
        });

        //Return the map
        return { "name" : tag, "toDos" : toDosWithTag };
    });
    console.log(tagObjects);
};

var main = function () {
	"use strict";

	var organizeByTags = function () {
		console.log("organizeByTags called");
	}

	organizeByTags(toDoObjects);
};

$(document).ready(main);