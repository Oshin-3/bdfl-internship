$(function(){
	function hideAll(){
		$(".containers").hide();
	}

	//hideAll();

	function showLogin(){
		hideAll();
		$(".login-container").show();
	}

	//showLogin();

	function showTable(){
		hideAll();
		$(".table-container").show();
	}

	//showTable();

	function showForm(){
		hideAll();
		$(".form-container").show();
	}

	//showForm();
	function showDetails(){
		hideAll();
		$(".details-container").show();
	}

	//showDetails();
	showLogin();
});