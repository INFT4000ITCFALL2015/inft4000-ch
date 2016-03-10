(function () {

    var QUIZ = [],
        selectedQuiz = [],
        quizName = '';

    $('<section>', { class: 'col-md-8 col-md-offset-2 quiz-game clearfix' }).prependTo('body');
    $('<section>', { class: 'col-md-8 col-md-offset-2 quiz-choices clearfix' }).prependTo('body');

    $.get('../files/quiz.txt', loadApp);

    function loadApp(data) {
        $('.quiz-choices').prepend('<h1>Choose a quiz topic</h1>');
        if (localStorage.userQuizzes) {
            console.log("User made quizzes found");
            data += localStorage.userQuizzes;
        } else {
            console.log("No user made quizzes exist yet");
        }
        QUIZ = data.split('~~');
        $.each(QUIZ, function (index, value) {
            if (value.lastIndexOf('__start__') === 0) {
                var quizName = value.slice('__start__'.length);
                $('<button>', { class: 'quiz-selection btn btn-primary btn-block', id: quizName, text: quizName })
                    .appendTo('section.quiz-choices');
            }
        });
        addListeners();
    }// end loadApp

    function addListeners() {
        $('.quiz-selection').click(function() { startQuiz($(this).attr('id')); });
    }// end addListeners

    function selectAnswer(element) {
        element.siblings('.answer').removeClass('btn-info').addClass('btn-default');
        element.toggleClass('btn-info');
    }

    function refreshQuiz() {
        $('section.quiz-game').empty();
        loadQuestions();
        //startQuiz(quizName);
    }// end refreshQuiz

    function submitQuiz() {
        var correct = 0,
            wrong = 0,
            skipped = 0;
        $('.answer').attr('disabled', true);
        $('#submit').attr('disabled', true);
        $('.quiz-item').each(function() {
            var i = $(this).attr('id'),
                text = $(this).find('.btn-info').text();
            if (selectedQuiz[i].answer === text) {
                $(this).find('.btn-info').toggleClass('btn-info').addClass('btn-success');
                correct++;
            } else if (text.length > 0) {
                $(this).find('.btn-info').toggleClass('btn-info').addClass('btn-danger');
                $(this).find('.question').after(
                    $('<button>', { class: 'show-answer btn btn-sm btn-primary', text: 'Show Answer' })
                );
                $(this).find('.show-answer').after(
                    $('<div>', {
                        class: 'display-answer',
                        text: 'The correct answer is "' + selectedQuiz[i].answer + '".'
                    }).hide()
                )
                wrong++;
            }
            else {
                $(this).find('.question').after(
                    $('<button>', { class: 'show-answer btn btn-sm btn-primary', text: 'Show Answer' })
                );
                $(this).find('.show-answer').after(
                    $('<div>', {
                        class: 'display-answer',
                        text: 'The correct answer is "' + selectedQuiz[i].answer + '".'
                    }).hide()
                )
                skipped++;
            }
        });
        $('.show-answer').click(function () {
            $(this).next().toggle();
        });
        alert("Correct: " + correct + "   Incorrect: " + wrong + "   Skipped: " + skipped);
    }// end submitQuiz

    function startQuiz(selection) {
        quizName = selection;
        loadQuiz(selection);
        loadQuestions();
    }// end startQuiz

    function loadQuiz(selection) {
        var start = QUIZ.indexOf('__start__' + selection) + 1,
            stop = QUIZ.indexOf('__end__' + selection),
            temp = QUIZ.slice(start, stop),
            i = 0;
        selectedQuiz = [];
        while (temp.length > 0) {
            selectedQuiz.push({
                question: temp[0],
                choices: [ temp[1], temp[2], temp[3], temp[4] ],
                answer: temp[1],
                index: i
            });
            temp = temp.slice(5);
            i++;
        }
    }// end loadQuiz

    function loadQuestions() {
        var quiz = JSON.parse(JSON.stringify(selectedQuiz)),
            questionsPerTest = 5;

        $('.quiz-choices').hide();

        while (questionsPerTest > 0 && quiz.length > 0) {
            var availableQuestions = quiz.length,
                index= Math.floor(Math.random() * availableQuestions);

            $('<article>', { class: 'quiz-item clearfix', id: quiz[index].index }).appendTo('section.quiz-game');
            $('<div>', { class: 'question', text: quiz[index].question }).appendTo('#' + quiz[index].index);
            $('<div>', { class: 'buttons' }).appendTo('#' + quiz[index].index);
            while (quiz[index].choices.length > 0) {
                var j = Math.floor(Math.random() * quiz[index].choices.length),
                    b = $('<button>', { type: 'button', class: 'answer btn btn-default', text: quiz[index].choices[j] });
                $('#' + quiz[index].index).find('.buttons').append(b);
                quiz[index].choices.splice(j, 1);
            }
            quiz.splice(index, 1);
            questionsPerTest--;
        }

        $('<button>', { class: 'btn btn-default', id: 'refresh', text: 'Refresh' }).appendTo('section.quiz-game');
        $('<button>', { class: 'btn btn-default', id: 'submit', text: 'Submit' }).appendTo('section.quiz-game');

        $('#submit').click(function() { submitQuiz(); });
        $('#refresh').click(function() { refreshQuiz() });
        $('.answer').click(function() { selectAnswer($(this)); });
    }// end loadQuestions

})();