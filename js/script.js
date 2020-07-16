$(document).ready(function() {

  // modal

	$('#login').on('click', function () {
    $('.overlay, #authorization_login').fadeIn('slow');
	});
	
	$('#sing_up').on('click', function () {
    $('.overlay, #authorization_sing_up').fadeIn('slow');
  });

	$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });

	$('.btn_search').on('click', function() {
		var textContent = $('#where').val() + ', ' + $('#check_in').val() + ' - ' +  $('#check_out').val() + ', ' + 'взрослых: ' +  $('#adult').val() + ', детей: ' +  $('#child').val();
		$('#search .modal_descr').text(textContent);
		$('.overlay, #search').fadeIn('slow');
	});

	$('.modal_close').on('click', function() {
    $('.overlay, #consultation, #search, #thanks, #authorization_sing_up, #authorization_login').fadeOut('slow');
  }); 





	function validateForms(form){
    $(form).validate({
      rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				},
				country: {
					required: true,
					digits: false
				},
				date_check_in: {
					date: true,
					required: true
				},
				date_check_out: {
					date: true,
					required: true
				},
				number_adult: {
					required: true,
					digits: true,
					minlength: 1,
					maxlength: 2
				},
				number_child: {
					digits: true,
					minlength: 1,
					maxlength: 2
				},
				location: {
					required: true,
				}
      },
      messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты"
				},
				login: "Пожалуйста, введите логин",
				registrationKey: "Пожалуйста, введите пароль",
				country: "Пожалуйста, введите направление",
				date_check_in: "Пожалуйста, введите дату заезда",
				date_check_out: "Пожалуйста, введите дату выезда",
				number_adult: "Пожалуйста, введите количество взрослых"
      }
    });
  };

	validateForms('#authorization_login form');
	validateForms('#authorization_sing_up form');
	validateForms('#consultation form');
	validateForms('#find_hotels form');
	validateForms('#search form');


	$("input[name=phone]").mask("+7 (999) 999-99-99");
	$("input[name=date_check_in]").mask("99/99/9999");
	$("input[name=date_check_out]").mask("99/99/9999");



// отправка на почту данных от пользователя

  $('form').submit(function(e) {
    e.preventDefault(); 
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
			$('#consultation, #search').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

//scroll and pageup

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
    } else {
			$('.pageup').fadeOut();
    }
  });


  $("a[href^='#up']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
	});
});


window.addEventListener('DOMContentLoaded', () => {
	const menu = document.querySelector('.menu'),
	menuItem = document.querySelectorAll('.menu_item'),
	hamburger = document.querySelector('.hamburger');

	hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('hamburger_active');
			menu.classList.toggle('menu_active');
	});

	menuItem.forEach(item => {
			item.addEventListener('click', () => {
					hamburger.classList.toggle('hamburger_active');
					menu.classList.toggle('menu_active');
			})
	})
});
