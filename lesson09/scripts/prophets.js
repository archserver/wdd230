const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

async function getProphetData(){

    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            //console.table(data.prophets);
            displayProphets(data.prophets);
        }
        else{
            throw Error(await response.text());
        }
    }
    catch(error){
        console.error('Error: ', error)
    }

}

const displayProphets = (prophets) => {

    const cards = document.querySelector('#cards');

    if(cards){
        prophets.forEach(prophet => {
            const card = document.createElement("section");
            const fullName = document.createElement("h2");
            const portrait = document.createElement("img");
            fullName.textContent = `${prophet.name} ${prophet.lastname}`;
            portrait.setAttribute("src",prophet.imageurl);
            portrait.setAttribute("alt",`Portrait of ${prophet.name} ${prophet.lastname}`);
            portrait.setAttribute("loading","lazy");
            portrait.setAttribute("width", "340");
            portrait.setAttribute("height", "440");

            card.appendChild(fullName);
            card.appendChild(portrait);

            cards.appendChild(card);
        });
    }

}


getProphetData();