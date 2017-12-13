function getParameterByName(navn, url) {
      if (!url) url = window.location.href;
      navn = navn.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + navn + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function opdaterProdukt(event) {
      event.preventDefault();
      let navn = document.querySelector('#produktNavn').value;
      let beskrivelse = document.querySelector('#produktBeskrivelse').value;
      let pris = document.querySelector('#produktPris').value;
      let id = (getParameterByName('id') != null ? getParameterByName('id') : 0);

      // ERSTAT KOMMA MED PUNKTUM, SÅ isNaN FUNKTIONEN FUNGERER HENSIGTSMÆSSIGT //
      pris = pris.replace(',', '.');

      if (id != 0 && navn != '' && beskrivelse != '' && !isNaN(pris) && id > 0) {
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

            let request = new Request(`http://localhost:1337/rediger_produkt/${id}`, init);

            fetch(request)
                  .then(response => {
                        console.log(response);
                        if (response.status == 200) {
                              window.location.replace(`admin_produkt.html`);
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

function opretProdukt(event) {
      event.preventDefault();
      let navn = document.querySelector('#produktNavn').value;
      let beskrivelse = document.querySelector('#produktBeskrivelse').value;
      let pris = document.querySelector('#produktPris').value;
      let kategori = document.querySelector('#produktKategori').value;
      let producent = document.querySelector('#produktProducent').value;      
      // ERSTAT KOMMA MED PUNKTUM, SÅ isNaN FUNKTIONEN FUNGERER HENSIGTSMÆSSIGT //
      pris = pris.replace(',', '.');
      if (navn != '' && beskrivelse != '' && !isNaN(pris)) {
            document.querySelector('#produktFormularError').innerHTML = "";

            // GRIB FORMULAREN OG HÅNDTER INDHOLDET VIA "FormData" OBJEKTET //
            let form = document.querySelector('form');
            let data = new FormData(form);

            // INGEN HEADERS SENDES MED, BROWSEREN SÆTTER AUTOMATISK DE KORREKTE HEADERS ALT EFTER FORMENS INDHOLD //
            let init = {
                  method: 'post',
                  body: data,
                  cache: 'no-cache',
                  mode: 'cors'                              // HAR INDSAT "mode: 'cors' SOM FORSØG 15.11. KLOKKEN 8:43 //
            };

            let request = new Request(`http://localhost:1337/opret_produkt`, init);

            fetch(request)
                  .then(response => {
                        // HVIS GEM HANDLINGEN GIK FEJLFRIT IGENNEM, RELOADES SIDEN //
                        if (response.status == 200) {
                              window.location.replace(`admin_produkt.html`);
                        } else {
                              throw new Error('Produkt blev ikke oprettet');
                        }
                  })
                  .catch(err => {
                        console.log(err);
                  });
      } else {
            document.querySelector('#produktFormularError').innerHTML = "Udfyld venligst alle felter korrekt";
      }

}



document.addEventListener("DOMContentLoaded", event => {

      // FORUDFYLDER FORMULAR HVIS DER SKAL REDIGERES //
      if (getParameterByName('action') == "edit") {
            let produktId = (getParameterByName('id') != null ? getParameterByName('id') : 0);

            fetch(`http://localhost:1337/rediger_produkt/${produktId}`)
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                  })
                  .then((json) => {

                        // ERSTATTER PUNKTUM MED KOMMA //
                        let pris = json[0].pris;
                        pris = pris.replace('.', ',');

                        document.querySelector('#produktFormular').innerHTML = ` 
             
             <h1 class="admin-h1">REDIGER PRODUKT</h1>

             <form enctype="multipart/form-data">
             <div class="form-group">
             <label class="col-xs-6 control-label login-text">Navn: </label>
             <div class="col-xs-6">
             <input class="form-control input-xs" type="text" name="produktNavn" id="produktNavn" value="${json[0].navn}">
             </div>
             </div>            


             <div class="form-group">
             <label class="col-xs-6 control-label login-text">Pris: </label>
             <div class="col-xs-6">
             <input class="form-control input-xs" type="text" name="produktPris" id="produktPris" value="${pris}">               
             </div>
             </div>           


             <div class="form-group">
             <label class="col-xs-6 control-label login-text">Beskrivelse: </label>
             <div class="col-xs-6">
             <textarea class="form-control input-xs" type="text" name="produktBeskrivelse" id="produktBeskrivelse">${json[0].beskrivelse}</textarea>
             </div>
             </div>
                
          
                <button class="btn login-btn">Gem</button>
                <a href="admin_produkt.html" class="btn annuller-btn ">Annuller</a> <span id="produktFormularError" class="error"></span>          
                </form>
                <hr>`;
                        // BUTTON GEM FUNCTION //
                        document.querySelector("#produktFormular button").addEventListener('click', opdaterProdukt);

                  })
                  .catch((err) => {
                        console.log(err);
                  });


      } else {
            // VISER TOM FORMULAR TIL OPRETTELSE AF ET PRODUKT //
            document.querySelector('#produktFormular').innerHTML = `

          <h1 class="admin-h1">OPRET PRODUKT</h1>
          
          <form enctype="multipart/form-data">
          <div class="form-group">
          <label class="col-xs-6 control-label login-text">Navn: </label>
          <div class="col-xs-6">
          <input class="form-control input-xs" type="text" name="produktNavn" id="produktNavn" value="">
          </div>
          </div>
         
          
          <div class="form-group">
          <label class="col-xs-6 control-label login-text">Pris: </label>
          <div class="col-xs-6">
          <input class="form-control input-xs" type="text" name="produktPris" id="produktPris" value="">
          </div>
          </div>
         

          <div class="form-group">
          <label class="col-xs-6 control-label login-text">Beskrivelse: </label>
          <div class="col-xs-6">
          <textarea class="form-control input-xs" type="text" name="produktBeskrivelse" id="produktBeskrivelse" value=""></textarea>
          </div>
          </div>       
            
          <div class="form-group">
          <label class="col-xs-6 control-label login-text">Kategori: </label>
          <div class="col-xs-6">     
          <select id="produktKategori" class="form-control input-xs no-border-radius" type="text" name="produktKategori" placeholder="">
          </div> 
          <option>Vælg</option>
              <option value="1">CD Afspillere</option>
              <option value="2">DVD Afspillere</option>
              <option value="3">Effektforstærkere</option>
              <option value="4">Forforstærkere</option>
              <option value="5">Højtalere</option>
              <option value="6">Intforstærkere</option>
              <option value="7">Pladespillere</option>
              <option value="8">Rørforstærkere</option>             
          </select>
         
      </div>

      <div class="form-group">
      <label class="col-xs-6 control-label login-text">Producent: </label>   
      <div class="col-xs-6">   
      <select id="produktProducent" class="form-control input-xs input-xs no-border-radius" type="text" name="produktProducent" placeholder="">
      </div> 
      <option>Vælg</option>
          <option value="1">Creek</option>
          <option value="2">Exp</option>
          <option value="3">Exposures</option>
          <option value="4">Parasound</option>
          <option value="5">Manley</option>
          <option value="6">Project</option>
          <option value="7">Boesendorfer</option>
          <option value="8">Epos</option>
          <option value="9">Harbeth</option>
          <option value="10">Pro-Ject</option>
          <option value="11">Jolida</option>
      </select>
      
  </div>

         
          <button class="btn login-btn">Gem</button>

          <a href="admin_produkt.html" class="btn annuller-btn ">Annuller</a> <span id="produktFormularError" class="error"></span>
          
          </form>

          <hr>`;

            // BUTTON GEM FUNCTION //
            document.querySelector("#produktFormular button").addEventListener('click', opretProdukt);

      }




      // HENTER ALLE PRODUKTER FRA DB OG UDSKRIVER DEM I EN LISTE //
      fetch('http://localhost:1337/opret_produkt')
            .then((response) => {
                  if (response.ok) {
                        return response.json();
                  }
            })
            .then((json) => {

                  var myDiv = document.getElementById('produktListe');
                  json.forEach(function (item) {
                        myDiv.innerHTML += `

            
              <div class="col-xs-12 container">                     

            <div class="col-xs-2"> 
            <p class="opret_p">${item.id}</p>                   
            </div> 

            <div class="col-xs-2">                 
            <p class="opret_p opret_navn">${item.navn}</p>
            </div>

            <div class="col-xs-2">
            <p class="opret_p">${item.pris} sp.</p>                    
            </div> 
           

            <div class="col-xs-3">
            <button class="btn opret_btn_ret" data-produktid="${item.id}">RET</button>
            </div> 

            <div class="col-xs-3">
             <button class="btn opret_btn_slet" data-produktid="${item.id}">SLET</button>
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
                              window.location.assign("http://localhost:3000/admin_produkt.html?action=edit&id=" + event.target.dataset['produktid'])
                        })
                  })

            })
            .catch((err) => {
                  console.log(err);
            })

});

function sletprodukt(event) {
      if (confirm('Er du sikker?')) {
            let id = (isNaN(event.target.dataset['produktid']) ? 0 : event.target.dataset['produktid']);

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let init = {
                  method: 'delete',
                  headers: headers,
                  cache: 'no-cache'
            };
            let request = new Request(`http://localhost:1337/slet_produkt/${id}`, init);

            fetch(request)
                  .then(response => {
                        if (response.status == 204) {
                              window.location.replace(`admin_produkt.html`);
                        } else {
                              throw new Error('Produkt blev ikke slettet');
                        }
                  }).catch(err => {
                        console.log(err);
                  });
      }
}