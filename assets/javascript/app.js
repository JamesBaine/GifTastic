var gifs = ["rick ross", "migos", "tyler the creator", "dj khaled", "future","lil yachty", "plies", "travis scott", "desiigner", "lil wayne", "quavo" ];

    function displayGifInfo() {
      $('#gif-input').text('');
      var person = $(this).attr("data-person");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
      $("#gif-view").empty();


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

            var gifImage = $("<img>");

            var gifStill = results[i].images.fixed_height_still.url; 

            var gifAnimate = results[i].images.fixed_height.url;

            gifImage.addClass("gifToggle");

            gifImage.attr("data-still", gifStill);
            gifImage.attr("data-animate", gifAnimate);
            gifImage.attr("data-state", "still");
            gifImage.attr("src", gifStill);


            gifDiv.prepend(p);

            gifDiv.prepend(gifImage);

            $("#gif-view").prepend(gifDiv);
          }
        });
    }

    function gifStart() {
        var state = $(this).attr("data-state");

        if (state == "still"){
          $(this).attr("src", $(this).data("animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).data('still'));
          $(this).attr("data-state", "still");
        }
      }
    

    function renderButtons() {

      $("#buttons-view").empty();

      for (var i = 0; i < gifs.length; i++) {

        var a = $("<button>")

        a.attr("id","gif");

        a.addClass("btn btn-sm text-white mx-1 mb-1")

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

    $(document).on("click", "#gif", displayGifInfo);

    $(document).on("click", ".gifToggle", gifStart);
    
    



    renderButtons();