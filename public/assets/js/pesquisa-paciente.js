const campoNomePaciente = document.querySelector(".nome-paciente");
campoNomePaciente.addEventListener("input", function(){
    var pacientes = document.querySelectorAll(".card");
   
    if(this.value.length>0){
      
        for(let i=0;i<pacientes.length;i++){
            const paciente = pacientes[i];
            const cardNome = paciente.querySelector(".card-text");
            const nome = cardNome.textContent;
            
            var expressao = new RegExp(this.value,"i");

            if(!expressao.test(nome)){
                paciente.classList.add('invisivel')
            }else{
                paciente.classList.remove('invisivel')
            }
        }
    }else{
       
        for(let j=0;j<pacientes.length;j++){
            let pac = pacientes[j];
            pac.classList.remove('invisivel')
        }
    }
  
})
function adicionaPaciente(){

}
function removePaciente(i){
    //col-sm-3
    const pai = document.getElementsByClassName('.col-sm-3');
    pai.removeChild(pai.children[i]);
}