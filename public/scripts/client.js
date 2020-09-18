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
    })
    .then(setTimeout(loadTweets(), 500));
  })

  const loadTweets = function(){
    
    $('#all-tweets').empty();

    $.ajax("/tweets", {method: "GET"})
    .then(function(tweets){
      renderTweets(tweets);
    })
  }

  loadTweets();
})

const escape = function(str){
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet){
  //let tweet = $(`<article class = "tweet"> Hello World! </article>`);

  let data = $(`
    <article class="tweet">
      <header>
        <span>
        <img src="${escape(tweet.user.avatars)}">
        <p>${escape(tweet.user.name)}</p>
        </span>
        <p class="handle">${escape(tweet.user.handle)}</p>
      </header>
      <p class="bold">${escape(tweet.content.text)}</p>
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
  // console.log("renderTweets called...");
  for (tweet of tweets){
    $('#all-tweets').prepend(createTweetElement(tweet));
  }
}