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
    
    // JSON CONTENT LOADER
    
    $.getJSON("projects.json", function(data) {
        var navArr = [];
        // var contentToLoad = $.cookie('project');
        var contentToLoad = 'Recipe Wall App'
        loadContent(contentToLoad);

        function loadContent(contentToLoad) {          
          $.each(data, function(index, item) {
            // load portfolio page content            
            if( window.location.href.indexOf('portfolio') > 0 ) {
              navArr.push(item.name);
              if (item.name == contentToLoad) {
                $('#project-text h1').append(item.name);
                if(item.githubURL != '') {
                  $('#project-text').append('<a href="'+ item.githubURL +'" class="github-button" target="_blank"><span></span>View the code on Github</a>');
                }
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
                }
                var images = item.imgPath.split(',');
                if(images.length > 1) {
                  $('#project-screenshot').append('<ul></ul><a href="#" class="next"></a><a href="#" class="last"></a>');
                  $.each(images, function(index, image) {
                    $('#project-screenshot ul').append('<li><img src="./img/project-screenshot-'+ image +'.jpg" alt="'+ item.name +' website screenshot" /></li>');
                  });
                  imageSlider();
                } else {
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
          $('#project-text a, #project-text p, #skills, #project-screenshot > *').remove();
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

// CUSTOM IMAGE SLIDER

function imageSlider() {  
  var viewer = $('#project-screenshot');
  viewer.children('ul').wrapAll('<div id="viewer-window" />');
  var slideList = $('#viewer-window > ul');
  var slides = $('#viewer-window > ul > li');
  var slideWidth = slides.outerWidth();
  var maxSlideHeight = Math.max.apply(null, slides.map(function () {
      return $(this).height();
  }).get());
  
  var selectedSlide = $.cookie('selectedSlide');
  slideList.css({'width' : slideWidth, 'height' : maxSlideHeight});
  slides.find('h2:contains(' + selectedSlide + ')').parent().parent().addClass('current-slide');
  if (slides.filter('.current-slide').length == 0) { slides.filter(':first').addClass('current-slide')};
  slides.filter('.current-slide').next().length == 0 ? slides.filter(':first').addClass('next-slide') : slides.filter('.current-slide').next().addClass('next-slide');
  slides.filter('.current-slide').prev().length == 0 ? slides.filter(':last').addClass('last-slide') : slides.filter('.current-slide').prev().addClass('last-slide');

  // nav click functions
  viewer.children('a').on('click', function() {
  var activeSlides = slides.filter('.current-slide, .next-slide, .last-slide');
  var currentSlide = slides.filter('.current-slide');
  var nextSlide = currentSlide.next().length == 0 ? slides.filter(':first') : currentSlide.next();
  var lastSlide = currentSlide.prev().length == 0 ? slides.filter(':last') : currentSlide.prev();

  if ($(this).hasClass('last')) {
      activeSlides.animate({left: '+=' + slideWidth }, function() {
        currentSlide.removeClass('current-slide').addClass('next-slide');
        lastSlide.removeClass('last-slide').addClass('current-slide');
        nextSlide.removeClass('next-slide');
        lastSlide.prev().length == 0 ? slides.filter(':last').addClass('last-slide') : lastSlide.prev().addClass('last-slide');
      });
    } else {
      $('.current-slide, .next-slide, .last-slide').animate({left: '-=' + slideWidth }, function() {
        currentSlide.removeClass('current-slide').addClass('last-slide');
        nextSlide.removeClass('next-slide').addClass('current-slide');
        lastSlide.removeClass('last-slide');
        nextSlide.next().length == 0 ? slides.filter(':first').addClass('next-slide') : nextSlide.next().addClass('next-slide');
      });
    }
    slides.filter(':not(.current-slide, .next-slide, .last-slide)').css({left: ''});
    return false;
  });
  
};




