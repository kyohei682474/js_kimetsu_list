//APIの制御を行うファイル
//基本となるURLを変数に代入する
const API_BASE = 'https://ihatov08.github.io/kimetsu_api/api';

//エンドポイントをラベリングする
const ENDPOINT = { 
  all:        'all.json',
  hashira:    'hashira.json',
  oni:        'oni.json',
  kisatsutai: 'kisatsutai.json',
}


///APIからデータを取得する
export async function fetchByCat(cat){
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

