function getResult() {
  result = 0;
  var answers = [1, 1, 2, 1];
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

function formToDb() {
  // Stockage des réponses (phrases entieres : récupérer le label) + infos
  // Evenement Woopra : JME-quizz
}

function loadAnswer() {
  $(document).on("valid.zf.abide", function(e) {
    e.preventDefault();
    checkFields();
    formToDb();
    showAnswer();
  });
}

$(document).foundation();
$(document).ready(loadAnswer);
