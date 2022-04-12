// JavaScript Document

$(document).ready(function() {	
	$('#formrLogin').hide();
	$(".modal-register .register-title").each(function(){
		$(this).click(function(){
			//console.log($(this));
			$('.modal-register .register-title').removeClass(" active");
			$(this).addClass(" active");	
			var thisNo = $(this).attr("no");
			//console.log("thisNo",$(this).attr("no"));
			if(thisNo == "login"){
				$('#formrRegister').hide();
				$('#formrLogin').fadeTo(400,1);
			}else{
				$('#formrLogin').hide();
				$('#formrRegister').fadeTo(400,1);
			}
		});
	});
	
});
function openModal(element,value){
	//console.log("element",element);
	//console.log("value",value);
	$(".modal-register .register-title").each(function(e){
		$('.modal-register .register-title').removeClass(" active");
		var thisNo = $(this).attr("no");
		//console.log(thisNo);
		if(thisNo == value){
			$('.modal-register .register-title.register').addClass(" active");
			$('#formrLogin').hide();
			$('#formrRegister').fadeTo(400,1);

		}else{
			$('.modal-register .register-title.login').addClass(" active");
			$('#formrRegister').hide();
			$('#formrLogin').fadeTo(400,1);
		}
	});
}
function goTop(){
	$('.menu li').removeClass(" menuclick");
	$('body,html').animate({
		scrollTop:	0
	},400);
}