/* 
 * @Author Phil Kershaw
 * @Date  21/09/2011
 * 
 * Queries twitter for the latest X tweets and displays them in a ticker type effect
 */

$(document).ready(function(){
    // twitter api's base url
    var username = "[twitter_username]";
    var url      = "https://api.twitter.com/1/statuses/user_timeline/"+username+".json?count=5&callback=?&trim_user=t";

    $.getJSON(url, function(json){
      $(".tweet").append('<ul></ul>');
      $(json).each(function(i, tweet){
        $(".tweet ul").append('<li><a href=\"http://twitter.com/#!/DialSure\">'+tweet.text+'</a></li>');
      });
      var opts = {
        el: '.tweet',
        items: new Array(),
        count: 0,
        total: -1,
        delay: 6000,
        animate: true
      };

      $(opts.el+' li').each(function(i) {
        opts.items[i] = $(this).html();
        opts.total++;
      }).hide();

      runTweeter();

      function runTweeter() {
        if(opts.animate == true) {
          if($(opts.el+' li').length > 0) {
            $(opts.el+' li').fadeOut(500, function() {
              $(this).parent(0).empty().append('<li style="display: none;">'+opts.items[opts.count]+'</li>').children('li').fadeIn(500);
            });
          } else {
            $(opts.el).empty().append('<li style="display: none;">'+opts.items[opts.count]+'</li>').children('li').fadeIn(750);
          }
        } else {
          $(opts.el).empty().append('<li>'+opts.items[opts.count]+'</li>');
        }
        setTimeout(function() {
          if(opts.count == opts.total) {
            opts.count = 0;
          } else {
            opts.count++;
          }
          runTweeter();
        }, opts.delay);
      }
    });
});


