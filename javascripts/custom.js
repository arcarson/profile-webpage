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


<script>
    $(function(){
        $('#id').mvalidate();
    });
    
    </script>
    
    <span class="error_message">test</span>
    CssClass="required validate_email validate_url validate_number minlength_12"
    
    
(function (a) { function d(a) { var b = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; return b.test(a) } function c(a) { return !isNaN(parseFloat(a)) && isFinite(a) } function b(a) { var b = /^.+@.+\..{2,3}$/; return b.test(a) } a.fn.mvalidate = function (e) { function h(e) { e.each(function (e) { var h = a(this).val(); var i = a(this).attr("name"); f.find("#input_" + i).remove(); var j = []; if (a(this).attr("type") == "checkbox") { if (a(this).is(":checked")) { h = 1 } else { h = "" } } if (h == "" || h == " ") { j.push(0) } else { if (a(this).hasClass("validate_email")) { if (!b(h)) { j.push(1) } } if (a(this).hasClass("confirmation")) { prev_index = f.find("." + g.validate_class).index(a(this)) - 1; prev_value = f.find("." + g.validate_class + ":eq(" + prev_index + ")").val(); if (h != prev_value) { j.push(2) } } if (a(this).hasClass("validate_number")) { if (!c(h)) { j.push(3) } } if (a(this).hasClass("validate_url")) { if (!d(h)) { j.push(4) } } if (a(this).attr("class").indexOf("minlength_") != -1) { var k = a(this).attr("class").split(" "); for (var e = 0; e < k.length; e++) { if (k[e].indexOf("minlength_") != -1) { var l = k[e].split("_"); var m = l[1] } } if (a(this).val().length < m) { j.push(5) } } } if (j.length == 0) { a(this).next("." + g.error_class).hide(); a(this).addClass(g.passed_validation_class); a(this).next("." + g.error_class).after("<span class='validation' id='input_" + i + "'>ok</span>") } else { a(this).next("." + g.error_class).show(); a(this).removeClass(g.passed_validation_class) } }) } var f = a(this); a.fn.mvalidate.defaults = { events: "blur keyup click", validate_class: "required", error_class: "error_message", passed_validation_class: "passed_validation", submit_class: "submit_button" }; var g = a.extend({}, a.fn.mvalidate.defaults, e); f.find("." + g.validate_class).bind(g.events, function () { $field = a(this); h($field) }); f.find("." + g.submit_class).click(function () { $fields = f.find("." + g.validate_class); h($fields); if (f.find("." + g.error_class + ":visible").length != 0) { return false } else { return true } }) } })(jQuery);
    
    
    
    