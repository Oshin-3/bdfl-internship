/*obj declaration*/
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

/*Global variable*/
var selReqObj;
var $new_tr = $(`
  <tr>
    <td colspan="9" style="text-align: left"></td>
  </tr>
  `);


function hideAll(){
		$(".module").hide();
	};

function showLogin(){
	hideAll();
	$(".login-module").show();
};

function showForm(){
	hideAll();
	$(".form-module").show();
};

function showDetails(){
	$(".details-module").show();
};

function editDetails(e){
	var $req = $(e.target).closest('td');
	var reqId = $req.attr("id");
  handleIcons($req);
	console.log("request Id: " + reqId);

  selReqObj = data.find(o => o.requestId == reqId);

  var $tr = $req.closest('tr');
  $new_tr.insertAfter($tr);

    //showDetails();
    var $details = $('.details-module').clone();
    $details.addClass('details-copy').show();
    $new_tr.find('td').append($details);

    //$('label.projectname').text(selReqObj.projectname);
    $details.find('.clone-form').click(function(){
      closeDetails();
      $new_tr.find('.details-module').hide();
      $('.form-input').css("border-left", "6px solid #28a745")
      var $formCopy = $('.form-module').clone();
      $formCopy.addClass('form-copy').show();
      $new_tr.find('td').append($formCopy);
    })
};

function closeDetails(e){

  $('div.details-module.details-copy').remove();
  $('.form-module.form-copy').remove();
  if(e) {
      $('table tr td i.close-action').hide();
      $('table tr td i.edit-action').show();
    }
};

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
                <td id="${rowData["requestId"]}" >
                  <i class="fa fa-bars edit-action"></i>
                  <i class="fa fa-times close-action"></i>
                </td>
            </tr>`);

    trNew.find('.edit-action').click(editDetails);
    trNew.find('.close-action').click(closeDetails);
    trNew.find('.close-action').hide();

    $("table tbody").append(trNew);
  }
};

function handleIcons($req){
  var $table = $req.closest('table');
  $table.find('i.edit-action').show();
  $table.find('i.close-action').hide();

  $req.find('i.close-action').show();
  $req.find('i.edit-action').hide();

  closeDetails();
};

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
};

function isLoggedIn(){
	return (sessionStorage.getItem("username") == "admin-man" && sessionStorage.getItem("password") == "admin-man") || (sessionStorage.getItem("username") == "admin-hr" && sessionStorage.getItem("password") == "admin-hr");
};

$(function(){
	if(isLoggedIn()){
		showTable();
	}
	else{
		showLogin();
	}
});

$(".login-form").click(loginSubmit);

$(".add-request").click(showForm);

$(".btn-submit").click(showTable);
