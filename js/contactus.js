var ContactUsViewModel = {
	init: function() {
		
		this.initGoogleMap();
		this.initEmailer();
		this.initValidation();
		this.initToastr();
   },
   
   initGoogleMap: function() {
        var address = {lat: 43.1468561, lng: 23.923727 };
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
          zoom: 16,
          center: address
        });
        var marker = new google.maps.Marker({
          position: address,
          map: map
        });
   },
   
   initEmailer: function() {
	  
	emailjs.init("user_K1JESB9MkmNjbHN6csAy9");
	  
	$('#btnSendEmail').on('click', function() {
		if ($('form#contactUs').valid()) {
			$('#loading').show();
			emailjs.send("default_service","responsive_template",{
			  from_name: $('form#contactUs input[name="name"]').val(), 
			  from_email: $('form#contactUs input[name="email"]').val(), 
			  from_subject: $('form#contactUs input[name="subject"]').val(), 
			  from_message: $('form#contactUs textarea[name="message"]').val(), 
			})
			.then(
			  function(response) {
				  ContactUsViewModel.clearValues();
				  $('#loading').hide();
				  toastr.success('Изпращането на имейл завърши успешно!');
				  //console.log("SUCCESS", response);
			  }, 
			  function(error) {
				  ContactUsViewModel.clearValues();
				  $('#loading').hide();
				  toastr.error('Грешка при изпращането на имейл! Моля свържете се със системния администратор за повече информация!');
				  //console.log("FAILED", error);
			  }
			);
		}
	});
   },
   
   initToastr: function() {
	 toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-top-center",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}  
   },
   
   initValidation: function() {
	   $('form#contactUs').validate({
		   rules: {
			   name: { required: true },
			   email: { required: true, email: true },
			   subject: { required: true },
			   message: { required: true },
		   },
		   messages: {
			   required: "Това поле е задължително."
		   }
	   });
	   
	   jQuery.extend(jQuery.validator.messages, {
			required: "Това поле е задължително.",
			remote: "Please fix this field.",
			email: "Моля въведете валиден имейл адрес.",
			maxlength: jQuery.validator.format("Моля въведете не повече от {0} символа."),
			minlength: jQuery.validator.format("Моля въведете поне {0} символа.")
		});
   },
   
   clearValues: function() {
	   $('form#contactUs input[name="name"]').val('');
	   $('form#contactUs input[name="email"]').val('');
	   $('form#contactUs input[name="subject"]').val('');
	   $('form#contactUs textarea[name="message"]').val('');
   }
};
$(document).ready(function() {
	ContactUsViewModel.init();
});