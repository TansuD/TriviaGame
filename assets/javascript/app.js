$(document).ready(function () {

    // start button begins game //
    // results are hidden //

    $("#results").hide();
    $("#start-button").on("click", spaceTrivia.startGame);
    $(document).on("click", "#questions", spaceTrivia.guessChecker);

    // declaring my objects for the game //

    var spaceTrivia = {
        correct: 0,
        incorrect: 0,
        currentSet: 0,
        unanswered: 0,
        timer: 0,
        timerId: "",
        timerOn: false,

        // questions... //

        questions: {
            question1: "Which is the brightest star in the night sky?",
            question2: "Which is the hottest planet?",
            question3: "How many satellites does Jupiter have?"
        },

        // options... //

        options: {
            options1: ["Vega", "Polaris", "Sirius", "Betelgeuse"],
            options2: ["Venus", "Mercury", "Mars", "Earth"],
            options3: ["34", "96", "63", "79"]
        },

        // answers... //

        answers: {
            answer1: "Sirius",
            answer2: "Venus",
            answer3: "79"
        }
    }

    // function that's supposed to start the game //

    function startGame() {

        // all of the game's stats are set to zero at the start of the game (still hidden) //

        spaceTrivia.currentSet = 0;
        spaceTrivia.correct = 0;
        spaceTrivia.incorrect = 0;
        spaceTrivia.unanswered = 0;
        clearInterval(spaceTrivia.timerId);

        // at the start of the game, the time left is shown //

        $("#timer").text(spaceTrivia.timer);

        // the start button is supposed to be hidden //

        $("#start-button").hide();

        // supposed to show the timer countdown //

        $("#remaining-time").show();

        // directing the next function for the next question //

        spaceTrivia.nextQuestion();

    }

    // calling the game to start //

    startGame();

    // declaring a function for the next question to be asked //

    function nextQuestion() {

        // set timer to one minute //

        spaceTrivia.timer = 60;
        $("#timer").text(spaceTrivia.timer);

        // timer to count down by one second while the game is going //

        if (!spaceTrivia.timerOn) {
            spaceTrivia.timerId = setInterval(spaceTrivia.timerRunning, 1000);
        }
    }

    // calling the next question function //

    nextQuestion();

    // creating a function for the timer to be running //

    function timerRunning() {



        if (spaceTrivia.timer > -1 && spaceTrivia.currentSet < Object.keys(spaceTrivia.questions).length) {
            $("#timer").text(spaceTrivia.timer);
            spaceTrivia.timer--;
        }

        else if (spaceTrivia.timer === -1) {
            spaceTrivia.unanswered++;
            spaceTrivia.result = false;
            clearInterval(spaceTrivia.timerId);
            resultId = setTimeout(spaceTrivia.guessResult, 1000);
            $("#results").html("<h3>Out of time! The answer was " + Object.values(spaceTrivia.answers)[spaceTrivia.currentSet] + "</h3>");
        }

        else if (spaceTrivia.currentSet === Object.keys(spaceTrivia.questions).length) {


            $("#results").html(
                "<p>Correct: " + spaceTrivia.correct + "</p>" +
                "<p>Incorrect: " + spaceTrivia.incorrect + "</p>" +
                "<p>Unaswered: " + spaceTrivia.unanswered + "</p>");

            $("#questions").hide();

            $("#start-button").show();
        }

    }
    timerRunning();

    function guessChecker() {

        var resultId;

        var currentAnswer = Object.values(spaceTrivia.answers)[spaceTrivia.currentSet];

        if ($(this).text() === currentAnswer) {

            $(this).addClass("btn-true").removeClass("btn-secondary");

            spaceTrivia.correct++;
            clearInterval(spaceTrivia.timerId);
            resultId = setTimeout(spaceTrivia.guessResult, 1000);
            $("#results").html("<h3>Correct Answer!</h3>");
        }

        else {

            $(this).addClass("btn-false").removeClass("btn-secondary");

            spaceTrivia.incorrect++;
            clearInterval(spaceTrivia.timerId);
            resultId = setTimeout(spaceTrivia.guessResult, 1000);
            $("#results").html("<h3>You lose" + currentAnswer + "</h3>");
        }

    }
    guessChecker();

    function guessResult() {

        spaceTrivia.currentSet++;

        $("#questions").remove();
        $("#results").remove();

        spaceTrivia.nextQuestion();

    }
    guessResult();
})
