$(function(){

  $('#tweet-text').keyup( function(){ //keeps track of the input length typed into the form. Ideally would've used the form element and .change as the event.

    let tweet = this.value;
    let tweetLength = tweet.length;
    let counter = $($(this).siblings()).children('#counter');
    const limit = 140; //allows us to change the limit without major refactoring

    $(counter).text( limit - tweetLength ); //sets current count on the fly.

    if ( tweetLength > limit ){ //sets and removes CSS classes as appropriate and as needed.

      if ($(counter).hasClass('underLimit')) { $(counter).removeClass('underLimit') };
      $(counter).addClass('overLimit');
      
    } else {

      if ($(counter).hasClass('overLimit')) { $(counter).removeClass('overLimit') };
      $(counter).addClass('underLimit');

    }

  });
});