$(function ()
{
	"use strict";

	var $mainMenuWrap = $('.main-menu-wrap');

	if (!$mainMenuWrap.length)
		return;

	/*Навигация фиксированной панели*/

	$('ul.side-nav li.parent').hover(function ()
	{
		$(this).find('.dropdown-menu').stop(true, true).delay(300).show(0);
	}, function ()
	{
		$(this).find('.dropdown-menu').stop(true, true).delay(300).hide(0);
	});
	$('.test-link').click(function ()
	{
		$('.sidemenu').toggleClass('opened');
		$('.md-overlay').addClass('md-show');
		return false;
	});
	$('.side-close-link').click(function ()
	{
		$(this).parents('.sidemenu').removeClass('opened');
		$('.md-overlay').removeClass('md-show');
		return false;
	});

	$(document).click(function (event)
	{
		if ($(event.target).closest('.drop-menu').length) return;
		if ($(event.target).closest('.sidemenu').length) return;
		$(".drop-menu.visible").removeClass('visible');
		$(".sidemenu.opened").removeClass('opened');
		$('.md-overlay').removeClass('md-show');
	});
});