const questions =[
    {
        question : "Which team in ipl never won a single cup?",
        answers:[
            {text:"CSK",correct:false},{text:"MI",correct:false},
            {text:"RCB",correct:true},{text:"RR",correct:false}
        ]
    },{
        question : "Which team score less team total in  ipl?",
        answers:[
            {text:"CSK",correct:false},{text:"RCB",correct:true},
            {text:"MI",correct:false},{text:"RR",correct:false}
        ]
    },{
        question : "Which team in ipl never won a fair play award?",
        answers:[
            {text:"CSK",correct:false},{text:"MI",correct:false},
            {text:"RCB",correct:true},{text:"RR",correct:false}
        ]
    },{
        question : "Which team in ipl never won a final?",
        answers:[
            {text:"RCB",correct:true},{text:"MI",correct:false},
            {text:"CSK",correct:false},{text:"RR",correct:false}
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". " +currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`Your Score ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
// showQuestion();


