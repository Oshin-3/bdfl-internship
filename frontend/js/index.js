/*obj declaration*/
var data = [
  {
    "requestId": 1,
    "projectname": "Proj-1",
    "projectmanager": "Man-1",
    "resources":4,
    "designation": "xyz",
    "status":"open",
    "minYear": 2,
    "minMonth": 3,
    "maxYear": 6,
    "maxMonth": 2,
    "type":"Replacement",
    "skills":"Full Stack Developer",
    "durationYear":1,
    "durationMonth": 3,
    "probability":"100%",
    "salaryMin":"25K",
    "salaryMax":"50K",
    "poc":"HR-1",
    "hiringStatus":"completed",
    "hrComments":"ok",
    "actions":"done"
  },
  {
    "requestId": 2,
    "projectname": "Proj-2",
    "projectmanager": "Man-2",
    "resources":14,
    "designation": "mno",
    "status":"new",
    "minYear": 2,
    "minMonth": 3,
    "maxYear": 5,
    "maxMonth": 2,
    "type":"New",
    "skills":"Full Stack Developer",
    "durationYear":1,
    "durationMonth": 2,
    "probability":"80%",
    "salaryMin":"25K",
    "salaryMax":"50K",
    "poc":"HR-2",
    "hiringStatus":"completed",
    "hrComments":"ok",
    "actions":"done"
  },
  {
    "requestId": 3,
    "projectname": "Proj-3",
    "projectmanager": "Man-3",
    "resources":20,
    "designation": "abc",
    "status":"open",
    "minYear": 2,
    "minMonth": 4,
    "maxYear": 4,
    "maxMonth": 2,
    "type":"New",
    "skills":"Full Stack Developer",
    "durationYear":0,
    "durationMonth": 8,
    "probability":"100%",
    "salaryMin":"25K",
    "salaryMax":"50K",
    "poc":"HR-3",
    "hiringStatus":"completed",
    "hrComments":"ok",
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

    setDetailsValues();

    // $('label.projectname').text(selReqObj.projectname);
    $details.find('.clone-form').click(function(){
      closeDetails();
      $new_tr.find('.details-module').hide();
      $('.form-input').css("border-left", "6px solid #28a745")
      var $formCopy = $('.form-module').clone();
      $formCopy.addClass('form-copy').show();
      $new_tr.find('td').append($formCopy);
      setEditFormValues();
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
                <td>${rowData["hiringStatus"]}</td>
                <td>${rowData["hrComments"]}</td>
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

function setDetailsValues(){
  $('label.projectname').text(selReqObj.projectname);
  $('label.projectmanager').text(selReqObj.projectmanager);
  $('label.resources').text(selReqObj.resources);
  $('label.designation').text(selReqObj.designation);
  $('label.status').text(selReqObj.status);
  $('label.min-experience').text(selReqObj.minYear+ " Years & " + selReqObj.minMonth + " Months");
  $('label.max-experience').text(selReqObj.maxYear+ " Years & " + selReqObj.maxMonth + " Months");
  $('label.type').text(selReqObj.type);
  $('label.skills').text(selReqObj.skills);
  $('label.duration').text(selReqObj.durationYear + " Years & " + selReqObj.durationMonth + " Months");
  $('label.probability').text(selReqObj.probability);
  $('label.salary').text(selReqObj.salaryMin + " Min. & " + selReqObj.salaryMax + " Max.");
  $('label.poc').text(selReqObj.poc);
  $('label.hirirng-status').text(selReqObj.hiringStatus);
  $('label.hr-comments').text(selReqObj.hrComments);
}

function setEditFormValues() {
  $('#projectname').val(selReqObj.projectname);
  $('#projectmanager').val(selReqObj.projectmanager);
  $('#resources').val(selReqObj.resources);
  $('#designation').val(selReqObj.designation);
  $('#status').val(selReqObj.status);
  $('#minYear').val(selReqObj.minYear);
  $('#minMonth').val(selReqObj.minMonth);
  $('#maxYear').val(selReqObj.maxYear);
  $('#maxMonth').val(selReqObj.maxMonth);
  $('#type').val(selReqObj.type);
  $('#skills').val(selReqObj.skills);
  $('#durationYear').val(selReqObj.durationYear);
  $('#durationMonth').val(selReqObj.durationMonth);
  $('#conversion').val(selReqObj.probability);
  $('#salaryMin').val(selReqObj.salaryMin);
  $('#salaryMax').val(selReqObj.salaryMax);
  $('#poc').val(selReqObj.poc);
  $('#hiring-status').val(selReqObj.hiringStatus);
  $('#hr-comments').val(selReqObj.hrComments);
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
