/* Author:

*/

$(function() {
    
    // HOMEPAGE ICON ANIMATION
    
    $('aside ul li').hover(function() {
      $(this).stop().animate({'width': '293'}, 'fast')
    },function() {
      $(this).stop().animate({'width': '56'}, 'fast')
    });
   
   // HOMEPAGE PROJECTS LINK ANIMATION
   
    $('.work-anchor').click(function() {
       $.scrollTo((this.hash), {duration: 750, offset: {top: 2} });
       return false;
     });
    
    // CUSTOM IMAGE SLIDER
    
    var slideWidth = $('.slide').outerWidth();
    
    $('.slider-nav a').on('click', function() {
      
      var currentSlide = $('.slider-list li.current-slide');

      if ($('.slider-list li.current-slide').next().length == 0) {
        var nextSlide = $('.slider-list li:first');
      } else {
        var nextSlide = $('.slider-list li.current-slide').next();
      }

      if ($('.slider-list li.current-slide').prev().length == 0) {
        var lastSlide = $('.slider-list li:last');
      } else {
        var lastSlide = $('.slider-list li.current-slide').prev();
      }
      
      if ($(this).hasClass('last')) {
        $('.current-slide, .next-slide, .last-slide').animate({left: '+=' + slideWidth }, function() {
          currentSlide.removeClass('current-slide').addClass('next-slide');
          lastSlide.removeClass('last-slide').addClass('current-slide');
          nextSlide.removeClass('next-slide');
          if (lastSlide.prev().length == 0) {
             $('.slider-list li:last').addClass('last-slide');
          } else {
             lastSlide.prev().addClass('last-slide');
          }        
        });
      } else {
        $('.current-slide, .next-slide, .last-slide').animate({left: '-=' + slideWidth }, function() {
          currentSlide.removeClass('current-slide').addClass('last-slide');
          nextSlide.removeClass('next-slide').addClass('current-slide');
          lastSlide.removeClass('last-slide');
          if (nextSlide.next().length == 0) {
            $('.slider-list li:first').addClass('next-slide');
          } else {
            nextSlide.next().addClass('next-slide');
          }
        });
      }
      $('.slide:not(.current-slide, .next-slide, .last-slide)').css({left: ''});
      return false;
    });
    
    // JSON CONTENT LOADER
    
    $.getJSON("projects.json", function(data) {
        var navArr = [];
        var contentToLoad = $.cookie('project');        
        loadContent(contentToLoad);

        function loadContent(contentToLoad) {          
          $.each(data, function(index, item) {
            // load portfolio page content            
            if( window.location.href.indexOf('portfolio') > 0 ) {
              navArr.push(item.name);
              if (item.name == contentToLoad) {
                $('#project-text h1').append(item.name);
                if(item.websiteURL != '') {
                  $('#project-text').append('<a href="'+ item.websiteURL +'" target="_blank">Visit the website</a>');
                }
                if(item.projectDescription != '') {
                  $('#project-text').append('<p>'+ item.projectDescription +'</p>');
                }
                if(item.skills != '') {
                  var skills = item.skills.split(',');
                  $('#project-text').append('<section id="skills"></section>')              
                  $.each(skills, function(index, value) {
                    $("#skills").append('<p>' + value + '</p>');
                  });
                  $('#project-screenshot').append('<img src="./img/project-screenshot-'+ item.imgPath +'.jpg" alt="'+ item.name +' website screenshot" />')
                }
              }
            } else {
              // load index page content
              var name = item.abbrName != "" ? item.abbrName + '<span>' + item.name + '</span>' : item.name;
              $('#portfolio').append('<a href="portfolio.html" class="project-tab"><img src="./img/project-thumbnail-'+ item.imgPath +'.jpg" alt="'+ item.name +' thumbnail" /><h3>'+ name +'</h3><p>'+ item.projectCaption +'</p></a>')
            }
          });
          
          // remove right margin on project tabs
          $('#portfolio > a:nth-child(3n+4)').css({'marginRight' : '0'});
          
          // portfolio page project navigation
          var thisPage = navArr.indexOf($('#project-text h1').html());
          var previousPage = navArr[thisPage - 1] == undefined ? navArr[navArr.length - 1] : navArr[thisPage - 1];
          var nextPage = navArr[thisPage + 1] == undefined ? navArr[0] : navArr[thisPage + 1];
          $('#project-nav .next-project').attr('title', nextPage);
          $('#project-nav .previous-project').attr('title', previousPage);
        }
          
        $('#project-nav .next-project, #project-nav .previous-project').on('click', function() {          
          var navArr = [];            
          var contentToLoad = $(this).attr('title');
          $('#project-text h1').html('');
          $('#project-text a, #project-text p, #skills, #project-screenshot img').remove();
          loadContent(contentToLoad);
        });
        // HOMEPAGE PROJECT TAB HOVER
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
        
        // SET COOKIE ON PROJECT TAB CLICK
        $('#portfolio > a').live('click', function() {
           var projectName = $(this).find('span').text().length > 0 ? $(this).find('span').text() : $(this).find('h3').text();
           $.cookie('project', projectName);
        });
    });
});




