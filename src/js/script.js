@@include('jquery-3.4.1.min.js');
@@include('scroller(flow,id).js');
@@include('slick.min.js');
@@include('wow.min.js');

$(document).ready(function () {
	new WOW().init();
	function modal() {
		$('.overlay').fadeIn(300);
		$('.popup-form__input').focus();
	}
	$('.header-contacts__button').on('click', modal);
	$('.contacts__button').on('click', modal);

	$('.overlay, .popup__close').on('click', function (e) {
		if ($(e.target).hasClass('overlay') || $(e.target).hasClass('popup__close'))
			$('.overlay').fadeOut(200);
	});
	$('.overlay_m, .hum_close').on('click', function (e) {
		if ($(e.target).hasClass('overlay_m') || $(e.target).hasClass('hum_close'))
			$('.overlay_m').fadeOut(200);
	});
	$('.header-hum').on('click', function () {
		$('.overlay_m').fadeIn(300);
	});
	$('.production-slider-big').slick({
		asNavFor: '.production-slider-small',
		fade: true,
		initialSlide: 0,
	});
	$('.main-img').slick({
		fade: true,
		autoplay: true,
		autoplaySpeed: 9000,
		infinite: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
	});
	$('.production-slider-small').slick({
		slidesToShow: 4,
		asNavFor: '.production-slider-big',
		focusOnSelect: true,
		variableWidth: false,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});
	$('.feedback-slider').slick({
		slidesToShow: 3,
		arrows: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});

	var b = 0;
	function bg() {
		if (b === 0) {
			$('.main').css({
				background:
					'rgba(55, 55, 55, 0.8) url(../img/main/main-bg_2.jpg) center / cover no-repeat',
			});
			b++;
		} else {
			$('.main').css({
				background:
					'rgba(55, 55, 55, 0.8) url(../img/main/main-bg.jpg) center / cover no-repeat',
			});
			b--;
		}
	}
	if ($(window).width() > 500) setTimeout(modal, 9000);
	setInterval(bg, 6000);
	$('.minimized').click(function (event) {
		var i_path = $(this).attr('src');
		$('body').append(
			'<div id="overlay"><div id="magnify"><img src="' +
				i_path +
				'"><div id="close-popup"><i></i></div></div></div>'
		);
		$('#overlay').css({
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			opacity: '1',
			backgroundColor: 'rgba(0,0,0, 0.5)',
		});
		$('#overlay, #magnify').fadeIn('fast');
	});

	$('body').on('click', '#close-popup, #overlay', function (event) {
		event.preventDefault();

		$('#overlay, #magnify').fadeOut('fast', function () {
			$('#close-popup, #magnify, #overlay').remove();
		});
	});
	$('a[href^="#"]').bind('click.smoothscroll', function (e) {
		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body')
			.stop()
			.animate(
				{
					scrollTop: $target.offset().top + -50 + 'px',
				},
				900,
				'swing'
			);
	});
});
