const baseURL = 'https://archserver.github.io/wdd230/';
const linksURL = 'https://archserver.github.io/wdd230/data/links.json';

async function getLinks(){

    try{
        const response = await fetch(linksURL);
        if(response.ok){
            const data = await response.json();
//            console.table(data.lessons);
            displayLinks(data.lessons);
        }
        else{
            throw Error(await response.text());
        }
    }
    catch(error){
        console.error('Error: ', error)
    }

}

const displayLinks = (weeks) => {

    const uol = document.querySelector('.testingul');
   
    if(uol){
        // for each week
        weeks.forEach(week => {
            const list = document.createElement("li");
            let licount = 1;
            // for each link
             week.links.forEach(link => {
//                console.log("Licount before: ", licount);                
                if (licount > 1)
                {
                    const spacer = document.createElement("span"); 
                    spacer.textContent = " | ";                
//                  console.log("append spacer", spacer);                    
                    list.appendChild(spacer);
                }
//                console.log("Licount after: ", licount);
                const  aRecord = document.createElement("a");
                aRecord.setAttribute("href", link.url);
                aRecord.textContent = link.title;
                list.appendChild(aRecord);
                licount++;
             })
            uol.appendChild(list);
        });
    }

}

getLinks();