var table;
const get = (async()=> {
    var response = await fetch("https://covid19-api.com/country/all?format=json", {
        "method": "GET"
        }
    )
    
    const ar = await response.json();
    // console.log(ar[0])
    table = new Tabulator("#all-country-table", {
        data:ar,
        layout:"fitColumns",
        pagination:"local",
        paginationSize:10,
        responsiveLayout:"hide",
        initialSort:[
            {column:"confirmed", dir:"dsc"},
        ],
        columns:[
            {title:"Country",field:"country"},
            {title:"Confirmed", field:"confirmed"},
            {title:"Recovered",field:"recovered"},
            {title:"Deaths",field:"deaths"},
            {title:"Critical",field:"critical"},            
        ],
    });
    
})

const updateFilter = (() => {
    let value = document.getElementById("filter-country").value;
    table.setFilter("country", "like" , value)
})

get();
document.getElementById("filter-country").addEventListener("keyup", updateFilter);


