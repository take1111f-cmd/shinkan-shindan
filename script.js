// 質問データとポイント（★合計100点満点になるよう重み付け！）
const questions = [
    { text: "大学生活、新しい友達をたくさん作りたい？", point: 5 },   // ベース点
    { text: "休みの日は一人で過ごすより友達と遊びに行きたい", point: 10 },  // ベース点
    { text: "ぶっちゃけ、テニスの経験はあまりない（または初心者だ）？", point: 20 }, // ガチ勢フィルター
    { text: "運動して汗をかくより、美味しいご飯を食べている時の方が幸せだ。", point: 30 }, // アルプラ的価値観
    { text: "ぶっちゃけ、テニスコートに行くより、夜景を見にドライブに行きたい。", point: 35 }  // 究極のフィルター
];

let currentQuestionIndex = 0;
let totalScore = 0;
let currentMultiplier = null;

// スタートボタンを押した時
function startQuiz() {
    const startScreen = document.getElementById('start-screen');
    startScreen.classList.add('fade-out');
    
    setTimeout(() => {
        startScreen.classList.remove('active', 'fade-out');
        document.getElementById('question-screen').classList.add('active');
        showQuestion();
    }, 300);
}

// 質問を表示する処理
function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Q${currentQuestionIndex + 1} / 5`;
    document.getElementById('question-text').innerText = q.text;

    // ボタンの選択状態をリセット
    const allButtons = document.querySelectorAll('.mbti-circle');
    allButtons.forEach(button => button.classList.remove('selected'));

    // 次へボタンを「押せない状態」に戻す
    const nextBtn = document.getElementById('next-btn');
    nextBtn.disabled = true;

    // 最後の質問ならボタンの文字を変える
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerText = "結果を見る 👀";
    } else {
        nextBtn.innerText = "次へ ➡";
    }
}

// 円のボタンが押された時の処理
function answer(multiplier, event) {
    currentMultiplier = multiplier;

    const clickedButton = event.currentTarget;
    const allButtons = document.querySelectorAll('.mbti-circle');
    allButtons.forEach(button => button.classList.remove('selected'));
    
    clickedButton.classList.add('selected');

    // 選ばれたら「次へ」ボタンを押せるようにする
    document.getElementById('next-btn').disabled = false;
}

// 次へ（または結果を見る）ボタンが押された時の処理
function nextQuestion() {
    totalScore += questions[currentQuestionIndex].point * currentMultiplier;
    currentQuestionIndex++;

    const qScreen = document.getElementById('question-screen');
    qScreen.classList.add('fade-out');

    setTimeout(() => {
        if (currentQuestionIndex < questions.length) {
            qScreen.classList.remove('active', 'fade-out');
            setTimeout(() => {
                qScreen.classList.add('active');
                showQuestion();
            }, 50);
        } else {
            qScreen.classList.remove('active', 'fade-out');
            setTimeout(() => {
                document.getElementById('result-screen').classList.add('active');
                showResult();
            }, 50);
        }
    }, 300);
}

// 結果を表示する処理
function showResult() {
    // 100点満点で四捨五入
    let finalScore = Math.round(totalScore);

    // ★点数がちゃんと計算されているか、開発者ツール(F12)で確認できる裏技コード★
    console.log("あなたの最終スコアは: " + finalScore + "点");

    let resultText = "";
    let imageSrc = "";
    let resultDesc = "";

    // ★100点満点の新しいボーダーライン★
    if (finalScore >= 95) {
        // 95〜100点（ほぼすべて一番左を選んだ人）
        resultText = "適性度100000％\n【アルプラの奇跡】";
        imageSrc = "kiseki.png";
        resultDesc = `あなたは10年に一人の、奇跡ともいえる逸材です。アルプラに入るために生まれてきたといっても過言ではないでしょう。
大学生活を全力で楽しみたいと感じているあなたは、数々のイケイケサークルの新歓に行くのだと思います。しかし、最終的に戻ってくるのはアルファプラスただ一つでしょう。
新歓を受けられるのは大学生活でほとんどありません。ですから、まずはたくさんのサークルに行ってみてください！

【あなたのラッキー新歓】
BBQ、ミスド、マック大食い、花火`;
    } else if (finalScore >= 80) {
        // 80〜94点（遊び・ドライブへの熱量がかなり高い）
        resultText = "適性度77777%\n【ユニバ姫】";
        imageSrc = "hime.png";
        resultDesc = `フットワークの軽さと遊びへの熱量はサークル随一！仲間思いで協調性のあるあなたは、サークルのみんなにもすぐに好かれます。ユニバやドライブなど、映えるイベントには絶対に欠かせない存在になるでしょう。サンバイザーの代わりにカチューシャをつけて、大学生活を誰よりも華やかに彩りましょう！

【あなたのラッキー新歓】
巨大パフェ、アサイー、ドライブ`;
    } else if (finalScore >= 65) {
        // 65〜79点（テニスより遊び派の優等生）
        resultText = "適性度10000％\n【専属パートナー】";
        imageSrc = "rikaisha.png";
        resultDesc = `アルプラの良さに入学前から気づいてくれているアルプラ専属パートナーのあなた。無駄に汗を流すより、クーラーの効いた部屋で遊んだり、美味しいものを食べる方が有意義だと知っている賢者です。あなたのそのフラットで合理的な価値観、うちのサークルにドンピシャです。今すぐ新歓に来てみてください！

【あなたのラッキー新歓】
サイゼリヤ、ペッパーランチ、BBQ、ミスド`;
    } else if (finalScore >= 50) {
        // 50〜64点（オール中立、または少し遊び寄り）
        resultText = "適性度7777%\n【助手席のプロ】";
        imageSrc = "joshuseki.png";
        resultDesc = `車の運転はしない（あるいはペーパードライバー）だけど、お出かけは大好きなあなた！「運転して〜！」と甘えるのが上手く、車内ではDJやナビ、あるいは爆睡を担当する立派な助手席のプロです。アルプラのドライブ企画で、あちこちの夜景や美味しいものを制覇しに行きましょう！

【あなたのラッキー新歓】
ドライブ、韓国料理、パンケーキ`;
    } else if (finalScore >= 35) {
        // 35〜49点（少しテニス寄りだが、食への興味もある）
        resultText = "適性度1000%\n【アルプラのトリコ】";
        imageSrc = "bishokuka.png";
        resultDesc = `食で世界を救おうとしている野心家。最初は少しテニスをやる気だったかもしれませんが、あなたの本能は「食」に向いています。「運動後のご飯が美味しい」から「ご飯のためにちょっと動く」へ、そして「もうご飯だけでよくない？」へと進化するのは時間の問題です。美味しいご飯企画には必ず顔を出してください！

【あなたのラッキー新歓】
寿司、焼肉パーティー、サーティーワン`;
    } else if (finalScore >= 20) {
        // 20〜34点（テニスしたいけど、タダ飯には釣られる）
        resultText = "適性度777%\n【タダ飯ハンター】";
        imageSrc = "tadamashi.png";
        resultDesc = `素晴らしい嗅覚です。新歓期において最も賢い立ち回りは「いかに食費を浮かせるか」。テニスへの興味は薄いかもしれませんが、タダで美味しいものを食べるためならどこへでも行くその行動力、嫌いじゃありません。まずはアルプラの新歓で、心ゆくまでお腹を満たしていってください！ただし、健康には気を付けて！

【あなたのラッキー新歓】
ナン大食い、タコパ、マック大食い`;
    } else if (finalScore >= 5) {
        // 5〜19点（友達は欲しいが、基本は超テニスガチ勢）
        resultText = "適性度100%\n【迷える子羊】";
        imageSrc = "kohitsuji.png";
        resultDesc = `誰だって迷うことはあります。優しい性格のあなたは、他人への思いやりであふれているせいで、自分に厳し過ぎる時が多いようです。たまには甘えてみてもいいんですよ！私たちアルファプラスはあなたの味方です。頼りになる先輩もたくさんいるので一回だけでも新歓に来てみてください！

【あなたのラッキー新歓】
しゃぶしゃぶ、タコパ、ギョーザ`;
    } else {
        // 0〜4点（友達作りにも遊びにも全く興味がない、本物の修羅）
        resultText = "適性度1％\n【大坂なおみ】";
        imageSrc = "osaka.jpeg";
        resultDesc = `圧倒的なテニスへの情熱！ウィンブルドンを目指すあなたの熱気に、アルプラの部員たちは震え上がっています。残念ながら、うちのサークルの部員は誰一人として、あなたのその強烈なサーブを受け止めることができません。体育会系テニス部への入部を強くお勧めします！でも、息抜きに寿司が食べたくなったら遊びに来てくださいね。

【あなたのラッキー新歓】
筋トレ、プロテイン大食い、寿司`;
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('result-image').src = imageSrc;
    document.getElementById('result-desc').innerText = resultDesc;
}