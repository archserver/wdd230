const equipmentTable = document.querySelector("#rentaltable table");
const baseURL = 'https://archserver.github.io/wdd230/scoots/';
const linksURL = 'https://archserver.github.io/wdd230/chamber/data/equipment.json';


async function getEquipment(){

    try{
        const response = await fetch(linksURL);
        if(response.ok){
            const data = await response.json();
            console.table(data.rentals);
            //displayEquipment(data.rentals);
        }
        else{
            throw Error(await response.text());
        }
    }
    catch(error){
        console.error('Error: ', error)
    }

}

const displayEquipment = (equipmentlist) => {
   
    if(equipmentTable){
        //Table variable for building header
        let tableHTML = `<thead> <tr> <th colspan="5" scope="colgroup">Rental Pricing</th> </tr>
        <tr>
           <th scope="col"></th>
           <th colspan="2" scope="col">Reservation</th>
           <th colspan="2" scope="col">Walk-In</th>
        </tr>
        <tr>
           <th scope="col"></th>
           <th scope="col">Half Day</th>
           <th scope="col">Full Day</th>
           <th scope="col">Half Day</th>
           <th scope="col">Full Day</th>
        </tr>
        </thead>`

        // for each Tier of equipment
        for(const tier in equipmentlist){
            if(equipmentlist.hasOwnProperty(tier)){
                tableHTML += `<tbody><tr><th colspan="5">$tier.toUpperCase()}</th></tr>`;
                //for each item in each tier
                equipmentlist[tier].forEach(item => {
                    tableHTML += `<tr>
                        <td>${item.name}</td>
                        <td>${item.rhd}</td>
                        <td>${item.rfd}</td>
                        <td>${item.whd}</td>
                        <td>${item.wfd}</td>
                    </tr>`;
                });

                //close out the body for the tier
                tableHTML += `</tbody>`;
            }
            // assign the html to the table
            equipmentTable.innerHTML = tableHTML;
        }
    }
}

getEquipment();