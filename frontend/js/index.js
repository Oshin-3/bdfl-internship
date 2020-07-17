var data =[];

/*Global variable*/
var selReqObj;



function hideAll(){
		$(".module").hide();
	};

function showLogin(){
	hideAll();
	$(".login-module").show();
};

function showForm(e){
	hideAll();
	var $form = $(".form-module");
  $form.show();
  if(e) {
      $form.find('label[for="requestId"], #requestId').hide();
    }
  handleForm();
};

function handleForm(){

  var $form = $(".form-module:visible");

  var $manFields = $form.find('.managerField');
  var $hrFields = $form.find('.hrField');

  if(isManager()){
    $hrFields.attr("readonly", "readonly");
    $('.hrField').css("border", "none");
  }
  else if (isHR()) {
    $manFields.attr("readonly", "readonly");
    $('.managerField').css("border", "none");
  }
  else {

  }
}

function addButton(){
  var $add = $(".table-module");
  if (isHR())
  {
    $add.find(".add-request").attr("disabled", "disabled");
  }
  
}

function showDetails(){
	$(".details-module").show();
};

function editDetails(e){
	var $req = $(e.target).closest('td');
	var reqId = $req.attr("id");

	console.log("request Id: " + reqId);
  var $tr = $req.closest('tr');
  var $new_tr = $(`
  <tr>
    <td colspan="9" style="text-align: left"></td>
  </tr>
  `).insertAfter($tr);

  handleIcons($req);
  selReqObj = data.find(o => o.requestId == reqId);
    //showDetails();
    var $details = $('.details-module').clone();
    $details.addClass('details-copy').show();
    $new_tr.find('td').append($details);

    setDetailsValues();

    // $('label.projectname').text(selReqObj.projectname);
    $details.find('.clone-form').click(function(){
      $new_tr.insertAfter($tr);
      // closeDetails();
      $new_tr.find('.details-module').hide();
      $('.form-input').css("border-left", "6px solid #28a745")
      var $formCopy = $('.form-module').clone();
      $formCopy.addClass('form-copy').show();
      $formCopy.find('label[for="requestId"], #requestId').show();
      $formCopy.find('i.close-action').hide();
      $new_tr.find('td').append($formCopy);
      setEditFormValues();
      handleForm();
      $formCopy.find(".btn-submit").click(function(){
        var requestId = $('#requestId').val();
        var projectname = $('#projectname').val();
        var projectmanager = $('#projectmanager').val();
        var resources = $('#resources').val();
        var designation = $('#designation').val();
        var status = $('#status').val();
        var minYear = $('#minYear').val();
        var minMonth = $('#minMonth').val();
        var maxYear = $('#maxYear').val();
        var maxMonth = $('#maxMonth').val();
        var type = $('#type').val();
        var skills = $('#skills').val();
        var durationYear = $('#durationYear').val();
        var durationMonth = $('#durationMonth').val();
        var probability = $('#conversion').val();
        var salaryMin = $('#salaryMin').val();
        var salaryMax = $('#salaryMax').val();
        var poc = $('#poc').val();
        var hiringStatus = $('#hiring-status').val();
        var hrComments = $('#hr-comments').val();


          var data ={
            "requestId": requestId,
            "projectname": projectname,
            "projectmanager": projectmanager,
            "resources": resources,
            "designation": designation,
            "status": status,
            "minYear": minYear,
            "minMonth": minMonth,
            "maxYear": maxYear,
            "maxMonth": maxMonth,
            "type": type,
            "skills": skills,
            "durationYear": durationYear,
            "durationMonth": durationMonth,
            "probability": probability,
            "salaryMin": salaryMin,
            "salaryMax": salaryMax,
            "poc": poc,
            "hiringStatus": hiringStatus,
            "hrComments": hrComments
          };
          updateRequests(data);

      });
    })
};

function closeDetails(e){

  $('.details-module.details-copy').closest('tr').remove();
  $('.form-module.form-copy').closest('tr').remove();
  if(e) {
      $('table tr td i.close-action').hide();
      $('table tr td i.edit-action').show();
    }
};

function showTable(){
 	hideAll();
	$(".table-module").show();
  addButton();
  getRequests();
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
  $('label.requestId').text(selReqObj.requestId);
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

function setEditFormValues(){
  $('#requestId').val(selReqObj.requestId);
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
  console.log("Login Submitted");

  var validated = authenticate({"username": username, "password": password});

  if (validated){
    sessionStorage.setItem("isLoggedIn", "true");
  	if (username == 'admin-man' && password == 'admin-man') {
  		sessionStorage.setItem("isManager", "true");
  	}
    else if (username == 'admin-hr' && password == 'admin-hr') {
          sessionStorage.setItem("isHR", "true");
    }
    showTable();
  }
  else {
    alert("Username or Password invalid.")
    $('#username').val('');
    $('#password').val('');
  }


};

function isLoggedIn(){
  return sessionStorage.getItem("isLoggedIn") == "true";
};

function isManager(){
  return sessionStorage.getItem("isManager") == "true";
}

function isHR(){
  return sessionStorage.getItem("isHR") == "true";
}

$(function(){
	if(isLoggedIn()){
		showTable();
	}
	else{
		showLogin();
	}
});

$(".login-btn").click(loginSubmit);

$(".add-request").click(showForm);

$(".btn-submit").click(function(){
  var requestId = $('#requestId').val();
  var projectname = $('#projectname').val();
  var projectmanager = $('#projectmanager').val();
  var resources = $('#resources').val();
  var designation = $('#designation').val();
  var status = $('#status').val();
  var minYear = $('#minYear').val();
  var minMonth = $('#minMonth').val();
  var maxYear = $('#maxYear').val();
  var maxMonth = $('#maxMonth').val();
  var type = $('#type').val();
  var skills = $('#skills').val();
  var durationYear = $('#durationYear').val();
  var durationMonth = $('#durationMonth').val();
  var probability = $('#conversion').val();
  var salaryMin = $('#salaryMin').val();
  var salaryMax = $('#salaryMax').val();
  var poc = $('#poc').val();
  var hiringStatus = $('#hiring-status').val();
  var hrComments = $('#hr-comments').val();


    var data ={
      "projectname": projectname,
      "projectmanager": projectmanager,
      "resources": resources,
      "designation": designation,
      "status": status,
      "minYear": minYear,
      "minMonth": minMonth,
      "maxYear": maxYear,
      "maxMonth": maxMonth,
      "type": type,
      "skills": skills,
      "durationYear": durationYear,
      "durationMonth": durationMonth,
      "probability": probability,
      "salaryMin": salaryMin,
      "salaryMax": salaryMax,
      "poc": poc,
      "hiringStatus": hiringStatus,
      "hrComments": hrComments
    };


  addRequest(data);
  // updateRequests(data);
  hideAll();
  showTable();
});


function authenticate(data){
  var result;

  $.ajax({
      "url": "http://localhost:3000/api/authenticate",
      "method": "POST",
      "timeout": 0,
      "async": false,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    })
    .done(function (response) {
      console.log(response);

      result = response.status == 'success';
    });
    return result;
};

function addRequest(data){
  var result;
  $.ajax({
      "url": "http://localhost:3000/api/addRequest",
      "method": "POST",
      "timeout": 0,
      "async": false,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    })
    .done(function (response) {
      console.log(response);
      result = response.status == 'success';
    });
    return result;
};

// addRequest({"projectname":"Proj-1","projectmanager":"Man-2232","resources":"4"});
// //
function getRequests(){
  $.ajax({
      "url": "http://localhost:3000/api/getRequestDetails",
      "method": "GET",
      "timeout": 0,
      "async": false,
      "headers": {
        "Content-Type": "application/json"
      }
    })
    .done(function (response) {
      data = response.result;
      console.log(data);
    });
}
// getRequests();
//
function updateRequests(data){
  var result;
  $.ajax({
      "url": "http://localhost:3000/api/updateRequest",
      "method": "PUT",
      "timeout": 0,
      "async": false,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify(data),
    })
    .done(function (response) {
      console.log(response);
      result = response.status == 'success';
    });
    return result;
}
// updateRequests({"requestId": "2","projectname":"Project -10","projectmanager":"Man-1111","resources":1, "minYear":2, "minMonth":3, "maxYear":5, "maxMonth":4,"durationYear":3,"durationMonth":4});
