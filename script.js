// 質問データとポイント
const questions = [
    { text: "大学生活、新しい友達をたくさん作りたい？", point: 1 },
    { text: "休みの日は一人で過ごすより友達と遊びに行きたい", point: 1 },
    { text: "ぶっちゃけ、テニスの経験はあまりない（または初心者だ）？", point: 2 },
    { text: "運動して汗をかくより、美味しいご飯を食べている時の方が幸せだ。", point: 3 },
    { text: "ぶっちゃけ、テニスコートに行くより、夜景を見にドライブに行きたい。", point: 4 }
];

let currentQuestionIndex = 0;
let totalScore = 0;

function startQuiz() {
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('question-screen').classList.active = false;
    setTimeout(() => {
        document.getElementById('question-screen').classList.add('active');
        showQuestion();
    }, 50);
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Q${currentQuestionIndex + 1} / 5`;
    document.getElementById('question-text').innerText = q.text;

    // 次の質問が表示される際、すべてのボタンの選択状態をリセット
    const allButtons = document.querySelectorAll('.mbti-circle');
    allButtons.forEach(button => button.classList.remove('selected'));
}

function answer(multiplier, event) {
    // スコア計算（ボタンの倍率を掛ける）
    totalScore += questions[currentQuestionIndex].point * multiplier;

    // クリックされたボタンに色を塗ってチェックマークを表示
    const clickedButton = event.currentTarget;
    const allButtons = document.querySelectorAll('.mbti-circle');
    allButtons.forEach(button => button.classList.remove('selected'));
    clickedButton.classList.add('selected');

    currentQuestionIndex++;

    // チェックマークを見せるため、0.3秒（300ミリ秒）だけ待ってから次へ進む
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            document.getElementById('question-screen').classList.remove('active');
            setTimeout(() => {
                document.getElementById('question-screen').classList.add('active');
                showQuestion();
            }, 50);
        }, 300);
    } else {
        setTimeout(() => {
            showResult();
        }, 300);
    }
}

function showResult() {
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    // 小数点を四捨五入して整数にする
    let finalScore = Math.round(totalScore);

    let resultText = "";
    let imageSrc = "";
    let resultDesc = "";

    // 11点満点で分岐
    if (finalScore === 11) {
        resultText = "適性度100000％\n【アルプラの奇跡】";
        imageSrc = "kiseki.png";
        resultDesc = `あなたは10年に一人の、奇跡ともいえる逸材です。アルプラに入るために生まれてきたといっても過言ではないでしょう。
大学生活を全力で楽しみたいと感じているあなたは、数々のイケイケサークルの新歓に行くのだと思います。しかし、最終的に戻ってくるのはアルファプラスただ一つでしょう。
新歓を受けられるのは大学生活でほとんどありません。ですから、まずはたくさんのサークルに行ってみてください！

【あなたのラッキー新歓】
BBQ、ミスド、マック大食い、花火`;
    } else if (finalScore >= 10) {
        resultText = "適性度77777%\n【ユニバ姫】";
        imageSrc = "hime.png";
        resultDesc = `フットワークの軽さと遊びへの熱量はサークル随一！仲間思いで協調性のあるあなたは、サークルのみんなにもすぐに好かれます。ユニバやドライブなど、映えるイベントには絶対に欠かせない存在になるでしょう。サンバイザーの代わりにカチューシャをつけて、大学生活を誰よりも華やかに彩りましょう！

【あなたのラッキー新歓】
巨大パフェ、アサイー、ドライブ`;
    } else if (finalScore >= 8) {
        resultText = "適性度10000％\n【専属パートナー】";
        imageSrc = "rikaisha.png";
        resultDesc = `アルプラの良さに入学前から気づいてくれているアルプラ専属パートナーのあなた。無駄に汗を流すより、クーラーの効いた部屋で遊んだり、美味しいものを食べる方が有意義だと知っている賢者です。あなたのそのフラットで合理的な価値観、うちのサークルにドンピシャです。今すぐ新歓に来てみてください！

【あなたのラッキー新歓】
サイゼリヤ、ペッパーランチ、BBQ、ミスド`;
    } else if (finalScore >= 6) {
        resultText = "適性度7777%\n【助手席のプロ】";
        imageSrc = "joshuseki.png";
        resultDesc = `車の運転はしない（あるいはペーパードライバー）だけど、お出かけは大好きなあなた！「運転して〜！」と甘えるのが上手く、車内ではDJやナビ、あるいは爆睡を担当する立派な助手席のプロです。アルプラのドライブ企画で、あちこちの夜景や美味しいものを制覇しに行きましょう！

【あなたのラッキー新歓】
ドライブ、韓国料理、パンケーキ`;
    } else if (finalScore >= 4) {
        resultText = "適性度1000%\n【テニサーのトリコ】";
        imageSrc = "bishokuka.png";
        resultDesc = `食で世界を救おうとしている野心家。最初は少しテニスをやる気だったかもしれませんが、あなたの本能は「食」に向いています。「運動後のご飯が美味しい」から「ご飯のためにちょっと動く」へ、そして「もうご飯だけでよくない？」へと進化するのは時間の問題です。美味しいご飯企画には必ず顔を出してください！

【あなたのラッキー新歓】
寿司、焼肉パーティー、サーティーワン`;
    } else if (finalScore === 3) {
        resultText = "適性度777%\n【タダ飯ハンター】";
        imageSrc = "tadamashi.png";
        resultDesc = `素晴らしい嗅覚です。新歓期において最も賢い立ち回りは「いかに食費を浮かせるか」。テニスへの興味は薄いかもしれませんが、タダで美味しいものを食べるためならどこへでも行くその行動力、嫌いじゃありません。まずはアルプラの新歓で、心ゆくまでお腹を満たしていってください！ただし、健康には気を付けて！

【あなたのラッキー新歓】
ナン大食い、タコパ、マック大食い`;
    } else if (finalScore >= 1) {
        resultText = "適性度100%\n【迷える子羊】";
        imageSrc = "kohitsuji.png";
        resultDesc = `誰だって迷うことはあります。優しい性格のあなたは、他人への思いやりであふれているせいで、自分に厳し過ぎる時が多いようです。たまには甘えてみてもいいんですよ！私たちアルファプラスはあなたの味方です。頼りになる先輩もたくさんいるので一回だけでも新歓に来てみてください！

【あなたのラッキー新歓】
しゃぶしゃぶ、タコパ、ギョーザ`;
    } else {
        resultText = "適性度1％\n【大坂なおみ】";
        imageSrc = "osaka.png";
        resultDesc = `圧倒的なテニスへの情熱！ウィンブルドンを目指すあなたの熱気に、アルプラの部員たちは震え上がっています。残念ながら、うちのサークルの部員は誰一人として、あなたのその強烈なサーブを受け止めることができません。体育会系テニス部への入部を強くお勧めします！でも、息抜きに寿司が食べたくなったら遊びに来てくださいね。

【あなたのラッキー新歓】
筋トレ、プロテイン大食い、寿司`;
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('result-image').src = imageSrc;
    document.getElementById('result-desc').innerText = resultDesc;
}