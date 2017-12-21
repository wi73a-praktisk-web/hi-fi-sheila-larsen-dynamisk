(() => {
    document.querySelector("#logud").addEventListener('click', () => { 
        localStorage.removeItem("userid");
        localStorage.removeItem("token");
        window.location.assign("index.html");
    })
})()