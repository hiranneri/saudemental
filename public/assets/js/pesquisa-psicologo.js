const campoNomePsicologo = document.querySelector(".nome-psicologo");
campoNomePsicologo.addEventListener("input", function(){
    var psicologos = document.querySelectorAll(".card");
   
    if(this.value.length>0){
      
        for(let i=0;i<psicologos.length;i++){
            const psicologo = psicologos[i];
            const cardNome = psicologo.querySelector(".card-text");
            const nome = cardNome.textContent;
            
            var expressao = new RegExp(this.value,"i");

            if(!expressao.test(nome)){
                psicologo.classList.add('invisivel')
            }else{
                psicologo.classList.remove('invisivel')
            }
        }
    }else{
       
        for(let j=0;j<psicologos.length;j++){
            let psic = psicologos[j];
            psic.classList.remove('invisivel')
        }
    }
  
})