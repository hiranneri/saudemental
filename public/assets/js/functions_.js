const formUsuario = document.getElementById('formUsuario');
const containerForm = document.getElementById('containerForm');
const lblCRP = document.getElementById('lblcrp');
const campoCRP = document.getElementById('crp');
const areaEndereco = document.getElementsByName('areaEndereco');


window.onload = function(){    
    containerForm.style.visibility = 'hidden';

   

}

function hideForm(){   
    
    containerForm.style.visibility = 'hidden';
}
function showFormPaciente(){
    containerForm.style.visibility = 'visible';
    lblCRP.style.visibility = 'hidden';
    campoCRP.style.visibility = 'hidden';
}
function showFormPsicologo(){
    containerForm.style.visibility = 'visible';
    lblCRP.style.visibility = 'visible';
    campoCRP.style.visibility = 'visible';
}
function handleSelectUF(event){
    // const UFSelected = event.target.value;
    // setSelectedUF(UFSelected);
    console.log('mudou');
}
function showCamposEndereco(){
    let isVisible;
    areaEndereco.forEach(area => {
        isVisible =  area.style.visibility == 'visible';
        if(isVisible){
            area.style.visibility = 'hidden';
        }else{
            area.style.visibility = 'visible';
        }
    }); 
   
}
function pesquisarPeloCEP(cep){
    let cepDigitado = document.getElementById('cep').value;
    
    fetch(`https://viacep.com.br/ws/${cepDigitado}/json/`).then(resposta => resposta.json())
    .then(json=>carregaEndereco(json))
}
function carregaEndereco(json){
    let cidade = json.localidade;
    let uf = json.uf;
    if(cidade!=undefined || uf!=undefined){       
        document.getElementById('cidade').value = cidade;
        document.getElementById('estado').value = uf;
    }else{
        alert('Não foi possível localizar o endereço. Tente novamente')
    }

}
function validarCadastro(){
    const formCadastro = document.getElementById('formUsuario');
    const senha = document.getElementById('senha').value.trim();
    const senhaConfirmada = document.getElementById('confirme').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const campoCRP = document.getElementById('crp');
    const dataNascimento = document.getElementById('datanascimento').value

    if(senha===senhaConfirmada && senha.length!=0 && senhaConfirmada.length!=0 && cidade.length!=0 && estado.length>1 && dataNascimento.value.length>0) {
        if(campoCRP.style.visibility==="visible" && campoCRP.value.length<=0 ){           
                alert('Necessário informar o seu número CRP');
                return false;
            }        
        formCadastro.submit();
    }else{
        alert('Preencha todos os campos obrigatórios');
        return false;
    }
   
    
        
    
}
