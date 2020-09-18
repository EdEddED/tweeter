/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('.new-tweet').submit(function (event) { //what happens when the form is submitted

    event.preventDefault();

    let data = $('form').serialize();
    let message = $('#tweet-text').val();
    let messageLength = message.length;
    const limit = 140; //allows us to change the limit without major refactoring

    if (messageLength > limit){ //checks to ensure the text is below the specified limit

      window.alert('Your message is too long. Shorten it and try again.');
      return;

    } else { //posts if at or under limit

      $.ajax({
        url:'/tweets',
        type: 'post',
        data: data
      })
      .then(setTimeout(loadTweets(), 1000));
      
      $('#tweet-text').val('')
      $('#counter').text(140);

    }
  })

  const loadTweets = function(){ //dynamically loads tweets into the #all-tweets container
    
    $('#all-tweets').empty();

    $.ajax('/tweets', {method: 'GET'})
    .then(function(tweets){
      renderTweets(tweets);
    })
  }

  loadTweets();
  
})

const escape = function(str){ //escapes unsafe text from the specified string

  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;

}

const createTweetElement = function(tweet){ //formats an individual tweet to the layout expected by the HTML and CSS

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

const renderTweets = function(tweets){ //actually adds the tweets to the container, once formatted

  for (tweet of tweets){
    $('#all-tweets').prepend(createTweetElement(tweet));
  }

}