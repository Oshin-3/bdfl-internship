var data = [
  {
    "requestId": 1,
    "projectname": "Proj-1",
    "projectmanager": "Man-1",
    "resources":4,
    "status":"open",
    "poc":"HR-1",
    "hiring-status":"completed",
    "hr-omments":"ok",
    "actions":"done"
  },
  {
    "requestId": 2,
    "projectname": "Proj-2",
    "projectmanager": "Man-2",
    "resources":14,
    "status":"open",
    "poc":"HR-2",
    "hiring-status":"completed",
    "hr-omments":"ok",
    "actions":"done"
  },
  {
    "requestId": 3,
    "projectname": "Proj-3",
    "projectmanager": "Man-3",
    "resources":20,
    "status":"open",
    "poc":"HR-3",
    "hiring-status":"completed",
    "hr-omments":"ok",
    "actions":"done"
  }
];

function hideAll(){
		$(".module").hide();
	}

	//hideAll();

function showLogin(){
	hideAll();
	$(".login-module").show();
}

//showTable();

function showForm(){
	hideAll();
	$(".form-module").show();
}

//showForm();
function showDetails(){
	hideAll();
	$(".details-module").toggle();
}

function editDetails(e){
	var $req = $(e.target).closest('td');
	var reqId = $req.attr("id");
	console.log("request Id: " + reqId);

  var $tr = $('td').closest('tr');
  var $new_row = $(`
    <tr>
      <td colspan="9"></td>
    </tr>
    `).insertAfter($tr);
}

function showTable(){

 	hideAll();
	$(".table-module").show();
  for(let i=0;i<data.length;i++)
  {
    var rowData = data[i];
    var trNew= $(`<tr>
                <td>${rowData["requestId"]}</td>
                <td>${rowData["projectname"]}</td>
                <td>${rowData["projectmanager"]}</td>
                <td>${rowData["resources"]}</td>
                <td>${rowData["status"]}</td>
                <td>${rowData["poc"]}</td>
                <td>${rowData["hiring-status"]}</td>
                <td>${rowData["hr-omments"]}</td>
                <td id="${rowData["requestId"]}" class="edit-action" ><i class="fa fa-bars"></i></td>
            </tr>`)
    trNew.find('.edit-action').click(editDetails);
    $("table tbody").append(trNew);
  }
}

function loginSubmit(e){
	var username = $('#username').val();
	var password = $('#password').val();

	if (username == 'admin-man' && password == 'admin-man') {
		sessionStorage.setItem("isManager", "true");
		sessionStorage.setItem("username", "admin-man");
		sessionStorage.setItem("password", "admin-man");
	}
    else if (username == 'admin-hr' && password == 'admin-hr') {
        sessionStorage.setItem("isHR", "true");
        sessionStorage.setItem("username", "admin-hr");
        sessionStorage.setItem("password", "admin-hr");
    }
	else{

	}
}


function isLoggedIn(){
	return (sessionStorage.getItem("username") == "admin-man" && sessionStorage.getItem("password") == "admin-man") || (sessionStorage.getItem("username") == "admin-hr" && sessionStorage.getItem("password") == "admin-hr");
}

$(".login-form").click(loginSubmit);

$(".add-request").click(showForm);

$(function(){
	if(isLoggedIn()){
		showTable();
	}
	else{
		showLogin();
	}
});
