


//VISER DE SENESTE 2 PRODUKTER PÅ FORSIDEN//
(() => {
    document.addEventListener('DOMContentLoaded', () => {

        function getNewest(event) {
            let url = 'http://localhost:1337/index_produkt';
            fetch(url)
                .then((response) => {

                    return response.json();
                })
                .then((data) => {
                    var myDiv = document.getElementById('content');
                    data.forEach(function (item) {
                        myDiv.innerHTML += `
                  <div class="col-xs-12">
                    <a href="produkter.html?produkt=${item.id}">                   
                    <img class="img-responsive" src="./img-hifi/${item.billede}"> 
                    <h4>${item.navn}</h4>
                    </a>
                    <p class="p-pris">${item.pris} sp.</p>
                    <a href="produkter.html?produkt=${item.id}"><button class="btn btn-index">Læs mere</button></a>
                    
                  </div>  
                    `

                    }
                    )
                })

        };
        getNewest();
    });

})();

