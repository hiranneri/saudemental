const {api} = require('../services/api')
const {validaPerfil, errors, formatarHora} = require('../models/PessoaModel');

exports.agendarPaciente = async (req,res)=>{
  try {
  
    api.post('/agendamento/paciente',{
      agendamento: req.body
    }).then(response =>{
      if(response.status==200){
        let pessoa = response.data;
        let agendamentoConcluido = true;      
        req.flash('success', pessoa.message);
        const data = converteData(pessoa.perfil[0].datanascimento);   
        pessoa.perfil[0].datanascimento = data;
        return res.render('paciente',{pessoa, agendamentoConcluido})
        
      }             
       
    }).catch(error =>{
      if(error.response.status==404){
        req.flash('errors', 'Tente realizar o agendamento mais tarde.');            
      return;
      }
      
    });
  }catch(err){
    console.log(err);
    res.render('404');
  }


}
/*

*/
exports.cadastrarPerfilPacientev2 = async (req,res)=>{
  try{  
    console.log(req.body);
    validaPerfil(req.body);
    const horas = formatarHora(req.body.hora);  
    req.body.hora = horas;
    if(errors.length==0){
     
      api.post('perfil',{
       id:req.body.id,
       objetivo: req.body.objetivo,
       dia: req.body.dia,
       hora: req.body.hora
      }).then(response =>{
        if(response.status==200){
          console.log(response.data.usuario);          
          req.session.usuario = response.data.usuario;
          req.session.save(function(){
            return res.redirect(`/perfil/paciente/${req.body.id}`);
            });       
        }             
         
      }).catch(error =>{
        if(error.response.status==404){
          req.flash('errors', 'Ocorreu um imprevisto ao salvar, tente novamente');
          req.session.save(()=>{
            return res.redirect(`/perfil/paciente/${req.body.id}`);
          });       
        return;
        }
        
      });
    }else{
      console.log('Invalidado');
    }

    
} catch (error) {
  console.log(error);
  res.render('404');
}

}
function converteData(data){
  const a = new Date(data);  
  const dataFormatada = (a.getDate()+1)+"/"+(a.getMonth()+1)+"/"+a.getFullYear();  
  return dataFormatada;
}

exports.cadastrarPerfilPsicologo = async(req,res)=>{
  console.log(req.body)
  const especialidades = req.body.especialidades;
  const psicologoID = req.body.psicologoID;
  try {
    
    api.post(`perfil/psicologo`,{
      especialidades: especialidades,
      psicologoID: psicologoID
    }).then(response =>{
     
      if(response.status==200){       
        let psicologo = response.data.perfil;
        
        const pessoa = response.data;
       // return res.render('perfilpsicologo',{pessoa, psicologo})

        req.flash('success', response.data.message)
        req.session.save(()=>{
          return res.render('perfilpsicologo', {pessoa, psicologo})
                    
        })     
       
        
      }             
       
    }).catch(error =>{
      console.log(error)
      if(error.response.status==404){
        req.flash('errors', 'Tente realizar o cadastro mais tarde.');            
      return;
      }
      
    });
  }catch(err){
    console.log(err);
    res.render('404');
  }
}
              
 
       
      
     
 
        
