function cadastrarPerfilPsicologo(){
    
    const psicologoIDCampo = document.getElementById('idPaciente');
    const psicologoID = psicologoIDCampo.value;
    
    let especialidades = [];
    const especialidadesDigitadas = document.getElementsByName('descricao');
    especialidadesDigitadas.forEach((nomes)=>{        
        if(nomes.value.length>0){
            especialidades.push(nomes.value)
        }
    });   
   
    const perfilPsicologo = {
        psicologoID: psicologoID,
        especialidades
    }

    salvarPerfil(perfilPsicologo);
   
}

function salvarPerfil(perfilPsicologo){
   
    let data = JSON.stringify(perfilPsicologo);
    let xhr = new XMLHttpRequest();
    let url = '/perfil/psicologo';
    xhr.open('POST', url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200){
                
                window.location.replace(`/perfil/psicologo/${perfilPsicologo.psicologoID}`);
                xhr.DONE;
            }
        }
    }
    xhr.send(data);
}
function adicionarCampos(){
    //<label for="descricao">Descrição:</label>
   
    const divNovosCampos = document.getElementById('novasEspecialidades').innerHTML +=
    "<label for='descricao'>Descrição:</label><input type='text' name='descricao' id='descricao'><br>" 

    // const labelDescricao = document.createElement('label');
    // labelDescricao.setAttribute('for','descricao');
    // const textoDescricao = document.createTextNode('Descrição:')
    // labelDescricao.appendChild(textoDescricao);

    // const txtDescricao = document.createElement('input');
    // txtDescricao.setAttribute('type','text');
    // txtDescricao.setAttribute('name', 'descricao');

    // const btnInvisivel = document.createElement('button')



    //  divNovosCampos.appendChild(labelDescricao);
    //  divNovosCampos.appendChild(txtDescricao)
    //  divNovosCampos.appendChild(btnInvisivel)


 
}