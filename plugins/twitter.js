
function random_twitter(id){
  console.log(id)
  setInterval(function(){
  $('.'+id+' ul li:first-child').fadeOut(0)
  .next('li').fadeIn(1000)
  .end().appendTo('.'+id+' ul');}, 4000);
}

function handleTweets(tweets){
    var x = tweets.length;
    var n = 0;
    var element = document.getElementsByClassName('textTweet');
    var html = '<ul id="lista_tweets">';
    var contador = 1;
    while(n < x) {
    if(parseInt(contador) === 1){var visible = 'inline'}else{var visible='none'}
      html += '<li style="display:'+visible+'">' + tweets[n] + '</li>';
      n++;
      contador++
    }
    html += '</ul>';
    $(".textTweet").html(html);
}

function tmp_otro(){
  var all_classes = "";
  var timer = undefined;
  $.each($('li', '.social-class'), function (index, element) {
    all_classes += " btn-" + $(element).data("code");
  });
  $('li', '.social-class').mouseenter(function () {
    var icon_name = $(this).data("code");
    if ($(this).data("icon")) {
      icon_name = $(this).data("icon");
    }
    var icon = "<i class='fa fa-" + icon_name + "'></i>";
    $('.btn-social', '.social-sizes').html(icon + "Sign in with " + $(this).data("name"));
    $('.btn-social-icon', '.social-sizes').html(icon);
    $('.btn', '.social-sizes').removeClass(all_classes);
    $('.btn', '.social-sizes').addClass("btn-" + $(this).data('code'));
  });
  $($('li', '.social-class')[Math.floor($('li', '.social-class').length * Math.random())]).mouseenter();
}