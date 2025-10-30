/**
 * FAQとナビゲーションをつくる
 */
// JSONファイルの読み込み
import faqJson from '../data/faq.json' with { type: 'json' };

// FAQとナビゲーション要素取得
const app = document.getElementById('app');
const navInner = document.querySelector('nav>ul');

// JSONファイルからデータを展開
faqJson.forEach(cat => {
    // console.log(cat);
    // section要素にid属性つける
    let sectionElm = document.createElement('section');
    sectionElm.id = cat.id;
    // ナビゲーションのリンク作る
    let navLinkItem = document.createElement('li');
    let navLink = document.createElement('a');
    navLink.innerText = cat.category;
    navLink.href=`#${cat.id}`;
    navLinkItem.insertAdjacentElement('beforeend',navLink);
    navInner.insertAdjacentElement('beforeend',navLinkItem);
    // h2要素にFAQのカテゴリ名を入れる
    let h2Elm = document.createElement('h2');
    h2Elm.innerText = cat.category;

    // カテゴリごとのul要素を作る
    let faqWrapperElm = document.createElement('ul');
    faqWrapperElm.classList.add('faq-wrapper');

    // ここの質問と回答のデータを展開
    cat.items.forEach(item => {
        //    console.log(item); 
        let liElm = document.createElement('li');
        liElm.classList.add('faq-item');
        // detailsとsummaryを作る
        let detailsElm = document.createElement('details');
        let summaryElm = document.createElement('summary');
        let pElm = document.createElement('p');
        detailsElm.insertAdjacentElement('afterbegin', summaryElm);
        detailsElm.insertAdjacentElement('beforeend', pElm);
        pElm.innerText = item.answer;
        // 質問と回答のテキストデータを書く要素に入れる
        summaryElm.innerText = item.question;
        liElm.insertAdjacentElement('beforeend', detailsElm);
        faqWrapperElm.insertAdjacentElement('beforeend', liElm);

        // 各カテゴリ内で、アイテムが一つしか開かないように制御する
        summaryElm.addEventListener('click', (e) => {
            if (!e.target.parentElement.open) {
                let section = summaryElm.closest('section');
                // console.log(section);
                let openContent = section.querySelector('[open]');
                // console.log(openContent);
                if (openContent) {
                    openContent.removeAttribute('open');
                }
            }
        });
    });

    // console.log(faqWrapperElm);


    sectionElm.insertAdjacentElement('afterbegin', h2Elm);
    sectionElm.insertAdjacentElement('beforeend', faqWrapperElm);
    // console.log(sectionElm);
    app.insertAdjacentElement('beforeend', sectionElm);
});

/**
 * ある程度下にスクロールするとヘッダーが小さくなる機能
 */
const headerElm = document.querySelector('header');
// 監視対象の要素を取得
const targetElm = document.querySelector('h1');
// 交差オプション
const options ={
    root: null,
    rootMargin: "0px",
    threshold: 0
}
// 交差オブザーバーのインスタンスを生成
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            // console.log(targetElm);
            headerElm.classList.add('shrink');
        }else{
            headerElm.classList.remove('shrink');
        }
    })
},options);
// 監視対象を指定
observer.observe(targetElm);

// スクロールイベント版
// window.addEventListener('scroll',()=>{
//     let scrollY = window.scrollY;
//     // console.log(scrollY);
//     if(scrollY > 200){
//         headerElm.classList.add('shrink');
//     }else{
//         headerElm.classList.remove('shrink');
//     }
// });