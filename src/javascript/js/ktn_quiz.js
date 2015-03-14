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

(function(){
    QUIZ = function(){

        //fields in view
        var question_title = document.getElementById("question"),
            buttons = [
                document.getElementById("answer_0"),
                document.getElementById("answer_1"),
                document.getElementById("answer_2"),
                document.getElementById("answer_3")
            ],
            next_question_button = document.getElementById("next_question_button"),
            correct_answers_label =document.getElementById("correct_answers"),
            wrong_answers_label = document.getElementById("wrong_answers");

        //prepare quiestion
        var json = loadJSON("json/true_false_questions.json");
        json = json["questions"];
        var true_false_questions = [];
        for( var i = 0; i < json.length; i++){
            true_false_questions.push( Question( json[i] ));
        }



        var current_quiz = null;
        var settings = {
            question_feedback : false,
            toggleQuestionFeedback : function(){
                if( settings.question_feedback == "false") {
                    settings.question_feedback = "true";
                    next_question_button.style.display = "block";
                    next_question_button.disabled = true;
                    if( supportsLocalStorage() ){
                        localStorage.setItem("question_feedback", true);
                    }
                }
                else{
                    settings.question_feedback = "false";
                    if( supportsLocalStorage() ){
                        localStorage.setItem("question_feedback", false);
                    }
                }
            }
        };

        //load settings
        if( supportsLocalStorage() ){
            settings.question_feedback = localStorage.getItem("question_feedback");
            if( settings.question_feedback ) next_question_button.style.display = "block";
        }


        //helper functions
        function Quiz( questions ){
            var current_question_index = -1,
                wrong_answers = 0,
                correct_answers = 0,
                questions = questions;


            function getNextQuestion(){
                current_question_index++;
                return questions[current_question_index];
            }

            function showNextQuestion(){
                if( current_question_index < questions.length -1 ){
                    var question = getNextQuestion();
                    question_title.innerHTML = question.getText();
                    if( settings.question_feedback == "true" ){
                        next_question_button.style.display = "block";
                        next_question_button.disabled = true;
                    }
                    else{
                        next_question_button.style.display = "none";
                    }
                    for( var i = 0; i < buttons.length; i++){
                        buttons[i].style.display = "none";
                        buttons[i].disabled = false;
                        buttons[i].removeAttribute("correct");
                        buttons[i].removeAttribute("selected");
                    }
                    for( var i = 0; i < question.getAlternatives().length; i++){
                        buttons[i].style.display = "block";
                        buttons[i].innerText = question.getAlternatives()[i];
                    }
                }
                else{
                    showStatistics();
                    $.mobile.changePage("#quiz-result");
                }
            }

            function showQuestionFeedback(){
                next_question_button.disabled = false;
                buttons[getCorrectAnswerIndex()].setAttribute("correct","correct-answer");
            }

            function getCorrectAnswers(){
                return correct_answers;
            }

            function getWrongAnswers(){
                return wrong_answers;
            }

            function checkAnswer( answer ){
                if( questions[current_question_index].checkAnswer(answer)){
                    correct_answers++;
                }
                else{
                    wrong_answers++;
                }
                for( var i = 0; i < buttons.length; i++){
                    buttons[i].disabled = true;
                }
                if( settings.question_feedback == "true"){
                    showQuestionFeedback();
                }
                else{
                    next_question_button.style.display = "none";
                    next_question_button.disabled = false;
                    showNextQuestion();
                }
            }

            function getCorrectAnswer(){
                return questions[current_question_index].getCorrectAnswer();
            }

            function getCorrectAnswerIndex(){
                return questions[current_question_index].getCorrectAnswerIndex();
            }

            function showStatistics(){
                correct_answers_label.innerHTML = "" + correct_answers;
                wrong_answers_label.innerHTML = "" + wrong_answers;
            }

            return {
                getNextQuestion:getNextQuestion,
                showNextQuestion:showNextQuestion,
                checkAnswer:checkAnswer,
                getWrongAnswers:getWrongAnswers,
                getCorrectAnswer:getCorrectAnswer,
                getCorrectAnswerIndex:getCorrectAnswerIndex
            };
        }

        function Question( json ){
            var text = json["question"],
                answer = json["answer"],
                alternatives = json["alternatives"];



            function getAlternatives(){
                return alternatives;
            }
            function checkAnswer( a ){
                return answer == a
            }
            function getCorrectAnswer(){
                return alternatives[answer];
            }
            function getCorrectAnswerIndex(){
                return answer;
            }
            function getText(){
                return text;
            }

            return {
                getAlternatives:getAlternatives,
                checkAnswer:checkAnswer,
                getCorrectAnswer:getCorrectAnswer,
                getCorrectAnswerIndex:getCorrectAnswerIndex,
                getText:getText
            };
        }

        //methodes
        function start30QuestionQuiz(){
            var questions = get30RandomQuestions();
            current_quiz = Quiz( questions );
            current_quiz.showNextQuestion();
            next_question_button.onclick  = current_quiz.showNextQuestion;

            buttons[0].onclick = function(){
                var target = window.event.target || window.event.srcElement;
                target.setAttribute("selected", "selected");
                current_quiz.checkAnswer(0)
            };

            buttons[1].onclick = function(e){
                var target = window.event.target || window.event.srcElement;
                target.setAttribute("selected", "selected");
                current_quiz.checkAnswer(1)
            };

            buttons[2].onclick = function(e){
                var target = window.event.target || window.event.srcElement;
                target.setAttribute("selected", "selected");
                current_quiz.checkAnswer(2)
            };

            buttons[3].onclick = function(e){
                var target = window.event.target || window.event.srcElement;
                target.setAttribute("selected", "selected");
                current_quiz.checkAnswer(3)
            };
            $.mobile.changePage("#quiz");

        }

        function get30RandomQuestions(){
            var questionIndices = [];
            while (questionIndices.length < 30){
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
        document.getElementById("start_30_question_quiz").onclick = start30QuestionQuiz;
        document.getElementById("question_feedback").onchange = settings.toggleQuestionFeedback;


        return {

        };
    }();
})();

if( window.location.hash == "#quiz" )  {
    $.mobile.navigate("#home");
}
