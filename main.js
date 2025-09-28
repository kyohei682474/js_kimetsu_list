//基本となるURLを変数に代入する
const API_BASE = 'https://ihatov08.github.io/kimetsu_api/api';

//エンドポイントをラベリングする

const ENDPOINT = { 
  all:        'all.json',
  hashira:    'hashira.json',
  oni:        'oni.json',
  kisatsutai: 'kisatsutai.json',
}

//DOMの取得
const gridElement = document.getElementById('grid');
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
    </div> 
    `
}

//画面機表示作成する
function displaycharactors(charactors){
  //空のデータの場合
  if(!charactors || charactors.length === 0) { 
    gridElement.innerHTML = '<p>表示できる画像がありません</p>'
    return;
  }
  //データが存在している場合
  const cardsHTML = charactors
    .map(charactor => createCharactorCard(charactor))
    .join('');
  gridElement.innerHTML = cardsHTML;
}

//メイン処理、イベント設定

//実際にカテゴリー切り替えとその処理を行う
async function changeCategory(category){
  try{
    showLoading();
    const charactors = await fetchByCat(category) 
    await new Promise(resolve => setTimeout(resolve, 300));
    displaycharactors(charactors);
  } catch(error) { 
    console.log('エラー', error);
  } finally { 
    hideLoading();
  }
}

//ラジオボタンのイベント設定
function setupEventListener(){
  radioButtons.forEach(radio => {
    radio.addEventListener('change', (event)=>{
      if(event.target.checked) { 
        console.log(`カテゴリーの変更:${event.target.value}`) //valueはHTMLで直接指定している
        changeCategory(event.target.value);
      } 
    });
  });
}

//アプリケーションの初期化を行う

async function init() { 
 setupEventListener();
 await changeCategory('all'); 
}

document.addEventListener('DOMContentLoaded', init)