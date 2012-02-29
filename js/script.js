/* Author:

*/

$(function() {
  
  $('aside ul li').hover(function() {
    $(this).stop().animate({'width': '293'}, 'fast')
  },function() {
    $(this).stop().animate({'width': '56'}, 'fast')
  });
   
  $('#portfolio .project-tab').hover(
    function() {
      $(this).stop().animate({ backgroundColor: '#00b0d4'})
      $(this).children('h3').stop().animate({color: '#fff'})
      $(this).children('img').stop().animate({borderColor: '#23a1bb'})
    }, 
    function() {
      $(this).stop().animate({ backgroundColor: '#f2f2f2'})
      $(this).children('h3').stop().animate({color: '#00b0d4'})
      $(this).children('img').stop().animate({borderColor: '#bbbbbb'})
    });
    
    
});




