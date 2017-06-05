var gifs = [ "rick james", "ron burgundy", "kenny powers" ];

    function displayGifInfo() {
      var person = $(this).attr("data-person");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    }

    function renderButtons() {

      $("#buttons-view").empty();

      for (var i = 0; i < gifs.length; i++) {

        var a = $("<button>")

        a.addClass("gif");

        a.attr("data-person", gifs[i]);

        a.text(gifs[i]);

        $("#buttons-view").append(a);
      }
    }


    $("#add-gif").on("click", function(event) {
      event.preventDefault();

      var gif = $("#gif-input").val().trim();

      gifs.push(gif);

      renderButtons();

    });

    $(document).on("click", ".gif", displayGifInfo);

    renderButtons();