async function getFullList() {
  try{
    const res = await fetch('https://ihatov08.github.io/kimetsu_api/api/all.json')
    const allLists = await res.json();
    console.log(allLists);
  } catch(error){
    console.error('取得できませんでした', error)
  }
}

const grid = document.getElementById('grid');
const loading = document.getElementById('loading');
const controls = document.querySelector('.controls'); 
console.log(controls);