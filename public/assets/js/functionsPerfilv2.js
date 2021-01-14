const divBotaoEnviar =  document.getElementById('btnEnviar');
let botaoEnviar;
let especialidades=Array;
function adicionarHorario(evt){
    evt.preventDefault();
    
    const linhaHorarios = document.getElementById('horarios');

    const dia =  document.getElementById('dia').value;
    const hora = document.getElementById('hora').value;

    const tr = document.createElement('tr');
    tr.setAttribute('name','horario');
   
    let colunaDia = document.createElement('td');
    colunaDia.setAttribute("name","dia");
    colunaDia.innerHTML = dia;
    tr.appendChild(colunaDia);

    let colunaHora = document.createElement('td');
    colunaHora.setAttribute("name","hora")
    let horaFormatada = formataHora(hora);
    colunaHora.innerHTML = horaFormatada;
    tr.appendChild(colunaHora);

    let colunaApagar = document.createElement('td');
    
    let btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute("class","btn btn-danger")
    btnApagar.setAttribute("onclick","apagarHorario(this)")
    colunaApagar.appendChild(btnApagar)

    tr.appendChild(colunaApagar);
    linhaHorarios.appendChild(tr)    
    
    //<input type="hidden" id="custId" name="custId" value="3487">
    let campoDia = document.createElement('input');
    campoDia.type="hidden";
    campoDia.value=dia;
    campoDia.name="dia[]";  
    const divCampos =  document.getElementById('campos');
  
   divCampos.appendChild(campoDia);

   let campoHorario = document.createElement('input');
   campoHorario.type="hidden";
   campoHorario.value=horaFormatada;
   campoHorario.name="hora[]";  
   divCampos.appendChild(campoHorario);

  
  if(divBotaoEnviar.innerHTML===""){
    botaoEnviar = document.createElement('button');
    botaoEnviar.type="submit";
    botaoEnviar.innerText ='Salvar';
    botaoEnviar.className = 'btn btn-primary';
    divBotaoEnviar.appendChild(botaoEnviar);
  }   
  
   
 
}
function formataHora(horario){
    return horario+':00';
}
function apagarHorario(element){   
    let trash = element.parentNode.parentNode;
    trash.parentNode.removeChild(trash);   
    const temHorarios = document.getElementsByName('horario');
    let horarios = temHorarios.length
    if(horarios<=0){
        divBotaoEnviar.removeChild(botaoEnviar)
    }
}

function confirmarAgendamento(agendamento){
    let respostaUsuario =  confirm('Você tem certeza que deseja agendar a consulta neste dia e horário para esse psicólogo?')
    if(respostaUsuario){
        formPropostas.submit();
    }
}



