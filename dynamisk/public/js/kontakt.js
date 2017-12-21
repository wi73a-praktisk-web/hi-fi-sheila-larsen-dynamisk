var afsted = true;
function formular(form) {
    var form = document.getElementById("kontakt");
    afsted = true;

    if (form.navn.value === "") {
        form.navn.focus();
        document.getElementById("navne_validering").innerHTML = "Skriv dit navn!";
        document.getElementById("navn").style.backgroundColor = "#d64a58";
        afsted = false;
    }
    else {
        document.getElementById("navn").style.backgroundColor = "transparent";
        document.getElementById("navne_validering").innerHTML = "";
    }



    if (form.email.value === "") {
        form.email.focus();
        document.getElementById("email_validering").innerHTML = "Skriv din email!";
        document.getElementById("email").style.backgroundColor = "#d64a58";
        afsted = false;
    }
    else {

        if (checkEmail(form.email.value)) {
            document.getElementById("email").style.backgroundColor = "transparent";
            document.getElementById("email_validering").innerHTML = "";
        }

    }





    if (form.besked.value === "") {
        form.besked.focus();
        document.getElementById("besked_validering").innerHTML = "Skriv en besked!";
        document.getElementById("besked").style.backgroundColor = "#d64a58";
        afsted = false;
    }
    else {
        document.getElementById("besked").style.backgroundColor = "transparent";
        document.getElementById("besked_validering").innerHTML = "";
    }


    if (afsted === true) {
    }
    // return afsted;
    return false;
}

function checkEmail(email) {
    var mail_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (mail_filter.test(email)) {
        return true;
    }
    afsted = false;
}


document.getElementById("send").addEventListener('click', (event) => {
    formular();
    event.preventDefault();
    var navn = document.getElementById("navn").value;
    var email = document.getElementById("email").value;
    var besked = document.getElementById("besked").value;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let init = {
        method: 'POST',
        headers: headers,
        body: `{"navn":"${navn}","email":"${email}","besked":"${besked}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };
    if (afsted) {
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


document.getElementById("kontakt-svar").addEventListener('click', (event) => {
    document.getElementById("kontakt-svar").style.display = "none";
})