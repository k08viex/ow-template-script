//
//  トップに戻るボタン
//  該当の要素にはdata-btn=to-topを付与
//---------------------------

let viewpointBtnToTop = 100;    //このスクロール量に達したら表示
let btnToTop = document.querySelector("[data-btn=to-top]");

function viewBtnToTop(){
    let scrollY = window.scrollY;   //スクロール量
    if(scrollY > viewpointBtnToTop){    //スクロール量がviewpointの値を超えたら
        btnToTop.classList.add("is-visible");
    }else{
        btnToTop.classList.remove("is-visible");
    }
}

function scrollTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

window.addEventListener("scroll",viewBtnToTop);
btnToTop.addEventListener("click",scrollTop);

//
//  フェードアップアニメーション
//  該当の要素にfadeクラスを付与しておく
//------------------------------------------
    let repeat = false;     //繰り返しするか？
    let fades = document.querySelectorAll(".fade");
    var window_height = window.innerHeight;
    let windowY = window.innerWidth;
    //表示されるポイント
    let viewpointFadeup;
    if( windowY > 769 ) {
        viewPointFadeup = window_height - 100;
    }else{
        viewPointFadeup = window_height - 25;
    }

    //-------------------------------------
    //  フェードアップの関数
    //  elm：フェードアップする要素　※デフォルトは .fade
    //-------------------------------------
    function defaultFadeUp(elm){
        let thisHeight = elm.getBoundingClientRect().top;//要素の現在地を取得
        if(viewPointFadeup > thisHeight){//現在地がviewpointより小さくなったら表示
            elm.classList.add("fadeUp");
        }else{
            if( repeat === true && elm.classList.contains("fadeUp")){
                elm.classList.remove("fadeUp");
            }
        }
    }
    //-------------------------------------
    //  フェードアップの関数（時間差）
    //  elm：フェードアップする要素　※.fade以外で設定する
    //  time：ミリ秒
    //-------------------------------------
    function timeLagFade(elm,time){
        setTimeout(function(){ defaultFadeUp(elm) },time);
    }

    window.addEventListener("DOMContentLoaded",function(){
        fades.forEach(function(fade){
            defaultFadeUp(fade);
        });
    });

    window.addEventListener("scroll",function(){
        fades.forEach(function(fade){
            defaultFadeUp(fade);
        });
    });

//
//  ページ内リンク
//  safari対策でsmoothscroll.jsを読み込んでおく
//------------------------------------------
    window.addEventListener("DOMContentLoaded",function(){
        let anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(function(anchor){
            anchor.addEventListener("click",function(e){
                e.preventDefault();
                let target = anchor.getAttribute("href");
                let targetElement = document.querySelector(target);
                let position = targetElement.getBoundingClientRect().top + window.offsetHeight;
                window.scrollTo({
                    top: position,
                    behavior: "smooth",
                });
            });
        });
    });

//
//  タブメニュー
//  ・タブのボタンに「data-tab="btn"」を付与する。
//  ・タブのエリアに「data-tab="area"」を付与する。
//------------------------------------------

window.addEventListener("DOMContentLoaded",function(){

    //　変数群
    let tabBtns = document.querySelectorAll("[data-tab=btn]");
    let tabAreas = document.querySelectorAll("[data-tab=area]");
    let tabAreaHeight = new Array;

    //　タブエリアの中で一番高い要素に、全ての高さを合わせる
    //　①要素の高さを取得
        for(var i = 0; i < tabAreas.length; i++){
            tabAreaHeight[i] = tabAreas[i].offsetHeight;
        }
    //　②最大値を変数maxに代入
        var max = Math.max(...tabAreaHeight);
    
    //　③全ての要素の高さをmaxに合わせ、activeクラスが無い要素にhideクラスを付与
    //　　※わざわざhideをつけるのは、予めdisplay:noneを与えておくと②のheightの値が取れないため。
    tabAreas.forEach(tabArea => {
        tabArea.style.height = max+"px";
        if(!tabArea.classList.contains("active")){
            tabArea.classList.add("hide");
        }
    });

    //　タブモーション
    tabBtns.forEach(tabBtn => {
        tabBtn.addEventListener("click",function(){
            let thisContent = tabBtn.dataset.content
            tabAreas.forEach(tabArea => {
                let content = tabArea.dataset.content;
                if(content === thisContent) {
                    tabAreas.forEach(remove =>{
                        remove.classList.remove("active");
                        remove.classList.add("hide");
                    });
                    tabArea.classList.remove("hide");
                    tabArea.classList.add("active");
                }
            });
        });
    });

});