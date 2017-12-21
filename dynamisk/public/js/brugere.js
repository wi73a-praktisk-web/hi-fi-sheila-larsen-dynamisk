function getParameterByName(navn, url) {
    if (!url) url = window.location.href;
    navn = navn.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + navn + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
document.addEventListener("DOMContentLoaded", event => {

    // FORUDFYLDER FORMULAR HVIS DER SKAL REDIGERES EN BRUGER //
    if (getParameterByName('action') == "edit") {
        let brugerid = (getParameterByName('id') != null ? getParameterByName('id') : 0);

        fetch(`http://localhost:1337/rediger_bruger/${brugerid}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {

                document.querySelector('#produktFormular').innerHTML = ` 
                 
                 <h1 class="admin-h1">REDIGER BRUGER</h1>
    
                 <form enctype="multipart/form-data">
                 <div class="form-group">
                 <label class="col-xs-6 control-label login-text">BRUGERNAVN: </label>
                 <div class="col-xs-6">
                 <input class="form-control input-xs" type="text" name="userName" id="userName" value="${json[0].username}">
                 </div>
                 </div>            
                          
                                                
                   <button class="btn login-btn">Gem</button>
                    <a href="brugere.html" class="btn annuller-btn ">Annuller</a> <span id="produktFormularError" class="error"></span>          
                    </form>
                    <hr>`;
                // BUTTON GEM FUNCTION //
                document.querySelector("#produktFormular button").addEventListener('click', opdaterBruger);

            })
            .catch((err) => {
                console.log(err);
            });


    } else {
        // VISER TOM FORMULAR TIL OPRETTELSE AF EN BRUGER //
        document.querySelector('#produktFormular').innerHTML = `
    
              <h1 class="admin-h1">OPRET BRUGER</h1>
              
              <form enctype="multipart/form-data">
              <div class="form-group">
              <label class="col-xs-6 control-label login-text">BRUGERNAVN: </label>
              <div class="col-xs-6">
              <input class="form-control input-xs" type="text" name="userName" id="userName" value="">
              </div>
              </div>
             
              
              <div class="form-group">
              <label class="col-xs-6 control-label login-text">KODEORD: </label>
              <div class="col-xs-6">
              <input class="form-control input-xs" type="text" name="password" id="password" value="">
              </div>
              </div>
                           
              <button class="btn login-btn">Gem</button>
    
              <a href="brugere.html" class="btn annuller-btn ">Annuller</a> <span id="produktFormularError" class="error"></span>
              
              </form>
    
              <hr>`;

        // BUTTON GEM FUNCTION //
        document.querySelector("#produktFormular button").addEventListener('click', opretBruger);

    }

    //REDIGER PRODUKT//
function opdaterBruger(event) {
    event.preventDefault();
    let navn = document.querySelector('#userName').value;
    let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);

        if (id != 0 && navn != '' && id > 0) {
          document.querySelector('#produktFormularError').innerHTML = "";

          // GRIB FORMULAREN OG HÅNDTER INDHOLDET VIA "FormData" OBJEKTET //
          let form = document.querySelector('form')
          let data = new FormData(form);

          // INGEN HEADERS SENDES MED, browseren sætter automatisk de korrekte headers alt efter formens indhold
          let init = {
                method: 'put',
                body: data,
                cache: 'no-cache'
          };

          let request = new Request(`http://localhost:1337/rediger_bruger/${id}`, init);

          fetch(request)
                .then(response => {
                      console.log(response);
                      if (response.status == 200) {
                            window.location.replace(`brugere.html`);
                      } else {
                            throw new Error(`Produkt blev ikke opdateret: ${response.statusText}`)
                      }
                }).catch(err => {
                      console.log(err);
                });

    } else {
          document.querySelector('#produktFormularError').innerHTML = "Udfyld venligst alle felter korrekt";
    }
}


    //OPRET BRUGER//
    function opretBruger(event) {
        event.preventDefault();
        let navn = document.querySelector('#userName').value;
        let password = document.querySelector('#password').value;
        

        if (navn != '' && password != '') {
            document.querySelector('#produktFormularError').innerHTML = "";

            // GRIB FORMULAREN OG HÅNDTER INDHOLDET VIA "FormData" OBJEKTET //
            let form = document.querySelector('form');
            let data = new FormData(form);

            // INGEN HEADERS SENDES MED, BROWSEREN SÆTTER AUTOMATISK DE KORREKTE HEADERS ALT EFTER FORMENS INDHOLD //
            let init = {
                method: 'post',
                body: data,
                cache: 'no-cache',
                mode: 'cors'
            };

            let request = new Request(`http://localhost:1337/opret_bruger`, init);

            fetch(request)
                .then(response => {
                    // HVIS GEM HANDLINGEN GIK FEJLFRIT IGENNEM, RELOADES SIDEN //
                    if (response.status == 200) {
                        window.location.replace(`brugere.html`);
                    } else {
                        throw new Error('Bruger blev ikke oprettet');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            document.querySelector('#produktFormularError').innerHTML = "Udfyld venligst alle felter korrekt";
        }

    }



});

// HENTER ALLE BRUGERE FRA DB OG UDSKRIVER DEM I EN LISTE //
fetch('http://localhost:1337/opret_bruger')
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((json) => {

        var myDiv = document.getElementById('brugerListe');
        json.forEach(function (item) {
            myDiv.innerHTML += `

 
   <div class="col-xs-12 container">                     

 <div class="col-xs-2"> 
 <p class="opret_p">${item.id}</p>                   
 </div> 

 <div class="col-xs-2">                 
 <p class="opret_p opret_navn">${item.username}</p>
 </div>



 <div class="col-xs-3 col-xs-offset-2">
 <button class="btn opret_btn_ret" data-brugerid="${item.id}">RET</button>
 </div> 

 <div class="col-xs-3">
  <button class="btn opret_btn_slet" data-brugerid="${item.id}">SLET</button>
 </div> 
 </div>             
 `
        })
        let sletKnapper = document.querySelectorAll("button.opret_btn_slet");
        sletKnapper.forEach((button) => {
            button.addEventListener("click", sletprodukt)
        })

        let retKnapper = document.querySelectorAll("button.opret_btn_ret");
        retKnapper.forEach((button) => {
            button.addEventListener("click", (event) => {
                window.location.assign("http://localhost:3000/brugere.html?action=edit&id=" + event.target.dataset['brugerid'])
            })
        })

    })
    .catch((err) => {
        console.log(err);
    })




    function sletprodukt(event) {
        if (confirm('Er du sikker?')) {
              let id = (isNaN(event.target.dataset['brugerid']) ? 0 : event.target.dataset['brugerid']);
  
              let headers = new Headers();
              headers.append('Content-Type', 'application/json');
  
              let init = {
                    method: 'delete',
                    headers: headers,
                    cache: 'no-cache'
              };
              let request = new Request(`http://localhost:1337/slet_bruger/${id}`, init);
  
              fetch(request)
                    .then(response => {
                          if (response.status == 204) {
                                window.location.replace(`brugere.html`);
                          } else {
                                throw new Error('Bruger blev ikke slettet');
                          }
                    }).catch(err => {
                          console.log(err);
                    });
        }
  }