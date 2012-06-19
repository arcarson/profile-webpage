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
    
    // JSON CONTENT LOADER - while I admit it's never really best practice to load the main content of a page through ajax for a number of reasons, I've taken this as more of an opportunity to demonstrate proficiency in this area.
    
    $.getJSON("projects.json", function(data) {
        // set array to hold project names for next/prev navigation
        var navArr = [];
        // get content from cookie and set as variable
        var contentToLoad = $.cookie('project');
        // run function to load content from json feed
        loadContent(contentToLoad);

        function loadContent(contentToLoad) {          
          $.each(data, function(index, item) {
            // load content specific to portfolio page from feed
            if( window.location.href.indexOf('portfolio') > 0 ) {
              // push each item name to the navigation array
              navArr.push(item.name);
              // find specific project in json feed and populate page
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
                // "skills" are set as comma separated string in json feed - if "skills" are present split into array and loop through each
                if(item.skills != '') {
                  var skills = item.skills.split(',');
                  $('#project-text').append('<section id="skills"></section>')              
                  $.each(skills, function(index, value) {
                    $("#skills").append('<p>' + value + '</p>');
                  });                
                }
                // image paths for project screenshots are set as comma separated string in json feed - split into array
                var images = item.imgPath.split(',');
                // if there is more than one image set up for and load image rotator
                if(images.length > 1) {
                  // insert <ul> tags for images and rotator navigation
                  $('#project-screenshot').append('<ul></ul><a href="#" class="next"></a><a href="#" class="last"></a>');                  
                  $.each(images, function(index, image) {
                    $('#project-screenshot ul').append('<li><img src="./img/project-screenshot-'+ image +'.jpg" alt="'+ item.name +' website screenshot" /></li>');
                    // when loading the last image in the array wait until the last image has loaded then initiate image rotator function
                    if ((index + 1) == images.length) {
                      $('#project-screenshot img:last').load(function() {
                        imageSlider();
                      });
                    };
                  });
                } else {
                  // if only one image for project - populate as static image
                  $('#project-screenshot').append('<img src="./img/project-screenshot-'+ item.imgPath +'.jpg" alt="'+ item.name +' website screenshot" />')
                }
              }
            } else {
              // load index page content
              var thumbPath = item.imgPath.split(',')[0];
              var name = item.abbrName != "" ? item.abbrName + '<span>' + item.name + '</span>' : item.name;
              $('#portfolio').append('<a href="portfolio.html" class="project-tab"><img src="./img/project-thumbnail-'+ thumbPath +'.jpg" alt="'+ item.name +' thumbnail" /><h3>'+ name +'</h3><p>'+ item.projectCaption +'</p></a>')
            }
          });
          
          // PORTFOLIO PAGE PREV/NEXT NAVIGATION
          // find the current page in the navigation array
          var thisPage = navArr.indexOf($('#project-text h1').html());
          // find the previous and next values in the array relative to "thisPage" - if value is undefined due to being at the end/start of the array loop back to the opposite end on array to find value
          var previousPage = navArr[thisPage - 1] == undefined ? navArr[navArr.length - 1] : navArr[thisPage - 1];
          var nextPage = navArr[thisPage + 1] == undefined ? navArr[0] : navArr[thisPage + 1];
          // attach values to links through title attr
          $('#project-nav .next-project').attr('title', nextPage);
          $('#project-nav .previous-project').attr('title', previousPage);
        }
          
        $('#project-nav .next-project, #project-nav .previous-project').on('click', function() {
          // clear out navigation array
          var navArr = [];
          // set next project content to load from link
          var contentToLoad = $(this).attr('title');
          // clear out current project
          $('#project-text h1').html('');
          $('#project-text a, #project-text p, #skills, #project-screenshot > *').remove();
          // run function to load new project
          loadContent(contentToLoad);
        });
        
        // INDEX PAGE FUNCTIONS
        // project tab hover
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
        
        // remove right margin on project tabs
        $('#portfolio > a:nth-child(3n+4)').css({'marginRight' : '0'});
        
        // set cookie on project tab "click"
        $('#portfolio > a').live('click', function() {
           var projectName = $(this).find('span').text().length > 0 ? $(this).find('span').text() : $(this).find('h3').text();
           $.cookie('project', projectName);
        });
    });
});

// CUSTOM IMAGE SLIDER

function imageSlider() {
  // define what to attach the rotator to
  var viewer = $('#project-screenshot');
  // set some variables for later use
  viewer.children('ul').wrapAll('<div id="viewer-window" />');
  var slideList = $('#viewer-window > ul');
  var slides = $('#viewer-window > ul > li');
  var slideWidth = slides.outerWidth();
  var maxSlideHeight = Math.max.apply(null, slides.map(function () {
      return $(this).height();
  }).get());
  // set the width and max height of the rotator from tallest image
  slideList.css({'width' : slideWidth, 'height' : maxSlideHeight});
  // set a starting point from a cookie
  var selectedSlide = $.cookie('selectedSlide');
  slides.find('h2:contains(' + selectedSlide + ')').parent().parent().addClass('current-slide');
  // if no slide has a class of "current-slide" add the class to the first slide
  if (slides.filter('.current-slide').length == 0) { slides.filter(':first').addClass('current-slide')};
  // set classes of "next-slide" and "last-slide" relative to "current-slide"
  slides.filter('.current-slide').next().length == 0 ? slides.filter(':first').addClass('next-slide') : slides.filter('.current-slide').next().addClass('next-slide');
  slides.filter('.current-slide').prev().length == 0 ? slides.filter(':last').addClass('last-slide') : slides.filter('.current-slide').prev().addClass('last-slide');

  // nav click functions
  viewer.children('a').on('click', function() {
    // set some variables
    var activeSlides = slides.filter('.current-slide, .next-slide, .last-slide');
    var currentSlide = slides.filter('.current-slide');
    var nextSlide = currentSlide.next().length == 0 ? slides.filter(':first') : currentSlide.next();
    var lastSlide = currentSlide.prev().length == 0 ? slides.filter(':last') : currentSlide.prev();
    // functions for if last button is clicked
    if ($(this).hasClass('last')) {
        activeSlides.not(':animated').animate({left: '+=' + slideWidth }, function() {
          currentSlide.removeClass('current-slide').addClass('next-slide');
          lastSlide.removeClass('last-slide').addClass('current-slide');
          nextSlide.removeClass('next-slide');
          lastSlide.prev().length == 0 ? slides.filter(':last').addClass('last-slide') : lastSlide.prev().addClass('last-slide');
        });
      // functions for if next button is clicked
      } else {
        activeSlides.not(':animated').animate({left: '-=' + slideWidth }, function() {
          currentSlide.removeClass('current-slide').addClass('last-slide');
          nextSlide.removeClass('next-slide').addClass('current-slide');
          lastSlide.removeClass('last-slide');
          nextSlide.next().length == 0 ? slides.filter(':first').addClass('next-slide') : nextSlide.next().addClass('next-slide');
        });
      }
    // clear out dynamic css added for animation
    slides.filter(':not(.current-slide, .next-slide, .last-slide)').css({left: ''});
    return false;
  });  
};




