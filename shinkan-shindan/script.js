// 質問データと、「Yes」を選んだ時に加算されるポイント
const questions = [
    { text: "大学生活、新しい友達をたくさん作りたい？", point: 1 },
    { text: "休みの日は一人で過ごすより友達と遊びに行きたい", point: 2 },
    { text: "ぶっちゃけ、テニスの経験はあまりない（または初心者だ）？", point: 2 },
    { text: "運動して汗をかくより、美味しいご飯を食べている時の方が幸せだ。", point: 3 },
    { text: "ぶっちゃけ、テニスコートに行くより、夜景を見にドライブに行きたい。", point: 4 }
];

let currentQuestionIndex = 0;
let totalScore = 0;

// 診断をスタートする関数
function startQuiz() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('question-screen').classList.active = false;
    // アニメーションを再適用するための小さなハック
    setTimeout(() => {
        document.getElementById('question-screen').classList.add('active');
        showQuestion();
    }, 50);
}

// 質問を表示する関数
function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Q${currentQuestionIndex + 1} / 5`;
    document.getElementById('question-text').innerText = q.text;
}

// 回答ボタンを押した時の処理
function answer(isYes) {
    if (isYes) {
        totalScore += questions[currentQuestionIndex].point;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // 次の質問へ
        document.getElementById('question-screen').classList.remove('active');
        setTimeout(() => {
            document.getElementById('question-screen').classList.add('active');
            showQuestion();
        }, 50); // 一瞬消してふわっと出す
    } else {
        // 全問終了したら結果画面へ
        showResult();
    }
}

// （前略：上部のコードはそのまま）

// 結果を判定して表示する関数
function showResult() {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    let resultText = "";
    let imageSrc = "";

    // totalScoreの最大値は 1+2+2+3+4 = 12点
    if (totalScore >= 11) {
        resultText = "適性度100000％\n【アルプラの奇跡】";
        imageSrc = "kiseki.png"; // ←追加：用意した画像のファイル名にする
    } else if (totalScore >= 9) {
        resultText = "適性度77777%\n【ユニバが似合うアルプラの姫】";
        imageSrc = "hime.png"; // ←追加
    } else if (totalScore >= 7) {
        resultText = "適性度10000％\n【アルプラ唯一の理解者】";
        imageSrc = "rikaisha.png"; // ←追加
    } else if (totalScore === 6) {
        resultText = "適性度7777%\n【助手席のプロフェッショナル】";
        imageSrc = "joshuseki.png"; // ←追加
    } else if (totalScore >= 4) {
        resultText = "適性度1000%\n【テニスラケットを持った美食家】";
        imageSrc = "bishokuka.png"; // ←追加
    } else if (totalScore === 3) {
        resultText = "適性度777%\n【テニスウェアを着たタダ飯ハンター】";
        imageSrc = "tadamashi.png"; // ←追加
    } else if (totalScore >= 1) {
        resultText = "適性度100%\n【迷える子羊】";
        imageSrc = "kohitsuji.png"; // ←追加
    } else {
        resultText = "適性度1％\n【大坂なおみ】";
        imageSrc = "osaka.jpeg"; // ←追加
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('result-image').src = imageSrc;
}