/* form-to-db */
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(data) {
  var url = 'https://form-to-db.herokuapp.com/';
  var body = JSON.stringify(data);
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
  };
  // Error Handler
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.send(body);
}
/* end form-to-db */

function getResult() {
  result = 0;
  var answers = [1, 2, 2, 2];
  for (i = 0; i < 4; i++) {
    if ($("input[type='radio'][name='" + (i + 1) + "']:checked").val() == answers[i])
      result += 25;
  }
  return (result);
}

function showAnswer() {
  result = getResult();
  $(".name").html("Test");
  $("form#myForm").slideUp();
  $("#result-" + result).slideDown();
  $(".result-part").slideDown();
}

function checkFields() {}

function pureStr(value) {
  return (value
      .replace(/'/g, "%27")
      .replace(/"/g, "&quot;"));
}

function formToDb() {
  var data = {
    "schema": "sol",
    "db": {
      "q1": pureStr($("input[name='1']:checked + label span.radio-txt").html()),
      "q2": pureStr($("input[name='2']:checked + label span.radio-txt").html()),
      "q3": pureStr($("input[name='3']:checked + label span.radio-txt").html()),
      "q4": pureStr($("input[name='4']:checked + label span.radio-txt").html()),
      "birth_year": pureStr($("select[name='annee-naissance']").val()),
      "gender": pureStr($("select[name='homme-femme']").val()),
      "origin": pureStr($("select[name='origine']").val()),
      "firstname": pureStr($("input[name='firstname']").val()),
      "lastname": pureStr($("input[name='lastname']").val()),
      "email": pureStr($("input[name='email']").val()),
      "address": pureStr($("input[name='address']").val()),
      "zipcode": pureStr($("input[name='zipcode']").val()),
      "city": pureStr($("input[name='city']").val()),
      "country": pureStr($("input[name='country']").val()),
      "phone": pureStr($("input[name='phone']").val())
    },
    "woopra" : {
      "host": "solidarites.org",
      /* Variables de configuration de la fiche utilisateur  */
      "cv_name": function() {return this.db.firstname},
      "cv_email": function() {return this.db.email},
      /* Variables de l'evenement  */
      "event": "JME-quizz",
      "ce_amount": "100"
    }
  }
  makeCorsRequest(data);
}

function loadAnswer() {
  $("#myForm").on("submit", function(e) {
    e.preventDefault();
    checkFields();
    formToDb();
    showAnswer();
  });
}

$(document).foundation();
$(document).ready(loadAnswer);
