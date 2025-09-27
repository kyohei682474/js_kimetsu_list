//基本となるURLを変数に代入する
const API_BASE = 'https://ihatov08.github.io/kimetsu_api/api';

//エンドポイントをラベリングする
const ENDPOINT = { 
  all:        'all.json',
  hashira:    'hashira.json',
  oni:        'oni.json',
  kisatsutai: 'kisatsutai.json',
}

const LABELS = {
  all: '全キャラクター',
  hashira: '柱',
  oni: '鬼',
  kisatsutai: '鬼殺隊',
} 



//DOMの取得
const grid = document.getElementById('grid');
const loading = document.getElementById('loading');
const radioButtons = document.querySelectorAll('input[name="cat"]');


//loadingの制御を行う
///loadingを表示させるための関数定義
function showLoading(){
  loading.classList.add("show");
}

///ローディングを隠す
function hideLoading(){
  loading.classList.remove("show");
}

///APIからデータを取得する
async function fetchByCat(cat){
  //カテゴリーの選択をしてURLを作成
  const file = ENDPOINT[cat];
  const url = `${API_BASE}/${file}`;
  const res = await fetch(url);
  if(!res.ok) { 
    throw new Error('通信エラー');
  }
  const charactors = await res.json();
  return charactors; 

}

///キャラクターの個別情報を取得し表示
//キャラクターのカード作成
function createCharactorCard(charactor){
  return `
    <div class="card">
      <img
        class="thumb"
        src="https://ihatov08.github.io${charactor.image}"
        alt="${charactor.name}"
      >
      <div class="body">
        <h3 class="name">${charactor.name}</h3>
        <p class="category">${charactor.category}</p>  
      </div>
    </div>; 
    `
}

//画面機表示作成する
function displaychractors(charactors){
  if(!charactors || charactors.length === 0) { 
    grid.innerHTML = '<p>表示できる画像がありません</p>'
    return;
  }



}
