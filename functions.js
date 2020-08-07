var firstName = 'Peter',
    lastName  = 'Ally';

function showFullName () {
    // "this" dentro dessa funÃ§Ã£o terÃ¡ o valor do objeto "window" porque a funÃ§Ã£o "showFullName"
    // Ã© definida no escopo global, assim como "firstName" and "lastName".
    console.log(this.firstName + ' ' + this.lastName);
}

var person = {
    firstName    : "Penelope",
    lastName     : "Barrymore",
    showFullName : function() {
        // "this" se refere ao objeto "person", jÃ¡ que a funÃ§Ã£o "showFullName" serÃ¡ invocada 
        // pelo objeto "person".
        console.log(this.firstName + ' ' + this.lastName);
    }
}

showFullName(); // Peter Ally

// "window" Ã© o objeto em que todas as variÃ¡veis globais e funÃ§Ãµes sÃ£o definidas, portanto:
window.showFullName(); // Peter Ally

// "this" dentro do mÃ©todo "showFullName", que Ã© definido dentro do objeto "person", ainda se refere 
// ao objeto "person", entÃ£o:
person.showFullName(); // Penelope Barrymore