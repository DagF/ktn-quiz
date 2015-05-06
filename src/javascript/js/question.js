function Question( json ){
    var text = json["question"],
        answer = json["answer"],
        alternatives = json["alternatives"],
        answered_correct=null,
        user_answer=null,
        answered=false;

    function reset(){
        answered_correct=null;
        user_answer=null;
        answered=false;
    }

    function getAlternatives(){
        return alternatives;
    }
    function answerQuestion( a ){
        if(!answered) {
            user_answer = a;
            answered = true;
            answered_correct = checkAnswer(a);
            return checkAnswer(a)
        }
        return null
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
    function getUserAnswerIndex(){
        return user_answer;
    }
    function getUserAnswer(){
        return alternatives[user_answer];
    }
    function isAnsweredCorrectly(){
        return answered_correct;
    }

    return {
        getAlternatives:getAlternatives,
        checkAnswer:checkAnswer,
        answerQuestion:answerQuestion,
        getCorrectAnswer:getCorrectAnswer,
        getCorrectAnswerIndex:getCorrectAnswerIndex,
        getText:getText,
        getUserAnswer:getUserAnswer,
        isAnsweredCorrectly:isAnsweredCorrectly,
        reset:reset
    };
}