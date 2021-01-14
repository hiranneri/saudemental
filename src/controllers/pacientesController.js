const { response } = require('express');
const {api} = require('../services/api')

exports.pacientes = async(req, res) => {
  try {
    api.get(`pacientes`).then(response =>{
      if(response.status==200){    
        const pacientes = response.data;  
        const psicologo = req.session.usuario; 
        
        res.render('pacientes',{pacientes, psicologo});
      }
    })  
  } catch (error) {
      console.log(error);
      res.render('404');
  }
  
};

exports.perfilPaciente= async (req,res)=>{
  try {
    
    api.get(`perfil/paciente/${req.params.id}`).then(response =>{
      if(response.status==200){  
        const pessoa = response.data.perfil[0];          
        const usuario = req.session.usuario;

        return res.render('perfilpaciente',{pessoa, usuario})
        
         
      }else{
        console.log(response)
        return res.render('404')
      }
          
    })         
    
  } catch (e) {
      console.log(e);
  }

}

exports.cadastrarPerfilPaciente = async(req,res)=>{
  const id = req.body.id;
  const objetivo = req.body.objetivo;

  api.post(`perfilPaciente`,{
    id,
    objetivo
  }).then(response =>{
    if(response.status==200){  
       req.flash('success', response.data.message);
        req.session.save(()=>{
          return res.redirect('back');
        });     
    }else{
      req.flash('errors', 'Não foi possível salvar o perfil, tente novamente mais tarde.')
        req.session.save(()=>{
          return res.redirect('back');
        });
  }

  }).catch(response=>{
    console.log(response);
    req.flash('errors', 'Não foi possível salvar o perfil, tente novamente mais tarde.');
        req.session.save(()=>{
          return res.redirect('back');
        });
  })
};

exports.propostasAgendamentosComPaciente = async (req,res) =>{
 
  
  const idPaciente = req.params.idPaciente;
  const idPsicologo = req.query.psicologo;
  
  
  api.get(`agendamentos/paciente/${idPaciente}?psicologo=${idPsicologo}`).then(response =>{
   

    if(response.status==200){
      const propostasPaciente = response.data.propostasPaciente;
      const usuarioLogado = req.session.usuario;
      const paciente = response.data.paciente;
      if(paciente.length<1){
       return res.render('404')
      }
     
     return res.render('agendamento',{propostasPaciente, usuarioLogado, paciente});     

    }
  });
  
}

exports.perfil=async (req,res)=>{
  try {
    let paciente = new Paciente(req.params);
    
    paciente =  await paciente.buscaPaciente();
    const data = converteData(paciente[0].datanascimento);   
    paciente[0].datanascimento = data;
    return res.render('paciente', {paciente});
    
  } catch (error) {
      console.log(error);
      res.render('404');
  }
  function converteData(data){
    const a = new Date(data);  
    const dataFormatada = a.getDate()+"/"+(a.getMonth()+1)+"/"+a.getFullYear();
    
    return dataFormatada;
  }
}
exports.confirmarAgendamento = (req,res) =>{
  
  api.post('confirmar/agendamento',{
    dia:req.body.dia,
    hora: req.body.hora,
    pacienteID: req.body.idPaciente,
    psicologoID: req.body.idPsicologo
  }).then(response =>{
    req.flash('success', 'Agendamento realizado com sucesso')
    req.session.save(()=>{
      return res.redirect('back')
    })     
  }).catch(error =>{
    if(error.response.status==404){
     console.log(error)
    }
  });
 // return res.redirect('/');
} 

exports.perfilPacientev2= async (req,res)=>{
  try {
    
    api.get(`perfil/paciente/${req.params.id}`).then(response =>{
      if(response.status==200){  
        const pessoa = response.data.perfil[0]; 
        const horariosPaciente = response.data.horariosPaciente;       
        const usuario = req.session.usuario;
        let isAgendamentoConcluido=false;
        if(horariosPaciente.length>0 && usuario[0].crp!='' && usuario[0].crp!=null) {         
          return res.render('paciente',{pessoa, usuario, isAgendamentoConcluido, horariosPaciente}) 
          
        }else{
          isAgendamentoConcluido = true; 
          return res.render('perfilpaciente',{pessoa})
        }
         
      }else{
        console.log(response)
        return res.render('404')
      }
          
    })         
    
  } catch (e) {
      console.log(e);
  }

}

