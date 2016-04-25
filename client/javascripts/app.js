var main = function (toDoObjects) {
    "use strict";

    var toDos = toDoObjects.map(function (toDo) {
        //Return the description
        return toDo.description;
    });

    $(".tabs a span").toArray().forEach(function (element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function () {
            var $content,
                $input,
                $button,
                i;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length-1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")){
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
                    return { "name": tag, "toDos": toDosWithTag };
                });

                tagObjects.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");

                    tag.toDos.forEach(function (description){
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });

                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });

            } else if ($element.parent().is(":nth-child(4)")) {
                // input a new to-do
                var $input = $("<input>").addClass("description"),
                $inputLabel = $("<p>").text("Description: "),
                $tagInput = $("<input>").addClass("tags"),
                $tagLabel = $("<p>").text("Tags: "),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),

                    tags = $tagInput.val().split(","), //Split by commas

                    newToDo = {"description":description, "tags":tags};
                    
                    //Post
                    $.post("todos", newToDo, function (result) {
                        console.log(result);

                        //toDoObjects.push(newToDo);
                    });

                    toDoObjects.push(newToDo);
                    
                    //Update ToDos
                    toDos = toDoObjects.map(function (toDo) {
                        return toDo.description;
                    });

                    //Reset fields
                    $input.val("");
                    $tagInput.val("");
                });

                $content = $("<div>").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
               /* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */
            }

            $("main .content").append($content);

            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        //Call main with the to-dos as an argument
        main(toDoObjects);
    });
});
