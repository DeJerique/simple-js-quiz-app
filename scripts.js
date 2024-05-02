const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

function showAnswerPopup(isCorrect) {
    if (isCorrect) {
        Swal.fire({
            title: 'Correct!',
            icon: 'success',
            text: 'Your answer is correct.',
        });
    } else {
        Swal.fire({
            title: 'Wrong!',
            icon: 'error',
            text: 'Your answer is incorrect.',
        });
    }
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started');
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    // swal
    showAnswerPopup(correct === "true");

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'what is my name',
        answers: [
            { text: 'sërvêr', correct: true },
            { text: 'michael', correct: false },
        ]
    },
    {
        question: '2 ÷ 4',
        answers: [
            { text: '1/5', correct: true },
            { text: '10', correct: false },
            { text: '0.5', correct: true },
            { text: '1', correct: false },
        ]
    },
    {
        question: 'what is my Profession',
        answers: [
            { text: 'Carpenter', correct: false },
            { text: 'Software Dev', correct: true },
            { text: 'Typewriter', correct: false },
        ]
    },
    {
        "question": "8 + 5",
        "answers": [
            { "text": "15", "correct": false },
            { "text": "10", "correct": false },
            { "text": "18", "correct": false },
            { "text": "13", "correct": true },
        ]
    },
    {
        "question": "12 - 7",
        "answers": [
            { "text": "8", "correct": false },
            { "text": "3", "correct": false },
            { "text": "5", "correct": true },
            { "text": "10", "correct": false }
        ]
    },
    {
        "question": "6 × 9",
        "answers": [
            { "text": "45", "correct": false },
            { "text": "63", "correct": false },
            { "text": "54", "correct": true },
            { "text": "36", "correct": false }
        ]
    },
    {
        "question": "What is the capital of France?",
        "answers": [
            { "text": "London", "correct": false },
            { "text": "Paris", "correct": true },
            { "text": "Berlin", "correct": false },
            { "text": "Madrid", "correct": false }
        ]
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "answers": [
            { "text": "Venus", "correct": false },
            { "text": "Mars", "correct": true },
            { "text": "Jupiter", "correct": false },
            { "text": "Saturn", "correct": false }
        ]
    },
    {
        "question": "What is the largest mammal?",
        "answers": [
            { "text": "Blue Whale", "correct": true },
            { "text": "Elephant", "correct": false },
            { "text": "Giraffe", "correct": false },
            { "text": "Hippopotamus", "correct": false }
        ]
    },
    {
        "question": "Which famous scientist developed the theory of relativity?",
        "answers": [
            { "text": "Isaac Newton", "correct": false },
            { "text": "Albert Einstein", "correct": true },
            { "text": "Galileo Galilei", "correct": false },
            { "text": "Marie Curie", "correct": false }
        ]
    },
]
