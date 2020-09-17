/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(".new-tweet").submit(function (event) {
    console.log("new-tweet.submit called...");
    event.preventDefault();

    let data = $("form").serialize();
    // console.log(data);

    // $.post("/tweets", data, function(){
    //   console.log("Post Sucessful!");
    // })

    $.ajax({
      url:"/tweets",
      type: "post",
      data: data
    });



  })
  renderTweets(tempTweets);
})

const tempTweets = [
  {
    "user":{
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content":{
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user":{
      "name": "Meta Knight",
      "avatars": "images/meta-knight.jpg",
      "handle": "@ThatBlueGuy"
    },
    "content":{
      "text": "No, I have no relation to that pink puff. Thanks for asking."
    },
    "created_at": 1461116232227
  }
]

const createTweetElement = function(tweet){
  //let tweet = $(`<article class = "tweet"> Hello World! </article>`);

  let data = $(`
    <article class="tweet">
      <header>
        <span>
        <img src="${tweet.user.avatars}">
        <p>${tweet.user.name}</p>
        </span>
        <p class="handle">${tweet.user.handle}</p>
      </header>
      <p class="bold">${tweet.content.text}</p>
      <footer>
        <p class="bold">${"10 days ago"}</p>
        <span>
          <img src="images/flag.png">
          <img src="images/repeat.png">
          <img src="images/heart.png">
        </span>
      </footer>
    </article>`);
  return data;
}

const renderTweets = function(tweets){
  console.log("renderTweets called...");
  
  $('#all-tweets').empty();
  for (tweet of tweets){
    $('#all-tweets').append(createTweetElement(tweet));
  }
}