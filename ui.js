//UIの制御を行うファイル
//DOMの取得
const gridElement = document.getElementById('grid');
const loading = document.getElementById('loading');
const radioButtons = document.querySelectorAll('input[name="cat"]');


//loadingの制御を行う
///loadingを表示させるための関数定義
export function showLoading(){
  loading.classList.add("show");
}

///ローディングを隠す
export function hideLoading(){
  loading.classList.remove("show");
}



///キャラクターの個別情報を取得し表示
//キャラクターのカード作成
export function createCharacterCard(character){
  return `
    <div class="card">
      <img
        class="thumb"
        src="https://ihatov08.github.io${character.image}"
        alt="${character.name}"
      >
      <div class="body">
        <h3 class="name">${character.name}</h3>
        <p class="category">${character.category}</p>  
      </div>
    </div> 
    `
} 

//画面機表示作成する
export function displayCharacters(characters){
  //空のデータの場合
  if(!characters || characters.length === 0) { 
    gridElement.innerHTML = '<p>表示できる画像がありません</p>'
    return;
  }
  //データが存在している場合
  const cardsHTML = characters
    .map(character => createCharacterCard(character))
    .join('');
  gridElement.innerHTML = cardsHTML;
}

//メイン処理、イベント設定



//ラジオボタンのイベント設定
export function setupEventListener(){
  radioButtons.forEach(radio => {
    radio.addEventListener('change', (event)=>{
      if(event.target.checked) { 
        console.log(`カテゴリーの変更:${event.target.value}`) //valueはHTMLで直接指定している
        changeCategory(event.target.value);
      } 
    });
  });
}