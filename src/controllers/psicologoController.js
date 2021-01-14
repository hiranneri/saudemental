const {api} = require('../services/api')
exports.psicologos = (req, res) => {
  try {   
   
    api.get(`psicologos`).then(response =>{
      if(response.status==200){    
        const pessoas = response.data;   
        res.render('psicologos',{pessoas});
      }
    })
    
  } catch (error) {
      console.log(error);
      res.render('404');
  }



  };
exports.agendamentos =(req,res) =>{
  const idPsicologo = req.params.idPsicologo; 
 
    try {   
      
      api.get(`agendamentos/psicologo/${idPsicologo}`).then(response =>{
        if(response.status==200){  
            
          const pacientesAgendados = response.data.agendados; 
          
          res.render('agendamentopaciente',{pacientesAgendados});
        }
      })
      
    } catch (error) {
        console.log(error);
        res.render('404');
    }

   
}

exports.cadastrarPerfilPsicologo = async(req,res)=>{
 
  const especialidades = req.body.especialidades;
  const psicologoID = req.body.psicologoID;
  api.post(`perfil/psicologo`,{
    especialidades: especialidades,
    psicologoID: psicologoID
  }).then(response =>{
    console.log("RESPONSE")
    if(response.status==200){    
      console.log("200", response.status, response)   
      let psicologo = response.data.perfil;
      let usuarioLogado = req.session.usuario;
      const especialidades = response.data.especialidadesPsicologo;
      

      req.flash('success', response.data.message)
      req.session.save(()=>{
        return res.render('perfilpsicologo', {psicologo, especialidades, usuarioLogado})
                  
      })        
    }else{
      console.log("ELSE")
      req.flash('errors', 'Não foi possível salvar o perfil, tente novamente mais tarde.')
      req.session.save(()=>{
        return res.redirect('back');
      });
    }             
      
  }).catch(error =>{

    console.log('CATCH ',error)
    
    req.flash('errors', 'Não foi possível salvar o perfil, tente novamente mais tarde.');
      req.session.save(()=>{
        return res.redirect('back');
      });
    })
}


exports.perfilPsicologo = async (req,res)=>{
  try {
    
    api.get(`perfil/psicologo/${req.params.id}`).then(response =>{
      if(response.status==200){  
        
        let psicologo = response.data.pessoa;
        let especialidades = response.data.especialidadesPsicologo; 
        let usuarioLogado = req.session.usuario;     
        console.log('crp ',usuarioLogado[0].crp)
        return res.render('perfilpsicologo',{psicologo, especialidades, usuarioLogado})
      
        
      }
    })         
    
    } catch (e) {
        console.log(e);
    }

}