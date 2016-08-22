$(document).ready(function(){

  // Width Variables
  var BREAKPOINT_TABLET = 767;
  var BREAKPOINT_DESKTOP = 1025;

  // Height Variables
  var BREAKPOINT_SMALL_DESKTOP = 960;

  // Height Variables
  var BREAKPOINT_SMALLER_DESKTOP = 850;

  // Show sticky footer a few seconds after load
  setTimeout(function(){
    $('.stock-footer').css('opacity', 1);
  }, 501);

  // Accordion
  // ------------------------------------
  // -----UPDATED ACCORDION CODE---------
  // ------------------------------------
  $('.accordion-head').on('click', function() {
    var $this = $(this);
    var tab = $this.data('tab');
    var mobileDataTable = $('.accordian-wrapper[data-id=' + $this.data('tab') + ']');

    if ($this.hasClass('active')) {
      $(this).removeClass('active');
      $('.accordion-head[data-tab="' + tab + '"]').removeClass('active');
      $(tab).removeClass('active');

      if (mobileDataTable.length) {
        $(mobileDataTable).removeClass('active');
      }

      if ($('.tab-module').length > 0) {
        $('.tab-module-tab[data-tab="' + tab + '"]').removeClass('active');
      }

    } else {
      $this.addClass('active');
      $('.accordion-head[data-tab="' + tab + '"]').addClass('active');
      $(tab).addClass('active');

      if (mobileDataTable.length) {
        $(mobileDataTable).addClass('active');
      }

      if ($('.tab-module').length > 0) {
        $('.tab-module-tab[data-tab="' + tab + '"]').addClass('active');
      }
    }
  });

  // ------------------------------------
  // ------------------------------------

  // When switching from accordion to tabs make sure that only one tab is active
  function accordionToTab(){
  	$('.tab-module-container').each(function(index){
  		var $this = $(this);

  		// if there are multiple tabs open close all except the first active tab and if there are no tabs open make the first tab active
  		if ($this.find('.tab-module-pane.active').length > 0){
  			$this.find('.tab-module-tab.active').not(':first').removeClass('active');
  			$this.find('.tab-module-pane-content').children('.accordion-head.active').not(':first').removeClass('active');
  			$this.find('.tab-module-pane.active').not(':first').removeClass('active');
  		}else{
  			$this.find('.tab-module-tab:first').addClass('active');
  			$this.find('.tab-module-pane-content').children('.accordion-head:first').addClass('active');
  			$this.find('.tab-module-pane:first').addClass('active');
  		}
  	});
  }

  // On Window resize
  $(window).on('resize load', function(){

  	var formAction_mobile = 'https://mobile.tdameritrade.com/wireless/loginAction.action';
  	var formAction_desktop = 'https://invest.ameritrade.com/grid/p/login';

  	if ($(window).width() > BREAKPOINT_TABLET) {
  		accordionToTab();

  		//Get the height of the sidebar on desktop and set it as the .content-wrapper min-height so the sidebar doesnt overlap with the footer if the content is too short.
  		if ($('.main-sidebar').length > 0) {
  			var sidebarHeight = $('.main-sidebar').height();
  			$('.content-wrapper').css('min-height', sidebarHeight + 10);
  		}


  		//USER TESTING - Login form action url
  		// On desktop form action should be desktop login form
  		var formAction = $("#form-login").attr("action");
  		if(formAction != formAction_desktop){
  			$("#form-login").attr("action", formAction_desktop);
  			$(".main-header-login-username").attr("name", 'tbUsername');
  			$(".main-header-login-password").attr("name", 'tbPassword');
  		}

  		}else{
  			//USER TESTING - Login form action url
  			// On mobile form action should be mobile login form
  			var formAction = $("#form-login").attr("action");
  			if(formAction != formAction_mobile){
  				$("#form-login").attr("action", formAction_mobile);
  				$(".main-header-login-username").attr("name", 'userid');
  				$(".main-header-login-password").attr("name", 'password');
  			}
  		}

  	// collaspedStickyFooter();
  });

  $(window).on('resize', function(){
    collaspedStickyFooter();
  });


  // Scroll Links
  // add '.scroll-link' to any anchor to have it scroll
  var root = $('html, body');
  $('.scroll-link').click(function() {
    var href = $.attr(this, 'href') || $(this).find('a').attr('href') || $(this).data('href');
    var scrollTopp = $(href).offset().top;
    root.animate({
      scrollTop: $(href).offset().top
    }, 500, function () {
      window.parent.location.hash = href;
    });
    return false;
  });




   // Stock Colors
  $('.change-value').each(function(i){
    var indexValue = Number($(this).html());
    if (indexValue < 0) {
      $(this).closest('li').addClass('market-decrease');
    } else if (indexValue > 0){
      $(this).closest('li').addClass('market-increase');
    }
  });


  // Stock Summary
  $('.stock-result .current-stock-change').each(function(){
  	var change = $(this).html();
  	var changeValue = Number(change.substring(0,4));

    if (changeValue < 0) {
      $(this).parents('.stock-result-numbers').addClass('decrease-change');
    } else if (changeValue > 0){
      $(this).parents('.stock-result-numbers').addClass('increase-change');
    }
  });





  // Adding and removing classes for sticky nav animation
  $('.stock-footer-collaspe').on('click', function(){
  	var stockFooter = $('.stock-footer');
  	stockFooter.removeClass('stock-footer-open').addClass('stock-footer-close footer-close');
  	setTimeout(function(){
  		stockFooter.removeClass('footer-close').addClass('footer-open');
  	}, 150);
  	setTimeout(function(){
  		stockFooter.removeClass('footer-open');
  	}, 500);
  });

  $('.stock-footer-expand').on('click', function(){
  	var stockFooter = $('.stock-footer');
  	stockFooter.removeClass('stock-footer-close').addClass('stock-footer-open footer-close');
  	setTimeout(function(){
  		stockFooter.removeClass('footer-close').addClass('footer-open');
  	}, 150);
  	setTimeout(function(){
  		stockFooter.removeClass('footer-open');
  	}, 500);
  });

  var collaspedStickyFooter = function(){
  	var stockFooter = $('.stock-footer');
  	if ($(window).height() < BREAKPOINT_SMALLER_DESKTOP) {
  		if (stockFooter.hasClass('stock-footer-open')){
  			stockFooter.removeClass('stock-footer-open').addClass('stock-footer-close footer-close');
  			setTimeout(function(){
  				stockFooter.removeClass('footer-close').addClass('footer-open');
  			}, 150);
  			setTimeout(function(){
  				stockFooter.removeClass('footer-open');
  			}, 500);
  		}
  	}
  };


  // Scroll Assistance
  // setTimeout is used since the page scrolls on refresh which triggers the scroll event too early
  setTimeout(function(){
  	$(document).scroll(function() {
  	   $('.scroll-assistance').addClass('hide-scroll').removeClass('visible-scroll');
  	});
  }, 1000);



  // Disable list module links
  $('.link-disabled .list-reasons-item-link').click(function() { return false; });


  // Disable results list name action on click (map is disabled)
  if ($(window).width() <= 1024){
  	$('.branch-locator-result-name').click(function() { return false; });
  }


  // Close Alert Message
  $('.alert-message-close').on('click', function(){
  	$('.alert-message').addClass('close-alert-message');
  });


});
;$(function() {

  // Do nothing if there is no browser warning (gte IE9 or not IE)
  if(!$('.browser-warning-wrapper').length) {

    return false;
  }

  var COOKIE_KEY = 'tda-browser-warning-closed';
  var SHOW_MESSAGE_CLASS = 'show-browser-warning';

  if(!Cookies.get(COOKIE_KEY)) {

    $('body').addClass(SHOW_MESSAGE_CLASS);    
  }

  $('.browser-warning-close').on('click', function(event) {

    $('body').removeClass(SHOW_MESSAGE_CLASS);  
    Cookies.set(COOKIE_KEY, true, {
      expires: 7
    });
  });
});;//tabs
$(function() {

  $('.course-container-item').each(function(index){

    var $this = $(this);
    var agreementButton = $this.find('.course-modal-agreement-btn');

    agreementButton.one('click', function(e){
      var $this = $(this);
      var slideshowId = $this.data('slideshow');
      var parent = $this.parents('.course-modal');

      e.preventDefault();
      parent.addClass('show-lessons');

      $('#slider-' + slideshowId).cycle({
        next: '.next-' + slideshowId,
        prev: '.prev-' + slideshowId,
        timeout: 0,
        allowWrap: false,
        pager: '.pager-' + slideshowId,
        pagerActiveClass: 'active'
      });

      slideshowPercentage(slideshowId);

    });

    function slideshowPercentage(slideshowId){
      var id = slideshowId;

      $('#slider-' + id).on( 'cycle-after', function( event, opts ) {
        var $this = $(this);
        var slideNum = opts.slideNum;
        var totalSlides = opts.slideCount;
        var percentage = 0;
        var percentageToMultiply = parseInt(100/(totalSlides-1));
        var percentageContainer = $this.parents('.course-modal').find('.course-modal-progress-percentage');
        var percentageWidthContainer = $this.parents('.course-modal').find('.course-modal-progress-bar');

        if (slideNum === totalSlides){
          percentage = 100;
        }else{
          percentage = (slideNum - 1) * percentageToMultiply;
        }

        if (percentage === 0) {
          percentageContainer.html(" ");
          percentageWidthContainer.css('width', 0);
        }else{
          percentageContainer.html(percentage + "%");
          percentageWidthContainer.css('width', percentage + '%');
        }

      });
    }
  });

  $('.course-pagers-container').on('click keyup', function() {

    var $coursesContainer = $(this);
    $coursesContainer.parent().toggleClass('slideshow-dropdown-open');
    $(document).off('click.coursesDropdown keyup.coursesDropdown');
    $(document).on('click.coursesDropdown keyup.coursesDropdown', function(event) {

      if($(event.target) !== $coursesContainer && $(event.target).parents('.course-pagers-container').length === 0) {

        // User has clicked outside the header login overlay
        $coursesContainer.parent().removeClass('slideshow-dropdown-open');
        $(document).off('click.coursesDropdown keyup.coursesDropdown');
      }
    });
  });

});;$(function() {

  $('.dropdown-module-options-form').on('submit', function(e) {

    e.preventDefault();
    var selectedIndex = $(this).find('.dropdown-module-options option:selected').index();
    var $contentToShow = $(this).parents('.dropdown-module').find('.dropdown-module-lookup-result').eq((selectedIndex-1));
    $contentToShow.show().siblings().hide();
  });

  $('.dropdown-module-options').change(function(){
    if ($(this).val() !== 'selectState'){
      $('.dropdown-module-lookup').prop('disabled',false).removeClass('btn-disabled');
    }

	});
});
;// -----
// Forms Logic
// -----

$(function() {

  // Dropdown Module
  var $dropdownModule = $('.form-dropdown-module-dropdown-button');
  var $dropdownOption = $('.form-dropdown-module-option');

  $dropdownModule.on('click', function(event) {
    event.preventDefault();
    var $options = $(event.target).siblings('.form-dropdown-module-options');
    $options.toggleClass('open');
  });

  $dropdownOption.on('click', function(event) {
    var $buttonSpan = $(event.target).parent().parent().siblings('.form-dropdown-module-dropdown-button').find('.form-dropdown-module-dropdown-button-copy');
    var activeDropdownItemID = $(event.target).closest('.form-dropdown-module-option-checkbox:checked').attr('id');
    var text = $(event.target).siblings('label[for="' + activeDropdownItemID + '\"]').text();
    $buttonSpan.text(text);
    $('.form-dropdown-module-options').removeClass('open');
  });

  // Demo Registration Fades - Education Demos page
  $('#register-now-cta').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('register-on');

    if (!$(this).hasClass('register-on')) {
      $(this).text('Register for a demo');
      $('#login-module-title').text('Do you have a thinkorswim account?');
      $('#demo-register-form').hide();
      $('#demo-login-form').fadeIn();
    } else {
      $(this).text('Log In');
      $('#login-module-title').text('Register for the Platform Demo');
      $('#demo-login-form').hide();
      $('#demo-register-form').fadeIn();
    }
  });

  // Triggers Fade Animation on click - for text under Log In Button
  $('#cta-register-on').on('click', function(event) {
    event.preventDefault();
    $('#register-now-cta').trigger('click');
  });

  // Character Count Logic For Text Areas in forms
  $('textarea.form-textarea-module-item').on('focus', function() {
    var $input = $(this);
    var $charCounterEl = $input.siblings('.characters-left');
    var charsLeft = parseInt($charCounterEl.data('count'));
    var maxLength = $input.attr('maxlength');

    // Make sure there is a character counter before proceeding
    if ($charCounterEl.length) {
      $input.on('keyup.enterText', function(e) {
        setChars();
      });
    }

    $(this).on('focusout', function() {
      $charCounterEl.data('count', charsLeft);
    });

    function setChars() {
      charsLeft = maxLength - $input.val().length;
      if (charsLeft > 1) {
        $charCounterEl.text(charsLeft + ' characters left');
      } else {
        $charCounterEl.text(charsLeft + ' character left');
      }
    }
  });
});
;$(function() {

  $('a.glossary-anchor').click(function() {
    var $this = $(this);
    $this.addClass('active').siblings().removeClass('active');
  });
});;var BREAKPOINT_MOBILE = 767;

$(function() {

  $('.main-header-login-username').focus();

  $('.main-header-mobile-nav-toggle').on('click', function() {

    $('html').toggleClass('nav-open');
    if($('html').hasClass('nav-open')) {

      $(window).scrollTop(0);
    }
  });

  // Tree navigation - secondary nav toggles
  $('.main-header-nav-item.expandable > a').on('click', function(event) {

    if($(this).parents('.nav-open').length) {

      event.preventDefault();
      $(this).parent().siblings().removeClass('expanded');
      $(this).parent().toggleClass('expanded');
    }
  });
  // Tree navigation - tertiary nav toggles

  $('.main-header-nav-item-secondary.expandable > a').on('click', function(event) {

    if($(this).parents('.nav-open').length) {

      event.preventDefault();
      $(this).parent().toggleClass('expanded');
    }
  });

  // Jump to expanded menu item
  $('.main-header-nav-item a').on('click', function(event) {

    var $container = $(event.target).parent();
    var containerAbsoluteTop = $container.offset().top;
    var containerRelativeTop = $container.position().top;
    var containerHeight = $container.outerHeight();
    var $scrollableParent, listScrollTop;


    // Do nothing if the bottom of the container is already above the bottom of the viewport, or if the item is not expanded
    if(!$container.hasClass('expanded') || containerAbsoluteTop + containerHeight - listScrollTop < $(window).height()) {

      return event;
    }

    // Tablet behavior
    if($(window).width() > BREAKPOINT_MOBILE && $container.hasClass('main-header-nav-item-secondary')) {

      $scrollableParent = $container.parents('ul');
      listScrollTop = $scrollableParent.scrollTop();
      // Just show the bottom of the opened menu
      $scrollableParent.animate({scrollTop: containerRelativeTop + listScrollTop}, 100);
    }

    // Mobile beahvior
    else if($(window).width() <= BREAKPOINT_MOBILE) {

      $scrollableParent = $container.parents('.main-header-nav-items');
      listScrollTop = $scrollableParent.scrollTop();
      $scrollableParent.animate({scrollTop: containerRelativeTop + listScrollTop}, 100);
    }
  });

  // Expanding mobile search bar
  $('.main-header-search-input').on('focusin', function() {

    $('.main-header-mobile-search').addClass('expanded');
  });

  $('.main-header-search-input').on('focusout', function() {

    $('.main-header-mobile-search').removeClass('expanded');
  });

  // Toggle mobile login overlay
  $('.main-header-mobile-login-overlay-toggle').on('click', function(event) {

    event.stopPropagation();
    $loginContainer = $('.main-header-login-container');
    $logoContainer = $('.main-header-logo-container');
    $loginContainer.toggleClass('open');
    $logoContainer.toggleClass('hidden');

    $(document).off('click.mobileLoginOverlay');
    var $loginBox = $('.main-header-login');

    if ($loginContainer.hasClass('open')) {

      // freeze ios scrolling
      $('html').addClass('stop-mobile-scroll');

      $(document).on('click.mobileLoginOverlay', function(event) {

        if ($(event.target) !== $loginBox && $(event.target).parents('.main-header-login').length === 0) {

          // User has clicked outside the header login overlay
          $loginBox.parent().removeClass('open');
          $('html').removeClass('stop-mobile-scroll');
          $(document).off('click.mobileLoginOverlay');
          $logoContainer.removeClass('hidden');
        }
      });
    } else {

      $('html').removeClass('stop-mobile-scroll');
    }
  });

  $('.main-header-login').on('click keyup', function() {

    var $loginBox = $(this);
    $logoContainer = $('.main-header-logo-container');
    $loginBox.parent().addClass('open');
    $logoContainer.toggleClass('hidden');
    $('html').addClass('stop-mobile-scroll');
    $(document).off('click.loginOverlay keyup.loginOverlay');
    $(document).on('click.loginOverlay keyup.loginOverlay', function(event) {

      if($(event.target) !== $loginBox && $(event.target).parents('.main-header-login').length === 0) {

        // User has clicked outside the header login overlay
        $('html').removeClass('stop-mobile-scroll');
        $loginBox.parent().removeClass('open');
        $logoContainer.removeClass('hidden');
        $(document).off('click.loginOverlay keyup.loginOverlay');
      }
    });
  });


  // // Dropdown menu button Listeners
  // function updateDropdownButtonCopy() {
  //   var $buttonSpan = $('.main-header-login-start-page-dropdown-button-copy');
  //   var activeDropDownItemID = $('.main-header-login-start-page-checkbox:checked').attr('id');
  //   var text = $('label[for="' + activeDropDownItemID + '\"]').text();
  //   $buttonSpan.text(text);
  // }

  // var $dropdownButton = $('.main-header-login-start-page-dropdown-button');

  // $('.main-header-login-start-page-checkbox').on('click', updateDropdownButtonCopy);
  // $dropdownButton.on('click', function(e) {
  //   e.preventDefault();

  //   // Toggle classes for open dropdown
  //   $dropdownButton.toggleClass('active');
  //   $('.main-header-login-start-page-options').toggleClass('open');
  // });

  // updateDropdownButtonCopy();

  // // =======================================
  // // Autocomplete List Visibility Listener
  // // =======================================

  // $('.main-header-search-input').on('focus', function() {

  //   $autocomplete = $('.autocomplete-container');

  //   $autocomplete.addClass('visible');

  //   $(this).on('focusout.removeAutocomplete', function() {

  //     $autocomplete.removeClass('visible');
  //     $(this).off('focusout.removeAutocomplete');
  //   });
  // });
});
;$(function() {

  // Start click listener for modal triggers
  $('.modal-courses-trigger').on('click', onModalCoursesTriggerClick);
  // Check for any modals in the URL
  checkUrlForCoursesModals();
});

function onModalCoursesTriggerClick(e) {

  var modalId = e.currentTarget.getAttribute('href');
  var $modal = $(modalId);
  if($modal.length) {

    openCoursesModal(modalId);
  }
}

function openCoursesModal(modalId) {

  // The modal can not exceed more than this percentage of the window height
  var MODAL_MAX_HEIGHT_PERCENTAGE = 80;
  var MODAL_SCROLLABLE_HEIGHT_BUFFER = 10;

  var $modal = $(modalId);
  $('body').addClass('show-modal');
  $modal.addClass('open');
  // A version of the ID we can use for unique event listeners
  modalListenerId = modalId.replace('#', '');

  // Add the close button
  if(!$modal.find('.modal-close').length) {

    var $button = '<button class="modal-close"></button>'
    $modal.prepend($button);
  }

  var $closeTriggers = $($modal).find('.modal-close, .modal-courses-trigger');

  // Listen for the escape key
  $(document).on('keydown.closeModal-' + modalListenerId, function(e) {

    if(e.which === 27) {

      closeModals();
      cancelListeners();
    }
  });

  // Listen for the close button click
  $closeTriggers.one('click.closeModal-' + modalListenerId, function(e) {

    closeModals();
    cancelListeners();
    if($(e.currentTarget).hasClass('modal-courses-trigger')) {

      onModalCoursesTriggerClick(e);
    }
  });

  function cancelListeners() {

    $(document).off('keydown.closeModal-' + modalListenerId);
    $closeTriggers.off('click.closeModal-' + modalListenerId);
    $(window).off('resize.resizeModal-' + modalListenerId);
  }
}

function checkUrlForCoursesModals() {

  var urlHash = window.location.hash;
  // Url hash must contain modal ID prefix
  // If a modal exists with the ID specified in the hash, open it
  if(urlHash.indexOf('#course-modal--') === 0 && $(urlHash).length) {

    openCoursesModal(urlHash);

  }
}
;$(function() {

  // Start click listener for modal triggers
  $('.modal-trigger').on('click', onModalTriggerClick);
  // Check for any modals in the URL
  checkUrlForModals();
});

function onModalTriggerClick(e) {

  var modalId = e.currentTarget.getAttribute('href');
  var $modal = $(modalId);
  var removeContent = e.currentTarget.getAttribute('data-remove') || 'false';
  if($modal.length) {

    openModal(modalId, removeContent);
  }
}

function openModal(modalId, removeContent) {

  // The modal can not exceed more than this percentage of the window height
  var MODAL_MAX_HEIGHT_PERCENTAGE = 80;
  var MODAL_SCROLLABLE_HEIGHT_BUFFER = 10;

  var shouldRemoveContent = removeContent;

  var $modal = $(modalId);
  $('body').addClass('show-modal');
  $modal.addClass('open');
  // A version of the ID we can use for unique event listeners
  modalListenerId = modalId.replace('#', '');

  // Size and position the modal
  setModalPosition();

  // Add the close button
  if(!$modal.find('.modal-close').length) {

    var $button = '<button class="modal-close"></button>'
    $modal.prepend($button);
  }

  var $closeTriggers = $($modal).find('.modal-close, .modal-trigger');

  // Listen for the escape key
  $(document).on('keydown.closeModal-' + modalListenerId, function(e) {

    if(e.which === 27) {

      closeModals();
      cancelListeners();

      // If there is a video  inside the module then call stopAllJwplayers()
      // Can't use $modal.find('.jwplayer').length since the .jwplayer classname is missing in ie9
      if ( $modal.find('.video-module-player-container div').length ) {
        stopAllJwplayers();
      }

    }
  });

  // Listen for the close button click
  $closeTriggers.one('click.closeModal-' + modalListenerId, function(e) {

    closeModals();
    cancelListeners();

    if($(e.currentTarget).hasClass('modal-trigger')) {

      onModalTriggerClick(e);
    }

    // If there is a video  inside the module then call stopAllJwplayers()
    // Can't use $modal.find('.jwplayer').length since the .jwplayer classname is missing in ie9
    if ( $modal.find('.video-module-player-container div').length ) {
        stopAllJwplayers();
      }
  });

  // Reposition the modal on window size change

  $(window).on('resize.resizeModal-' + modalListenerId, setModalPosition);

  function cancelListeners() {

    $(document).off('keydown.closeModal-' + modalListenerId);
    $closeTriggers.off('click.closeModal-' + modalListenerId);
    $(window).off('resize.resizeModal-' + modalListenerId);
  }

  // Remove and re-add the content of the modal so it stops videos, etc
  function resetModalContent() {

    var innerHtml = $modal.html();
    $modal.html('').html(innerHtml);
  }

  function getContentHeight() {
    var maxHeight = $(window).height() / 100 * MODAL_MAX_HEIGHT_PERCENTAGE;
    var scrollHeight = $modal.find('.modal-content')[0].scrollHeight + MODAL_SCROLLABLE_HEIGHT_BUFFER;
    return scrollHeight < maxHeight ? scrollHeight : maxHeight;
  }

  // Calculate the negative margin-top for the modal, ie how far up from the 50% mark it should be
  // It should not exceed half of the max modal height percentage
  function getModalMarginTop() {

    var contentHeight = getContentHeight();
    var maxTop = $(window).height() / 100 * (MODAL_MAX_HEIGHT_PERCENTAGE / 2);
    var marginTop = contentHeight / 2 < maxTop ? contentHeight / 2 : maxTop;
    return marginTop * -1;
  }

  function setModalPosition() {

    $modal.css({
      height: getContentHeight(),
      marginTop: getModalMarginTop()
    });
  }

  // Find all JW Players inside the modal and stop them if they are playing
  function stopAllJwplayers() {
    // Can't use $modal.find('.jwplayer') since the .jwplayer classname is missing in ie9
    var elements  = $modal.find('.video-module-player-container div'),
    playerIds = [];

    elements.each(function(i, player) {
      playerIds.push(player.id);
    });

    $.each(playerIds, function(i, id) {
      var state =  jwplayer(id).getState();

      if (state === 'PLAYING'){
        jwplayer(id).stop();
      }
    });
  }
}

function closeModals() {

  $('.modal.open, .course-modal.open').removeClass('open');
  $('body').removeClass('show-modal');
  // Empty the URL hash so the modal won't pop up again if the user refreshes or shares the link
  window.location.hash = '!';
}

function checkUrlForModals() {

  var urlHash = window.location.hash;
  // Url hash must contain modal ID prefix
  // If a modal exists with the ID specified in the hash, open it
  if(urlHash.indexOf('#modal--') === 0 && $(urlHash).length) {

    openModal(urlHash);
  }
}


;$(function() {

  // Slideshow
  $('.sitelet-slideshow.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    navText: [
      "<span class='carousel-icon carousel-icon-left'></span>",
      "<span class='carousel-icon carousel-icon-right'></span>"
      ],
  });

  $('.sitelet-slideshow-mini.owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    dots: false,
    navText: [
      "<span class='carousel-icon carousel-icon-left'></span>",
      "<span class='carousel-icon carousel-icon-right'></span>"
      ],
  });

});;//tabs
$(function() {

  $('.quarters-tab-module').each(function() {

    var $module = $(this);

    matchItemPairHeights($module);
    setActiveItemFromHash($module);

    window.onresize = function() {

      matchItemPairHeights($module);
    };

    // When the window hash changes, get the specified item and set it to be active
    window.onhashchange = function(event) {

      setActiveItemFromHash($module, event);
    };
  });
});

function setActiveItemFromHash($module, event) {

  if(typeof(event) !== 'undefined') {

    event.preventDefault();
  }
  if(window.location.hash.indexOf('quarters-module-item') !== -1) {

    var tabNum = window.location.hash.slice(-1);
    var $activeTab = $('[data-tab=' + window.location.hash.slice(1) + ']');
    $activeTab.addClass('active').siblings().removeClass('active');
    // Scroll to the newly active tab if it is outside of the viewport
    if(!elementInViewport($activeTab[0])) {

      $('html, body').animate({
        scrollTop: $activeTab.offset().top
      }, 250);
    }
  }
}

function matchItemPairHeights($module) {

  var BREAKPOINT_TABLET = 767;

  var $tabTriggers = $module.find('.quarters-tab-trigger');
  // Reset tab trigger heights if the viewport is too small - the layout will have changed via media queries
  if(window.innerWidth < BREAKPOINT_TABLET) {

    return $tabTriggers.height('auto');
  }
  // Set the heights of each pair to match the tallest of the two
  $tabTriggers.height('auto');
  var tallest = 0;
  $tabTriggers.each(function(index) {

    $tabTrigger = $(this);
    if($tabTrigger.height() > tallest) {

      tallest = $tabTrigger.height();
    }
    // We've checked this pair, set both items to have the tallest height
    if(index % 2 === 1) {

      $($tabTrigger).add($tabTriggers.eq(index - 1)).height(tallest);
      tallest = 0;
    }
  });
};$(function() {

  var stylesheet = createDynamicStylesheet();
  insertResponsiveTableCss(stylesheet);
});

function createDynamicStylesheet() {

  var styleEl = document.createElement('style');
  var head = document.head || document.getElementsByTagName("head")[0];
  // Append style element to head
  head.appendChild(styleEl);
  return styleEl.sheet;
}

/*
 * Insert CSS rules for the responsive table into a stylesheet
 */
function insertResponsiveTableCss(stylesheet) {

  var $dataTables = $('.data-table-container table');
  if($dataTables.length) {
  
    $dataTables.each(function(index, el) {

      var rulesArr = createStylesheetRuleArr($(el));
      insertRulesIntoStylsheet(rulesArr);
    });
  }

  /*
   * Creates an array of CSS rules for each responsive 'row' in the table
   */
  function createStylesheetRuleArr($table) {

    var tableId = $table.attr('id');
    var rulesArr = [];
    $table.find('th').each(function(index, el) {

      var selector = ['#', tableId, ' tbody td:nth-child(', index + 1 ,'):before'].join('');
      var props = ['content: \'', $(el).text(), '\';'].join('');
      var rule = [selector, '{', props, '}'].join('');
      rulesArr.push(rule);
    });
    return rulesArr;
  }

  function insertRulesIntoStylsheet(rulesArr) {

    rulesArr.forEach(function(stylesString, index) {

      stylesheet.insertRule(stylesString, index);
    });
  }
}
;var CUSTOM_BUTTON_ASSOCIATIONS = {
  'custom-share-facebook': 'share-buttons-reaction0',
  'custom-share-twitter': 'share-buttons-reaction1',
  'custom-share-googleplus': 'share-buttons-reaction2',
  'custom-share-linkedin': 'share-buttons-reaction3',
  'custom-share-email': 'share-buttons-reaction4'
};

$(function() {

  // Map the custom <button> IDs to the Gigya button IDs

  // Trigger a click on the relevant Gigya button when a custom button is clicked
  $('.subnav-share-button').on('click', function(e) {

    var selector = e.currentTarget.id;
    if(typeof(CUSTOM_BUTTON_ASSOCIATIONS[selector]) === 'string') {

      $('#' + CUSTOM_BUTTON_ASSOCIATIONS[selector]).click();
    }
  });

  bindShareBarUi();

  // Handle the SMS sharing differently - initialize on the first time the share bar is opened
  $('.subnav-share-toggle').one('shareBarOpen');
});


function bindShareBarUi() {

  var $shareToggle = $('.subnav-share-toggle');

  // Bind mouseover and touch events for mobile
  $shareToggle.on('click.showShareBar', function() {

    $shareToggle.off('mouseenter.showShareBar click.showShareBar');
    $(this).trigger('shareBarOpen');
    $(this).parent().addClass('open');
    $(this).siblings('.subnav-share-buttons').animate({
      width: 'toggle'
    });
    $shareToggle.one('click.hideShareBar', function() {

      $(this).siblings('.subnav-share-buttons').animate({
        width: 'toggle'
      });
      $(this).parent().removeClass('open');
      // Rebind this
      bindShareBarUi();
    });
  });
}
;$(function() {

  // Login and search toggles
  $('.sitelet-toggle-open').on('click', function(e) {

    e.preventDefault();
    var $trigger = $(this);
    var $parentContainer = $(this).parent();
    $parentContainer.toggleClass('open').siblings().removeClass('open');
    // $(document).off('click.hideTooltip');

    if($parentContainer.hasClass('open')) {

      // Focus the first text field we find
      $parentContainer.find('input[type=text]').eq(0).focus();
      // Set up a listener for clicking outside the tooltip and closing it
      $(document).on('click.hideTooltip', function(e) {
        console.log('hey');

        // User clicked outside the tooltip
        if($(e.target) !== $parentContainer && $(e.target).parents().filter($parentContainer).length === 0) {

          $parentContainer.removeClass('open');
          $(document).off('click.hideTooltip');
        }
      });
    }
  });
});
;//tabs
$(function() {
  $('.tab-module-tabs').each(function(index){
    $('.tab-module-tab').on('click', function(e){
      var $this = $(this);
      var tab = $this.data('tab');

      $this.addClass('active').siblings('.tab-module-tab').removeClass('active');
      $(tab).addClass('active').siblings('.tab-module-pane').removeClass('active');
      $('.tab-accordion-pane').removeClass('active');
      $('.accordion-head').removeClass('active');
      $('.accordion-head[data-tab="' + tab +'"]').addClass('active');
    });
  });

  // Tabs 2
  $('.table-plugins-tab').on('click', function(e) {
    $(this).addClass('active').siblings().removeClass('active');
  });
});;function elementInViewport(el) {

  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

