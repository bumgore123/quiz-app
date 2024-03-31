const QUESTION = document.getElementById("question")
const ANSWER1 = document.getElementById("answer1")
const ANSWER2 = document.getElementById("answer2")
const ANSWER3 = document.getElementById("answer3")
const ANSWER4 = document.getElementById("answer4")
const URL = "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple"

let 질문_리스트 = [];
let 스코어 = 0;
let 현재_질문 = 0;

// loadQuestions: 서버한테서 질문들을 불러오는 함수
function loadQuestions() {
    // 서버한테서 정보를 불러온다
    fetch(URL).then((response) => {
        // 컴퓨터가 이해하기 쉬운 JSON 형태로 변역해준다
        return response.json();
    }).then((json_response) => {
        // 문제_리스트
        질문_리스트 = json_response.results;
        showQuestionsAndAnswers();
    }).catch(e => {
        console.log("e", e);
    })
}

// displayQuestion: 현재 질문을 HTML 에 띄우는 함수
function showQuestionsAndAnswers() {
    QUESTION.innerText = 질문_리스트[현재_질문].question;
    ANSWER1.onclick = () => selectAnswer(ANSWER1.innerText, 답);
    ANSWER2.onclick = () => selectAnswer(ANSWER2.innerText, 답);
    ANSWER3.onclick = () => selectAnswer(ANSWER3.innerText, 답);
    ANSWER4.onclick = () => selectAnswer(ANSWER4.innerText, 답);
    // 답들을 섞어야됨

    const 답 = 질문_리스트[현재_질문].questions[Math.random() * questions];

    ANSWER1.innerText = 답
    ANSWER2.innerText = 답
    ANSWER3.innerText = 답
    ANSWER4.innerText = 답

    if (ANSWER1 === ANSWER2) {
        ANSWER2.innerText = 답
    }
    if (ANSWER1 === ANSWER3) {
        ANSWER3.innerText = 답
    }
    if (ANSWER1 === ANSWER4) {
        ANSWER4.innerText = 답
    }
    if (ANSWER2 === ANSWER3) {
        ANSWER3.innerText = 답
    }
    if (ANSWER2 === ANSWER4) {
        ANSWER4.innerText = 답
    }
    if (ANSWER3 === ANSWER4) {
        ANSWER4.innerText = 답
    }

}

// getNextQuestion: 다음 질문을 갖고오는 함수
function getNextQuestion() {
    // 퀴즈가 끝났을때 (마지막 질문일때)
    if (현재_질문 === 9) {
        alert("Your score is: " + 스코어)
        resetgame();
    } else {
        현재_질문 += 1;
        showQuestionsAndAnswers();
    }
}

// selectAnswer: 유저가 답을 골랐을때 실행할 함수
function selectAnswer(버튼_글씨, 답) {
    // 답이 맞는지 확인
    if (버튼_글씨 === 답) {
        스코어 += 1;
    }
    getNextQuestion();
}

function resetgame() {
    현재_질문 = 0
    스코어 = 0
    loadQuestions();
}


loadQuestions();