$(document).ready(function() {
  
  $(".selected").hover(
  function() {
    $(this).stop().animate({"opacity": "1"}, "slow")
  },
  function() {
    $(this).stop().animate({"opacity": "0"}, "normal")
  });
  
  
  $('#contact :first-child a').toggle(
    function() {
     $('#mobile-window p').animate({ left: '+=98'})
     return false
    },
    function() {
      $('#mobile-window p').animate({ left: '-=98'})
      return false
    });
   
  $('#main-content .project-tab').hover(
    function() {
      $(this).stop().animate({ backgroundColor: '#00b0d4'})
      $(this).children('h2').stop().animate({color: '#fff'})
      $(this).children('img').stop().animate({borderColor: '#23a1bb'})
    }, 
    function() {
      $(this).stop().animate({ backgroundColor: '#f2f2f2'})
      $(this).children('h2').stop().animate({color: '#00b0d4'})
      $(this).children('img').stop().animate({borderColor: '#bbbbbb'})
    });
    
    // $('#project-content .project-screenshot a').hover(
    // function() {
    //   $(this).parent().animate({borderColor: '#00b0d4'})
    // },
    // function() {
    //   $(this).parent().animate({borderColor: '#aeaeae'})
    // });
    
});