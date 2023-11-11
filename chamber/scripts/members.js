const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const gridList = document.querySelector("article");
const baseURL = 'https://archserver.github.io/wdd230/chamber/';
const linksURL = 'https://archserver.github.io/wdd230/chamber/data/members.json';


gridBtn.addEventListener("click", () => {
    gridList.classList.add("grid");
    gridList.classList.remove("list");
})

listBtn.addEventListener("click", () => {
    gridList.classList.add("list");
    gridList.classList.remove("grid");
})

async function getMembers(){

    try{
        const response = await fetch(linksURL);
        if(response.ok){
            const data = await response.json();
            console.table(data.members);
            displayMembers(data.members);
        }
        else{
            throw Error(await response.text());
        }
    }
    catch(error){
        console.error('Error: ', error)
    }

}

const displayMembers = (members) => {
   
    if(gridList){
        // for each Tier
        for(const tier in members){
            if(members.hasOwnProperty(tier)){
                const tierDiv = document.createElement("div");
                tierDiv.classList.add(tier);

                const tierTitle = document.createElement("H2");
                tierTitle.textContent = tier.charAt(0).toUpperCase() + tier.slice(1) + " Members";
                tierDiv.appendChild(tierTitle);

                members[tier].forEach(member => {
                    const memberSection = document.createElement('section');

                    const logo = document.createElement("img");
                    logo.src = baseURL + "images/directory/" + member.imageIcon;
                    const name = document.createElement("h3");
                    name.textContent = member.name;
                    const address = document.createElement("p");
                    address.textContent = member.address;
                    const phoneNumber = document.createElement("p");
                    phoneNumber.textContent = member.contactPerson + " Ph: " + member.phoneNumber;
                    const website = document.createElement("a");
                    website.href = member.website;
                    website.textContent = "Website";
                    const description = document.createElement("p");
                    description.textContent = member.description;
  //                  const contactPerson = document.createElement("p");
//                    contactPerson.textContent = "Contact Person: " + member.contactPerson;

                    // build the member section
                    memberSection.appendChild(logo);
                    memberSection.appendChild(name);
                    memberSection.appendChild(address);
                    memberSection.appendChild(phoneNumber);
                    memberSection.appendChild(website);
                    memberSection.appendChild(description);
                    //memberSection.appendChild(contactPerson);

                    tierDiv.appendChild(memberSection);
                })
                // build each tier section
                gridList.appendChild(tierDiv);
            }
        }
    }

}

getMembers();