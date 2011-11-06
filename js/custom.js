$(document).ready(function() {
  
  $(".selected").hover(
  function() {
  $(this).stop().animate({"opacity": "1"}, "slow");
  },
  function() {
  $(this).stop().animate({"opacity": "0"}, "normal");
  });
  

  
  // $('.content-tab').hide();
  // 
  // $('.nav-link a').click(function() {
  //   if ($('.content-tab').filter(this.hash).is(':visible')){
  //     
  //   }
  //   else {
  //     $('.content-tab').slideUp();
  //   }
  //       
  //   $('.content-tab').filter(this.hash).slideDown();
  //   return false;
  // });
   
   
   $('#work').toggle(function() {
     $('.column-1').animate({ right: '+=930'}, 1000, "swing");
     $('.column-2').animate({ right: '+=1430'}, 1000, "swing");
     $('.column-3').animate({ right: '+=1980'}, 1000, "swing");
   },
   function() {
     $('.column-1').animate({ right: '-=930'}, 1000, "swing");
     $('.column-2').animate({ right: '-=1430'}, 1000, "swing");
     $('.column-3').animate({ right: '-=1980'}, 1000, "swing");
   });
   
    
});