
(() => {
    const getUrlParameter = function (sParam) {
        const sPageURL = decodeURIComponent(window.location.search.substring(1));
        const sURLVariables = sPageURL.split('&');
        let sParameterName;
        for (let int = 0; int < sURLVariables.length; int = int + 1) {
            sParameterName = sURLVariables[int].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };





    //ALLE KATEGORIER PÅ PRODUKTER.HTML//
    function getCat() {
        fetch('http://localhost:1337/kategori')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                data.forEach(function (item) {
                    document.getElementById('content').innerHTML +=
                        `<div class="col-xs-12">
                        <a class="kat-a" href="produkter.html?kategori=${item.id}">${item.navn}
                        </a>
                     </div>`



                });
            })
    }



    //EN KATEGORI PÅ PRODUKTER.HTML//
    function getOneCat(id) {
        var url = ''
        fetch(`http://localhost:1337/kategori_produkt/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                var h3;
                data.forEach(function (item) {
                    if (h3 != item.kategori) {           //For at undgå at overskriften bliver vist for hver vare i kategorien, laver man en if på denne måde //
                        document.getElementById('content').innerHTML += `<h3>${item.kategori}</h3>`;
                        h3 = item.kategori;
                    }
                    document.getElementById('content').innerHTML +=
                        `<div class="col-xs-12">
                        <a href="produkter.html?produkt=${item.id}">
                          <h4>${item.navn}</h4>
                          <img class="img-responsive" src="./img-hifi/${item.billede}">
                        </a>
                        <p class="p-pris">${item.pris} sp.</p>
                        </div>`



                });
            })
    }


    //ET SPECIFIKT PRODUKT I EN KATEGORI PÅ PRODUKTER.HTML//
    function getProd(id) {
        var url = ''
        fetch(`http://localhost:1337/specifikt_produkt/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach(function (item) {

                    document.getElementById('content').innerHTML +=
                        `<div class="col-xs-12">
                     <a href="produkter.html?produkt=${item.id}">
                       <h4>${item.navn}</h4>
                       <img class="img-responsive" src="./img-hifi/${item.billede}">
                     </a>
                     <p>${item.beskrivelse}</p>
                     <p class="p-pris">${item.pris} sp.</p>
                     
                  </div>`



                });
            })
    }




    //SØG//
    function findProd(find) {
        var url = ''
        fetch(`http://localhost:1337/soeg/${find}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach(function (item) {
                    console.log(item);
                    


                        document.getElementById('content').innerHTML += `<h3>${item.producent}</h3>`;
                        document.getElementById('content').innerHTML +=
                            `<div class="col-xs-12">
                     <a href="produkter.html?produkt=${item.id}">
                       <h4>${item.navn}</h4>
                       <img class="img-responsive" src="./img-hifi/${item.billede}">
                     </a>
                     <p class="p-pris">${item.pris} sp.</p>
                       </div>`

                    
                });
            })
    }



    document.addEventListener('DOMContentLoaded', () => {
        //     hentData(0);
        if (getUrlParameter("produkt")) {                                         //specifikt produkt//
            getProd(getUrlParameter("produkt"));
        }
        else if (getUrlParameter("kategori")) {                                  //specifik kategori//
            getOneCat(getUrlParameter("kategori"));
        }
        else if (getUrlParameter("find")) {                                  //specifik kategori//
            findProd(getUrlParameter("find"));
        }
        else {
            getCat();                                                            //alle kategorier// 
        }
    });

})();
