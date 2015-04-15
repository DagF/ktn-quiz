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
                buttons[i].innerHTML = question.getAlternatives()[i];
            }
        }
        else{
            showStatistics();
            $.mobile.changePage("#quiz-result");
        }
    }

    function showQuestionFeedback(){
        next_question_button.disabled = false;
        for( var i = 0; i < buttons.length; i++){
            buttons[i].setAttribute("correct","false");
        }
        buttons[getCorrectAnswerIndex()].setAttribute("correct","true");
    }

    function getCorrectAnswers(){
        return correct_answers;
    }

    function getWrongAnswers(){
        return wrong_answers;
    }

    function answerQuestion(answer){
        var result = questions[current_question_index].answerQuestion(answer);
        if( result ){
            correct_answers++;
        }
        else if( result == false ){
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
        for( var q = 0; q < questions.length; q++){
            var css_class = questions[q].isAnsweredCorrectly() ? "class=correct" :  "class=wrong";
            quiz_result_table.innerHTML += "<tr><td>"+questions[q].getText()+"</td><td>"+questions[q].getCorrectAnswer()+"</td><td "+css_class+">"+questions[q].getUserAnswer()+"</td></tr>"
        }
    }

    return {
        getNextQuestion:getNextQuestion,
        showNextQuestion:showNextQuestion,
        answerQuestion:answerQuestion,
        getWrongAnswers:getWrongAnswers,
        getCorrectAnswer:getCorrectAnswer,
        getCorrectAnswerIndex:getCorrectAnswerIndex
    };
}