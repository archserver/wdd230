const var_input = document.querySelector('#favchap');
const var_button = document.querySelector('button');
const var_list = document.querySelector('#list');

var_button.addEventListener('click', iwasclicked);

function iwasclicked(){
    if (var_input.value != '')
    {
        const var_li = document.createElement('li');
        const var_delButton = document.createElement('button');
        var_li.textContent = var_input.value;
        var_delButton.textContent = '❌';
        var_li.append(var_delButton);
        var_list.append(var_li);
        
        var_delButton.addEventListener('click', function(){
            var_list.removeChild(var_li);
            var_input.focus();
        });
        var_input.value = '';
        var_input.focus();

    }
}