$(document).ready(function() {
	new WOW().init();
	function modal() {
		$('.overlay').fadeIn(300);
		$('.popup-form__input').focus();
	}
	$('.header-contacts__button').on('click', modal);
	$('.overlay, .popup__close').on('click', function(e) {
		if ($(e.target).hasClass('overlay') || $(e.target).hasClass('popup__close'))
			$('.overlay').fadeOut(200);
	});
	$('.production-slider-big').slick({
		asNavFor: '.production-slider-small',
		fade: true,
		initialSlide: 0
	});
	$('.main-img').slick({
		fade: true,
		autoplay: true,
		autoplaySpeed: 9000,
		infinite: true,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false
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
					slidesToScroll: 1
				}
			}
		]
	});
	$('.feedback-slider').slick({
		slidesToShow: 3,
		arrows: true,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	var b = 0;
	function bg() {
		if (b === 0) {
			$('.main').css({
				background:
					'rgba(55, 55, 55, 0.8) url(img/main/main-bg_2.jpg) center / cover no-repeat'
			});
			b++;
		} else {
			$('.main').css({
				background:
					'rgba(55, 55, 55, 0.8) url(img/main/main-bg.jpg) center / cover no-repeat'
			});
			b--;
		}
	}
	if ($(window).width() > 500) setTimeout(modal, 9000);
	setInterval(bg, 6000);
});
