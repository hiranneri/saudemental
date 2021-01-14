const emailDigitado = document.querySelector("#email");

function validarEmail(){
    if(emailDigitado.value.length<9){
        alert('Digite um email válido')
        return false;
    }else{
        return true;
    }
}
