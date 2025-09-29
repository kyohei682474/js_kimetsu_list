import { fetchByCat } from'./api.js';
import { showLoading, hideLoading, displayCharacters, setupCategoryChangeListener} from './ui.js';

// メイン処理、イベント設定
//実際にカテゴリー切り替えとその処理を行う
async function changeCategory(category){
  try{
    showLoading();
    const charactors = await fetchByCat(category) 
    await new Promise(resolve => setTimeout(resolve, 300));
    displayCharacters(charactors);
  } catch(error) { 
    console.log('エラー', error);
  } finally { 
    hideLoading();
  }
}

//アプリケーションの初期化を行う
async function init() { 
 setupCategoryChangeListener(changeCategory);
 await changeCategory('all'); 
 
}

document.addEventListener('DOMContentLoaded', init)