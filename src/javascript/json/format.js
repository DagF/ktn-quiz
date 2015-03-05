/**
 * Created by Dag Frode on 05.03.2015.
 */

$.get("ktn-eksamen.txt", function( my_var ) {
    var lines = my_var.split("\n");
    var roof = (( lines.length + 1) / 4)-1;

    var qui = [];
    for(var i = 0; i < roof; i++){
        var q = {};
        q.question = lines[i*4+0].substring(3);
        q.alternatives = [];
        q.alternatives.push( lines[i*4+1].substring(3));
        q.alternatives.push( lines[i*4+2].substring(3));
        q.answer = lines[i*4+3].substring(3);
        qui.push(q);
    }
    var quiz = {"questions":qui};
   var json = JSON.stringify(quiz);
    $("#json").html(json);
    console.log(json);
});
