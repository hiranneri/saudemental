
const formPropostas = document.getElementById('propostasPsicologos');


function confirmarAgendamento(linha){
    let respostaUsuario =  confirm('Você tem certeza que deseja agendar a consulta neste dia e horário?')
    if(respostaUsuario){
        //dia,hora,idPaciente,idPsicologo
        const agendamentoSelecionado = document.getElementById(linha);
        const dias = document.getElementsByName('dia');
        const diaSelecionado = dias[linha].value;

        const horarios = document.getElementsByName('hora');
        const horaSelecionada = horarios[linha].value;

        const psicologo = agendamentoSelecionado.cells[0].innerHTML;
        const exp = "[0-9]+";
        const idPsicologo = psicologo.match(exp);
        const idPsicologoSerializado = idPsicologo[0];
        const idPaciente = document.getElementsByName('idPaciente')
        const idPacienteSerializado = idPaciente[0].value;
        
        const agendamento = {
            dia: diaSelecionado,
            hora: horaSelecionada,
            idPsicologo: idPsicologoSerializado,
            idPaciente: idPacienteSerializado
        }
        post('/confirmar/agendamento',agendamento,'post');

    }
    
}
function post(path, params, method='post') {

    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
function confirmarReprovacaoAgendamento(linha){
    // document.getElementById('propostasPsicologos').addEventListener('click',(event)=>{
    //     event.preventDefault();
    // })  

    
    const agendamentoSelecionado = document.getElementById(linha);
   
    const diaSelecionado = agendamentoSelecionado.cells.dia.innerHTML.trim();
    const horaSelecionado = agendamentoSelecionado.cells.hora.innerHTML;
    const psicologo = agendamentoSelecionado.cells.idPsicologo.innerHTML;
    const exp = "[0-9]+";
    const idPsicologo = psicologo.match(exp);
    const idPsicologoSerializado = idPsicologo[0];
    const idPaciente = document.getElementById('paciente').innerHTML;

    
    const propostaAceita = {
        dia: diaSelecionado,
        hora: horaSelecionado,
        idPsicologo: idPsicologoSerializado,
        idPaciente: idPaciente
        
    }
    

    // fetch('/confirmar/agendamento', {
    //     method:'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         dia: diaSelecionado,
    //         hora: horaSelecionado,
    //         idPsicologo: idPsicologoSerializado,
    //         idPaciente: idPaciente
    //     })   
    // }).then(function (response){
        
    // }).catch(function (error){
    //     console.log(error)
    // });

    let xhr = new XMLHttpRequest();
    let url = '/confirmar/agendamento';
    xhr.open('POST', url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status = 200){
                console.log(xhr.responseText);
                }
        }
    }
    xhr.send(propostaAceita);
}
    



