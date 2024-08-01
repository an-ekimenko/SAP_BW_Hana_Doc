(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Using the closure to map jQuery to $.
(function ($) {
// Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.element61_top_region_menu = {
    attach: function (context, settings) {
      // Find all the secure links inside context that do not have our processed
      // class.
      $('.top-region .menu li').each(function () {
        var children = $(this).children('.menu').children('li');
        if (!$(this).hasClass('active-trail')) {
          $(this).removeClass('expanded');
        }
        if (children.length == 0) {
          $(this).addClass('no-childs');
        }
      });

      //TOP REGION responsive menu
      $("#block-search-form").addClass('responsive-top-region');
      $("#block-locale-language").addClass('responsive-top-region');
      $("#block-system-user-menu").addClass('responsive-top-region');

      $('.responsive-top-region').each(function () {
        $(this).addClass('close');
      });
      $('#block-glue-site-top-region-navbar-toggle .navbar-toggle').click(function () {
        if ($(this).hasClass('collapsed')) {
          $(this).removeClass('collapsed');
        }
        else {
          $(this).addClass('collapsed');
        }

        $('.responsive-top-region').each(function () {
          if ($(this).hasClass('close')) {
            $(this).removeClass('close');
            $(this).addClass("open");
          }
          else {
            $(this).addClass('close');
            $(this).removeClass('open');
          }
        });
      });

      // Find all the secure links inside context that do not have our processed
      // class.
      $('.top-region .menu li').each(function () {
        var children = $(this).children('.menu').children('li');
        if (!$(this).hasClass('active-trail')) {
          $(this).removeClass('expanded');
        }
        if (children.length == 0) {
          $(this).addClass('no-childs');
        }
      });

      $('.top-region .menu li').click(function (e) {
        var children = $(this).children('.menu').children('li');
        children.each(function () {
          $(this).toggle();
        });
        if ($(this).hasClass('expanded')) {
          $(this).removeClass('expanded');
        }
        else {
          $(this).addClass('expanded');
        }
        e.stopPropagation();
      });
    }
  };


  Drupal.behaviors.research_insights_hover = {
  attach: function (context, settings) {
    $('.node--knowledge-base-item.view-mode-teaser_insights .group-right').hover(function(e) {
      $(this).parent().find('.group-left').animate({height: $(this).height()}, 200);
    }, function(e) {
      $(this).parent().find('.group-left').animate({height: 70}, 200);
    });
  }
};

Drupal.behaviors.news_hover = {
  attach: function (context, settings) {
    $('.node--news.view-mode-teaser .group-right').hover(function(e) {
      $(this).parent().find('.group-left').animate({height: $(this).height()}, 200);
    }, function(e) {
      $(this).parent().find('.group-left').animate({height: 70}, 200);
    });
  }
};

Drupal.behaviors.event_hover = {
  attach: function (context, settings) {
    $('.node--event.view-mode-teaser .group-right').hover(function(e) {
      $(this).parent().find('.group-left').animate({height: $(this).height()}, 200);
    }, function(e) {
      $(this).parent().find('.group-left').animate({height: 70}, 200);
    });
  }
};

Drupal.behaviors.project_hover = {
  attach: function (context, settings) {
    $('.node--project.view-mode-teaser_3 .group-right').hover(function(e) {
      $(this).parent().find('.group-left').animate({height: $(this).height()}, 200);
    }, function(e) {
      $(this).parent().find('.group-left').animate({height: 70}, 200);
    });
  }
};

Drupal.behaviors.tel_mail_block = {
    attach: function (context, settings) {
      $('.block--el61-config-el61-config-sidebar-contact .icon-wrap').once().click(function(e) {
        $(this).parent().toggleClass('opened');
      });
    }
  };
})(jQuery);

},{}]},{},[1]);
;
