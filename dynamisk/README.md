# HIFI-PROJEKT (DYNAMISK)



## **INDEX.HTML**


> * ### De seneste to produkter vises på forsiden (index.html)

**index.js** (dynamisk)
```javascript

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
```


**produkt.js** (api/routes)
```javascript
 app.get('/index_produkt', function (req, res) {
        db.query(`
        SELECT * 
        FROM produkt 
        ORDER BY id desc limit 2
        `,
            function (err, data) {
                res.send(data);
            })
    })

```





--- 





## **PRODUKTER.HTML**

> * ### Visning af alle katergorier

**produkter.js** (dynamisk)

```javascript
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
```


**produkt.js** (api/routes)

```javascript
app.get('/kategori', function (req, res) {
        db.query(`
        SELECT * 
        FROM kategori
        `,
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            })
    })


```

**produkter.js** (dynamisk)
```javascript
 document.addEventListener('DOMContentLoaded', () => {
        {
            getCat();                                                       //alle kategorier// 
        }
    });

})();
```












> * ### Visning af en specifik kategori (når man klikker på et kategori-navn i kategori-listen) 

**produkter.js** (dynamisk)

```javascript
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
                        <a href="produkter.html?produkt=${item.id}"><button class="btn btn-index">Læs mere</button></a>                  
                        </div>`



                });
            })
    }
```


**produkt.js** (api/routes)

```javascript
 app.get('/kategori_produkt/:id', function (req, res) {
        db.query(`
        SELECT 
            produkt.*, kategori.navn AS kategori 
        FROM produkt 
        INNER JOIN kategori ON fk_kategori_id = kategori.id 
        WHERE fk_kategori_id = ?
        `,
            [req.params.id],
            function (err, data) {
                res.send(data);
            })
    })


```

**produkter.js** (dynamisk)
```javascript
   document.addEventListener('DOMContentLoaded', () => {
        //     hentData(0);
        if (getUrlParameter("kategori")) {                                  //specifik kategori//
            getOneCat(getUrlParameter("kategori"));
        }
        else {
            getCat();                                                            //alle kategorier// 
        }
   
```









> * ### Visning af et specifikt produkt


**produkter.js** (dynamisk)
```javascript
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


```


**produkt.js** (api/routes)

```javascript
 app.get('/specifikt_produkt/:id', function (req, res) {
        db.query(`
        SELECT 
            produkt.*, kategori.navn AS kategori, 
            producent.navn AS producent 
        FROM produkt 
        INNER JOIN kategori on fk_kategori_id = kategori.id 
        JOIN producent on fk_producent_id = producent.id 
        WHERE produkt.id = ?
        `,
            [req.params.id],
            function (err, data) {
                res.send(data);
            })
    })

```

**produkter.js** (dynamisk)

```javascript
document.addEventListener('DOMContentLoaded', () => {
        //     hentData(0);
        if (getUrlParameter("produkt")) {                                         //specifikt produkt//
            getProd(getUrlParameter("produkt"));
        }       
        else {
            getCat();                                                            //alle kategorier// 
        }
    });

```



---










## **KONTAKT.HTML**

**DEN SATTE INFO IND I DATABASEB UANSET OM FELTERNE VAR TOMME ELLER FYLDT UD**

```javascript

 let request = new Request('http://localhost:1337/create', init);

    fetch(request)
        .then(response => {
            return response.json();
        })
        .then(svar => {
            document.getElementById("kontakt-svar").innerHTML = svar.message;
            document.getElementById("kontakt-svar").style.display = "block";
            document.getElementById("navn").value = "";
            document.getElementById("email").value = "";
            document.getElementById("besked").value = "";
        })
        .catch(err => {
            console.log(err)
        });

```

DER MANGLEDE EN: _**if (afsted)**_

```javascript

if (afsted){
    let request = new Request('http://localhost:1337/create', init);

    fetch(request)
        .then(response => {
            return response.json();
        })
        .then(svar => {
            document.getElementById("kontakt-svar").innerHTML = svar.message;
            document.getElementById("kontakt-svar").style.display = "block";
            document.getElementById("navn").value = "";
            document.getElementById("email").value = "";
            document.getElementById("besked").value = "";
        })
        .catch(err => {
            console.log(err)
        });
    }

})

```

