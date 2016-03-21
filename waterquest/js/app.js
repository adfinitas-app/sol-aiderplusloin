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
  var result = getResult();
  $(".name").html(pureStr($("input[name='firstname']").val()) + " " +
		  pureStr($("input[name='lastname']").val()));
  $("form#myForm").slideUp();
  $("#result-" + result).slideDown();
  $(".result-part").slideDown();
  var url = "http://www.facebook.com/sharer/sharer.php?u=" + gif[result].url;
  $("#fb_share").attr("href", url);
  url = "http://twitter.com/share?url=" + gif[result].url
    + "&text=" + gif[result].texte
    + "&via=solidarites_int&hashtags=water_quest";
  $("#twitter_share").attr("href", url);
}

function checkFields() {}

function pureStr(value) {
  return (value
      .replace(/'/g, "%27")
      .replace(/"/g, "&quot;"));
}

function formToDb() {
  var result = getResult();
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
      "phone": pureStr($("input[name='phone']").val()),
      "score": result
    },
    "woopra" : {
      "host": "solidarites.org",
      /* Variables de configuration de la fiche utilisateur  */
      "cv_firstname": pureStr($("input[name='firstname']").val()),
      "cv_lastname": pureStr($("input[name='lastname']").val()),
      "cv_email": pureStr($("input[name='email']").val()),
      "cv_name": pureStr($("input[name='firstname']").val()) + " " + pureStr($("input[name='lastname']").val()),
      "cv_sexe": pureStr($("select[name='homme-femme']").val()),
      "cv_phone": pureStr($("input[name='phone']").val()),
      "cv_address1": pureStr($("input[name='address']").val()),
      "cv_postcode": pureStr($("input[name='zipcode']").val()),
      "cv_country": pureStr($("input[name='country']").val()),
      "cv_1er_contact": pureStr($("select[name='origine']").val()),
      "cv_city": pureStr($("input[name='city']").val()),
      "cv_annee_naissance": pureStr($("select[name='annee-naissance']").val()),
      /* Variables de l'evenement  */
      "event": "JME-quizz",
      "ce_score": result + "%"
    }
  }
  makeCorsRequest(data);
}

function loadAnswer() {
  $("#id_phone").intlTelInput({utilsScript: "tel-input/lib/libphonenumber/build/utils.js"});
  $("#myForm").on("formvalid.zf.abide", function() {
    var result = true;
    for (i = 0; i < 4; i++) {
      if ($("input[type='radio'][name='" + (i + 1) + "']:checked").val() == undefined) {
	$(".error.input-" + (i + 1)).show();
	result = false;
      }
      else {
	$(".error.input-" + (i + 1)).hide();
      }
    }
    if (result == false) {
      alert("Veuillez remplir le questionnaire.");
      return (false);
    }
    checkFields();
    formToDb();
    showAnswer();
  });
  $("#myForm").on("submit", function(e) {
    e.preventDefault();
  });
}

$(document).foundation();
$(document).ready(loadAnswer);

// This is a trick to add a message in case of errors
// NB : If the input is required, while empty,
// the browser will show an (empty) message
Foundation.Abide.defaults.validators['intlTelInput'] =
function ($el, required, parent) {
  if ($el.intlTelInput("isValidNumber")) {
    $el.get(0).setCustomValidity("");
    $(".intl-error").hide();
    return true;
  }
  else {
    $(".intl-error").show();
    $el.get(0).setCustomValidity("");
    $el.get(0).setCustomValidity("Numéro invalide");
    return false;
  }
}
