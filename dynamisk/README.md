# Projektopgave HI-FI

> ## **TEKNISKE KRAV/DESIGN & LAYOUT**
Jeg startede med at lave skitser af hvordan jeg _troede_ siderne skulle se ud. Det eneste jeg endte med at bruge fra skitserne, var navbaren. 
Det er først i forbindelse med dette projekt, at jeg er begyndt at forstå hvordan det **statiske** og det **dynamiske** differentierer sig fra hinanden - eller rettere, _hvor_ og _hvordan_ man bruger det ene og det andet. 

Men i det hele taget har dette projekt været en rodet affære for mig. Jeg havde _alle_ mapper, _alle_ filer og _alt_ kode fra undervisningen i de foregående uger, men jeg vidste slet ikke hvordan jeg skulle gribe det an - på trods af, at opgavebeskrivelsen var meget præcis. Men dét at flette tingene sammen og have/holde OVERBLIK, havde jeg meget svært ved. 

Et par dage inde i den første uge, endte jeg med at slette en stor del, af det jeg havde lavet - altså, med vilje (ikke med kaffe eller noget).   

Jeg har brugt **Bootstrap** - og det synes jeg selv, fungerer godt. 

---

> ## **MAPPESTRUKTUR**

Jeg prøvede i begyndelsen af projektet at flette en mappestruktur sammen, vha. de ting vi havde lavet med Frank og Brian. Det lykkedes ikke helt, men jeg fik styr på den i løbet af den første uge - med hjælp fra nogle af de andre. 

**DYNAMISK**

```
DYNAMISK (mappe)
|
|
└────────PUBLIC (mappe)
│        │   
│        |
|        └────────CSS (mappe)
|        |        ... bootstrap-theme.min.css (fil)
|        |        ... bootstrap.min.css (fil)
|        |        ... stylesheet.css (fil)
|        |
|        └────────FONTS (mappe)
|        |        ... glyphicons-halflings-regular.eot  (fil)
|        |        ... glyphicons-halflings-regular.svg  (fil)
|        |        ... glyphicons-halflings-regular.ttf  (fil)
|        |        ... glyphicons-halflings-regular.woff (fil)
|        |        ... glyphicons-halflings-regular.woff2(fil)
│        |
|        └────────IMG-HIFI (mappe)
|        |        ... img
|        |        ... img
|        |        ... etc.
|        | 
|        |
|        └────────JS (mappe) 
│        |       ... index.js
|        |       ... kontakt.js
|        |       ... produkter.js
|        |       ... search.js
|        |
|        |
|        |
|        | ... index.html
|        | ... kontakt.html  
|        | ... produkter.html 
|
|
└────────NODE_MODULES (mappe)  
|
|
│ ...  README.md (fil)
│ ...  package.json (fil)
| ...  app.js (fil)     
    
```

**API**

```
API (mappe)
|
|
└────────CONFIG (mappe)
│               ... sql.js (fil)
│         
│   
│   
└────────ROUTES (mappe)
|               ... index.js (fil)
|               ... produkt.js (fil)
|               ... kontakt.js (fil)
|  
└────────NODE_MODULES (mappe)  
|
|
│ ...  README.md (fil)
│ ...  package.json (fil)
| ...  app.js (fil)     
    
```


---



> ## **SIDER & INDHOLD**

---

#### _INDEX.HTML_

**På min index.html er der:**
* En navbar med søgefelt
* Links til min produktside og min kontaktside
* De to senest oprettede produkter vises.
* En footer 

Man kan klikke på ét af de to produkter, som fører hen til produkter.html, hvor det specifikke produkt vises. 

Man kan søge på producent, kategori eller produkt i søgefeltet. Det virker også hvis man kun skriver noget af ordet, eller bare et enkelt bogstav.

Man kan klikke på "produkter", som fører hen til produkter.html, hvor alle kategorierne vises.

Man kan klikke på "kontakt" og blive ført hen til kontaktsiden, hvor man kan skrive en besked.

**Udfordringer:**

De største udfordringer med denne side, var nok det samme som de udfordringer jeg havde generelt. 

Jeg havde dog en lille optur over, at jeg kunne huske det med `SELECT * FROM produkt ORDER BY id desc limit` fra Franks timer; eller måske nærmere, at jeg NÆSTEN kunne finde ud af at bruge det.



```javascript
//index.js (dynamisk)
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



```javascript
//produkt.js (api/routes)
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








#### _PRODUKTER.HTML_

**På min produkter.html er der:**
* En navbar med søgefelt
* Links til min forside og min kontaktside
* Alle kategorier vises som det første når man kommer ind på siden
* En specifik kategori vises også her
* Et specifikt produkt vises også her
* Søgeresultat vises også her
* En footer 

Man kan komme rundt, og søge, fra denne side, på samme måde som på index.

Man kan klikke på en kategori, som fører hen til produkter.html, hvor alt i den kategori vises. 

Man kan klikke på et specifikt produkt i en kategori, som fører hen til produkter.html, hvor det specifikke produktet vises.


**Udfordringer:**

Igen, de største udfordringer med denne side, var de samme som de udfordringer jeg havde generelt. 

Jeg har haft svært ved at holde overblikket over sammenhængen mellem de forskellige sider - og hvordan de arbejede sammen.


 
 
 
##### **Visning af alle katergorier**


```javascript
//produkter.js (dynamisk)
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

```javascript
//produkter.js (dynamisk)
 document.addEventListener('DOMContentLoaded', () => {
        {
            getCat();                                                       //alle kategorier// 
        }
    });

})();
```

```javascript
//produkt.js (api/routes)
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





##### **Visning af en specifik kategori (når man klikker på et kategori-navn i kategori-listen)** 


```javascript
//produkter.js (dynamisk)
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


```javascript
//produkter.js (dynamisk)
   document.addEventListener('DOMContentLoaded', () => {
        //     hentData(0);
        if (getUrlParameter("kategori")) {                                  //specifik kategori//
            getOneCat(getUrlParameter("kategori"));
        }
        else {
            getCat();                                                            //alle kategorier// 
        }
   
```


```javascript
//produkt.js (api/routes)
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






##### **Visning af et specifikt produkt**


```javascript
//produkter.js (dynamisk)
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


```javascript
//produkter.js (dynamisk)
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


```javascript
//produkt.js (api/routes)
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









#### _KONTAKT.HTML_

_**Denne del er ikke færdig**_

**På min kontakt.html er der:**
* En navbar med søgefelt
* Links til min forside og min produktside
* En kontaktformular som validerer og sætter info ind i databasen
* En footer 




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

