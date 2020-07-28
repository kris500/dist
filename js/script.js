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
})



$(document).ready(function() {

	$.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[а-я, А-Я]+$/i.test(value);
	}); 


	$.validator.addMethod('validDate', function (value, element) {
		return this.optional(element) || /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](202)\d+$/i.test(value);
	});



	function validateForms(form){
    $(form).validate({
      rules: {
				name: {
					required: true,
					minlength: 2,
					lettersonly: true 
				},
				phone: "required",
				email: {
					required: true,
					email: true
				},
				country: {
					required: true,
					minlength: 2,
					lettersonly: true 
				},
				date_check_in: {
					required: true,
					validDate: true 
				},
				date_check_out: {
					required: true,
					validDate: true 
				},
				number_adult: {
					required: true,
					digits: true,
					range: [1, 12]
				},
				number_child: {
					required: true,
					digits: true,
					range: [0, 12]
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
				country: {
					required: "Пожалуйста, введите направление",
					lettersonly: "Некорректный символ"
				},
				date_check_in: {
					required: "Пожалуйста, введите дату заезда",
					validDate: "Некорректная дата"
				},
				date_check_out: {
					required: "Пожалуйста, введите дату выезда",
					validDate: "Некорректная дата"
				},
				number_adult: {
					required: "Пожалуйста, введите количество взрослых",
					range: "Введите значение от 1 до 12"
				},
				number_child: {
					required: "Пожалуйста, введите количество детей",
					range: "Введите значение от 0 до 12"
				}
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



/* 	const location = $('#location').val();
	const check_in = $('#check_in').val();
	const check_out = $('#check_out').val();
	const adult = $('#adult').val();
	const child = $('#child').val();
 */		

/* form.validate();
$( "button" ).click(function() {
  alert( "Valid: " + form.valid() );
});
 */

	$('.btn_search').on('click', function() {

		if ($("#find_hotels form").valid({debug: true}) ) {
			var textContent = $('#location').val() + ',  ' + $('#check_in').val() + ' - ' +  $('#check_out').val() + ',  ' + 'взрослых: ' +  $('#adult').val() + ',  детей: ' +  $('#child').val();
			$('#search .modal_descr').text(textContent);
			$('.overlay, #search').fadeIn('slow');
		}
	});

				// $('#submit').removeAttr('disabled');
/* 	
		var numInvalid = $("#find_hotels form").numberOfInvalids();
		if (numInvalid == 0) {

			$("#find_hotels form").valid();
		var validator = $("#find_hotels form").valid();
			if( validator.numberOfInvalids() != 0 ) {

 */
	// if (form.validate() == false) {
		// if (form.checkValidity() == true) {
		// if(location.length != 0 && check_in.length != 0 && check_out.length != 0 && adult.length != 0 && child.length != 0) {


/* 	$('.btn_search').on('click', function() {
		var textContent = location + ',  ' + check_in + ' - ' +  check_out + ',  ' + 'взрослых: ' +  adult + ',  детей: ' +  child;
		$('#search .modal_descr').text(textContent);
		$('.overlay, #search').fadeIn('slow');
	});
 */
/* 	$('.btn_search').on('click', function() {
				var textContent = location + ',  ' + check_in + ' - ' +  check_out + ',  ' + 'взрослых: ' +  adult + ',  детей: ' +  child;

		var textContent = $('#location').val() + ',  ' + $('#check_in').val() + ' - ' +  $('#check_out').val() + ',  ' + 'взрослых: ' +  $('#adult').val() + ',  детей: ' +  $('#child').val();
		$('#search .modal_descr').text(textContent);
		$('.overlay, #search').fadeIn('slow');
	});
 */
	
	$('.modal_close').on('click', function() {
    $('.overlay, #consultation, #search, #thanks, #authorization_sing_up, #authorization_login').fadeOut('slow');
		$('#consultation form, #authorization_sing_up form').trigger('reset');
		$('label[class="error"]').text('');
		$('input[class="error"]').attr('border: none');

	}); 
	







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
