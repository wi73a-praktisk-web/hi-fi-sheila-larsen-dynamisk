function formular(form) {
    checker = true;
    "use strict";
    if (form.username.value.length === 0) {
        document.getElementById("brugernavnHelp").innerHTML = "Udfyld dit brugernavn";
        form.username.focus(); //sætter markøren i det valgte felt
        checker = false;
        return false;
    } else {
        document.getElementById("brugernavnHelp").innerHTML = "";
    }
    if (form.pwd.value.length === 0) {
        document.getElementById("passwordHelp").innerHTML = "Udfyld dit password";
        form.pwd.focus(); //sætter markøren i det valgte felt
        checker = false;
        return false;
    } else {
        document.getElementById("brugernavnHelp").innerHTML = "";
    }
    return false;
};

/* ------------------------- Login - sender data afsted ------------------------- */
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('#loginForm');

        form.onsubmit = (event) => {
            event.preventDefault();
            formular(form);
            if (checker == true) {
                const data = JSON.stringify({
                    'username': form.username.value,
                    'password': form.pwd.value
                });

                fetch('http://localhost:1337/login', {
                    'method': 'POST',
                    'headers': {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Content-Length': data.length
                    },
                    'mode': 'cors',
                    'cache': 'default',
                    'body': data
                })
                    .then((result) => {
                        return result.json();
                    })
                    .then((data) => {
                        localStorage.setItem('token', data.AccessToken);
                        localStorage.setItem('userid', data.ID);
                        // alert('du vil nu blive logget ind og sendt videre til kontrolpanelet');
                        if (data.message == "forkert brugernavn eller kodeord") {
                            document.getElementById("brugernavnHelp").innerHTML = data.message;                            
                        }
                        else{
                            window.location.assign("http://localhost:3000/admin_produkt.html");

                        }
                        console.log(data)

                    })
                    .catch((err) => {
                        console.log(err);
                    });

                return false;
            };
        }
    });
})();

