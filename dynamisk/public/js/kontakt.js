function formular(form) {
    
        var afsted = true;
    
        if (form.name.value === "") {
            form.name.focus();
            document.getElementById("navne_validering").innerHTML = "Skriv dit navn";
            document.getElementById("name").style.backgroundColor = "#ff2136";
            afsted = false;
        }
        else {
            if (!isNaN(form.name.value)) {
                form.name.focus();
                document.getElementById("navne_validering").innerHTML = "Der må kun være bogstaver i dit navn";
                document.getElementById("name").style.backgroundColor = "#ff2136";
                afsted = false;
            }
            else {
                if (form.name.value.length < 4) {
                    form.name.focus();
                    document.getElementById("navne_validering").innerHTML = "Dit navn skal være længere";
                    document.getElementById("name").style.backgroundColor = "#ff2136";
                    afsted = false;
                }
                else {
                    document.getElementById("name").style.backgroundColor = "transparent";
                    document.getElementById("navne_validering").innerHTML = "";
                }
            }
        }
    
                   
        
        
        if (form.email.value === "") {
            form.email.focus();
            document.getElementById("email_validering").innerHTML = "Skriv din email!";
            document.getElementById("email").style.backgroundColor = "#ff2136";
            afsted = false;
        }
        else {
          
            if (checkEmail(form.email.value)) {
                document.getElementById("email").style.backgroundColor = "transparent";
                document.getElementById("email_validering").innerHTML = "";
            }
                
            else {
                form.email.focus();
                document.getElementById("email_validering").innerHTML = "Denne email er ikke gyldig!";
                document.getElementById("email").style.backgroundColor = "#ff2136";
                afsted = false;
            }
        }
    
        
        
    
        
        if (form.message.value === "") {
            form.message.focus();
            document.getElementById("besked_validering").innerHTML = "Skriv en besked!";
            document.getElementById("message").style.backgroundColor = "#ff2136";
            afsted = false;
        }
        else {
            if (form.message.value.length < 10) {
                form.message.focus();
                document.getElementById("besked_validering").innerHTML = "Din besked skal være længere!";
                document.getElementById("message").style.backgroundColor = "#ff2136";
                afsted = false;
            }
            else {
                document.getElementById("message").style.backgroundColor = "transparent";
                document.getElementById("besked_validering").innerHTML = "";
            }
        }
        if (afsted === true) {
            alert("Tak for din besked, ");
        }
        return afsted;
    }
    
    function checkEmail(email) {
        var mail_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (mail_filter.test(email)) {
            return true;
        }
        afsted = false;
    }


    