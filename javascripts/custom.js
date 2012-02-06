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

$(function () {
                setInterval(matchDetailsUpdate, 60000);
            });

            $('.refresh').click(matchUpdateRefresh);

            function matchUpdateRefresh(e) {
                e.preventDefault();
                e.stopPropagation();
                matchDetailsUpdate();
            };
            
            function matchDetailsUpdate() {

                $.ajax({
                    url: "http://nrlservice.local/NRLService.svc/GetMatchCentre?SecurityToken=VALIDTOKEN&WebsiteID=11",
                    dataType: 'jsonp',
                    pageCache: true,
                    success: function (json) {

                        $.each(json.Match, function (i, match) {

                            $('.gameTime').text(match.MatchTime);

                            $('.teamHome .score').text(match.HomeTeamScore);

                            $('.teamAway .score').text(match.AwayTeamScore);


                            $.each(match.AwayTryScorers, function (i, awaytryscorers) {
                                i.stopPropagation();
                                $('.teamAway ul').append('<li><strong>' + awaytryscorers.Player + '</strong><em>' + awaytryscorers.TryTime + '</em></li>');
                                
                            });
                            
                            $.each(match.HomeTryScorers, function (i, hometryscorers) {
                                i.stopPropagation();
                                $('.teamHome ul').append('<li><strong>' + hometryscorers.Player + '</strong><em>' + hometryscorers.TryTime + '</em></li>');

                            });
                            return false;
                        });
                    }
                });
            }
            
            // column heigh equalizer
            
    function heightAdjust() {

    var contentHeight = $(".mainColumn").height();
    var sideHeight = $(".secColWrapper").height();    

    if (contentHeight > sideHeight) {  
        $(".secColWrapper").css("height", contentHeight);
    }
}

@font-face {
  font-family: "Your typeface";
  src: url("type/filename.eot");
  src: local("☺"),
    url("type/filename.woff") format("woff"),
    url("type/filename.otf") format("opentype"),
    url("type/filename.svg#filename") format("svg");
  }
@font-face {
  font-family: "Your italic typeface";
  src: url("type/filename-ital.eot");
  src: local("☺"),
    url("type/filename-ital.woff") format("woff"),
    url("type/filename-ital.otf") format("opentype"),
    url("type/filename-ital.svg#filename-ital") format("svg");
  }
h2 { font-family: "Your typeface", Georgia, serif; }
h2 em { font-family: "Your italic typeface", Georgia, serif; }
em { font-style: italic; }