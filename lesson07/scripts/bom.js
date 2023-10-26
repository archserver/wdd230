const var_input = document.querySelector('#favchap');
const var_button = document.querySelector('button');
const var_list = document.querySelector('#list');
/* add variables and constants for LocalStorage API */
let arrayofChapters = getChapterfromLocal() || [];


var_button.addEventListener('click', iwasclicked);

function iwasclicked(){
    if (var_input.value != '')
    {
        listtoScreen(var_input.value);
        arrayofChapters.push(var_input.value);
        saveChapterLlist();
        var_input.value = '';
        var_input.focus();
    }
}


arrayofChapters.forEach(chapter => { listtoScreen(chapter)})
    function getChapterfromLocal(){
}

function listtoScreen(chapt){
    let var_li = document.createElement('li');
    let var_delButton = document.createElement('button');
    var_li.textContent = chapt;
    var_delButton.textContent = '❌';
    var_delButton.ariaLabel = 'Remove '+ chapt;
    var_li.append(var_delButton);
    var_list.append(var_li);
    
    var_delButton.addEventListener('click', function(){
        var_list.removeChild(var_li);
        deleteChapterfromList(var_li.textContent);
        var_input.focus();
    });
}

function saveChapterLlist() {
    localStorage.setItem('BOMList', JSON.stringify(arrayofChapters));
}

function getChapterfromLocal() {
    return JSON.parse(localStorage.getItem('BOMList'));
}

function deleteChapterfromList(chapt) {
    chapt = chapt.slice(0, chapt.length - 1);
    arrayofChapters = arrayofChapters.filter((item) => item !== chapt);
    saveChapterLlist();
}