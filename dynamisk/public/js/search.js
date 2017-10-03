
//SØGNING//
function findProdukt() {
    
    
        var soeg = document.getElementById("soegning").value;
        window.location.assign("produkter.html?find=" + soeg);
    }
    
    document.getElementById("form").addEventListener("submit", function (event) {
               event.preventDefault();
               findProdukt();      
    });