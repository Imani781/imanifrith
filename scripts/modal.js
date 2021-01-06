$(document).ready(function() {
  // MODAL
  var modalText = {
    m3: {
      title: 'Small Projects',
      tag: 'Student Portfolio',
      detail:
        'A portfolio of student projects hosted on Github.',
      link: 'https://github.com/imani888'
    },
    tindog: {
      title: 'M3 Media Masters Site',
      tag: 'A startup creative agency.',
      detail:
        'A small startup creative agency; specializing in marketing, branding and website design for small buisnesses.',
      link: 'https://m3mediamasters.com'
    },
    procurement: {
      title: 'Procurement Funding',
      tag: 'Covid-19 Emergency Funding Services.',
      detail:
        'A lawyer and an accountant teamed up to help those affected by the recent pandemic access the emergency funds they need. I helped their clients access them quickly and easily.',
      link: 'http://procurementfunding.net/'
    },
    giannetti: {
      title: 'Giannetti and Associates ',
      tag: 'Forensic Accountant.',
      detail:
        'A successful forensic accounting firm thats been in buisness over 20 years was in need of a virtual facelift. I was able to modernize their website and streamline their processes for new client onboarding.',
      link: 'http://giannettifirm.com'
    },
    logos: {
      title: 'Branding is Vital',
      tag: 'Logos, graphics, visuals.',
      detail:
        'A collection of different logos and graphics I have crafted for clients over time.'
    },
    // powur: {
    //   title: 'Web design projects',
    //   tag: 'Design is crucial in everything .',
    //   detail:
    //     'A couple of web design projects that havent deployed yet.',
    //   link: 'http://www.powur.com/with/42'
    // },
    webdesign: {
      title: 'Web design projects',
      tag: 'Good design makes all the difference.',
      detail:
        'A couple of web design projects that havent deployed yet'
    },
    // never: {
    //   title: 'NeverSurrender',
    //   tag: 'ALS AWARENESS.',
    //   detail:
    //     'NeverSurrender is a platform for the new ALS foundation mobile app in hopes to raise awareness and research funding to fight ALS. Pure JavaScript marketing site to promote the new ALS NeverSurrender app.'
    // },
    // themall: {
    //   title: 'The Mall',
    //   tag: 'PEER GUIDED SHOPPING.',
    //   detail:
    //     'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.'
    // }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});
