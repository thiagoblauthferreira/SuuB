function iteraPalavras() {

    var palavras = document.querySelectorAll("span.subc-1, span.subc-2, span.subc-3, span.subc-4, span.subc-5, span.subc-6, span.ubc-7, span.subc-8, span.subc-9, span.subc-10, span.subc-11, span.subc-12, span.subc-13, span.subc-14, span.subc-15, span.subc-16, span.subc-17, span.subc-18, span.subc-19, span.subc-20")
    
    for (var i = 0; i < palavras.length; i++) {

        // alert(palavras.length)
        //  palavras[i].onclick = alert(palavras[i].id)
        
        if (palavras[i].className == 'subc-3') {
            
            document.getElementById(palavras[i].id).innerHTML = "Thorin"
        }     
    }
}

function alteraTitulo() {

    document.getElementById('h2titulo').innerHTML = "Thorin Escudo de Carvalho"

}


// window.load = setInterval(iteraPalavras, 1000)

window.addEventListener("load", function(event) {
    
    iteraPalavras()
    alteraTitulo()
    
});