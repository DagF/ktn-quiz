$(document).bind("mobileinit", function() {
    //Set your global init settings here
    //This is the setting you are looking for!
    $.mobile.defaultPageTransition = 'none';

    //I personally use some other settings, such as:
    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.useFastClick  = false;
    $.fx.off = true;
});

function loadJSON( url ){
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url':url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}

if(typeof(Storage) == "undefined") {
    alert("Local Storage not supported. Statistics and settings will not be saved between pagereloads.");
}

function supportsLocalStorage(){
    return typeof(Storage) != "undefined";
}


//fields in view
var question_title = document.getElementById("question"),
    buttons = [
        document.getElementById("answer_0"),
        document.getElementById("answer_1"),
        document.getElementById("answer_2"),
        document.getElementById("answer_3")
    ],
    next_question_button = document.getElementById("next_question_button"),
    correct_answers_label = document.getElementById("correct_answers"),
    wrong_answers_label = document.getElementById("wrong_answers"),
    question_count = document.getElementById("question_count"),
    quiz_result_table = document.getElementById("quiz_result_table_body"),
    quiz_current_question_index = document.getElementById("quiz-current-question-index"),
    quiz_question_count = document.getElementById("quiz-question-count"),
    quiz_correct_answers = document.getElementById("quiz-correct-answers"),
    quiz_wrong_answers = document.getElementById("quiz-wrong-answers");






//prepare quiestion
var json = loadJSON("json/true_false_questions.json");
json = json["questions"];
var true_false_questions = [];
for( var i = 0; i < json.length; i++){
    true_false_questions.push( Question( json[i] ));
}



var current_quiz = null;
var settings = {
    question_feedback : "true",
    toggleQuestionFeedback : function(){
        if( settings.question_feedback == "false") {
            settings.question_feedback = "true";
            next_question_button.style.display = "block";
            next_question_button.disabled = true;
            if( supportsLocalStorage() ){
                localStorage.setItem("question_feedback", "true");
            }
        }
        else{
            settings.question_feedback = "false";
            if( supportsLocalStorage() ){
                localStorage.setItem("question_feedback", "false");
            }
        }
    }
};

//load settings
if( supportsLocalStorage() ){
    settings.question_feedback = localStorage.getItem("question_feedback") || "true";
    if( settings.question_feedback == "true" ) next_question_button.style.display = "block";
}

//helper functions




//methodes
function startQuestionQuiz(){
    var number = question_count.value;
    var questions = getRandomQuestions(number);
    current_quiz = Quiz( questions );
    current_quiz.showNextQuestion();
    next_question_button.onclick  = current_quiz.showNextQuestion;

    buttons[0].onclick = function(){
        var target = window.event.target || window.event.srcElement;
        target.setAttribute("selected", "selected");
        current_quiz.answerQuestion(0)
    };

    buttons[1].onclick = function(e){
        var target = window.event.target || window.event.srcElement;
        target.setAttribute("selected", "selected");
        current_quiz.answerQuestion(1)
    };

    buttons[2].onclick = function(e){
        var target = window.event.target || window.event.srcElement;
        target.setAttribute("selected", "selected");
        current_quiz.answerQuestion(2)
    };

    buttons[3].onclick = function(e){
        var target = window.event.target || window.event.srcElement;
        target.setAttribute("selected", "selected");
        current_quiz.answerQuestion(3)
    };
    $.mobile.changePage("#quiz");

}

function getRandomQuestions( number){
    var questionIndices = [];
    while (questionIndices.length < number){
        var index = parseInt(Math.random() * true_false_questions.length);
        if( questionIndices.indexOf( index ) == -1 ){
            questionIndices.push(index);
        }
    }
    var questions = [];
    for( var i = 0; i < questionIndices.length; i++){
        questions.push( true_false_questions[questionIndices[i]]);
    }
    return questions;
}


//prepare settings switches
if( settings.question_feedback == "true" ){
    document.getElementById("question_feedback").children[1].selected = true;
}
else{
    document.getElementById("question_feedback").children[0].selected = true;
}
//button binding
document.getElementById("start_30_question_quiz").onclick = startQuestionQuiz;
document.getElementById("question_feedback").onchange = settings.toggleQuestionFeedback;



if( window.location.hash == "#quiz" )  {
    $.mobile.navigate("#home");
}
