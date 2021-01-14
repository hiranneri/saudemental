const conexao = require('../../conexao');
const {api} = require('../services/api')
class Pessoa{
    constructor(body){
        this.body = body;
        this.error = 0;
        this.errors = [];
        this.pessoa = null;
        this.idHorariosSalvo=[];
    }

    buscarPessoa(id){
        try {
                     
             return new Promise((resolve,reject)=>{
               
               const sql = `SELECT * FROM pessoas where id='${id}';`;              
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results[0],conn.end());                 
                    
                });
                });



        } catch (error) {
            console.log(error);
        }

    }
    register(){
        try{
            this.validaPerfil();
            if(this.errors.length==0){

                api.post('perfil',{

                })
                // let idUsuarioSalvo;
                // let idHorariosSalvo=[];
               
                // this.pessoa = this.createPerfil(this.body);
                // //console.log(this.pessoa)
                // this.pessoa.then(function(results){ 
                //     idUsuarioSalvo = results.insertId;
                // })
                this.body.hora = this.formatarHora(this.body.hora)

                // let horarios = this.saveHorarios(this.body.dia,this.body.hora);
                // horarios.then(function(results){ 
                //     console.log('sucesso');
                    
                //     for (let i = 0; i < idHorariosSalvo.length; i++) {
                //         idHorariosSalvo[i] = results.insertId;
                //         console.log(idHorariosSalvo[i]);                        
                //     }
                    
                    
                // })
                // let agenda = this.saveAgenda(idUsuarioSalvo,idHorariosSalvo);
                //     agenda.then(function(resultsAgenda){
                //         console.log('sucesso Agenda')
                        
                //     })
                
              
               
            } 
            
        }catch(e){
            console.log(e);
        }
        
    }



    confirmarID(){
        console.log(this.idHorariosSalvo);
    }

    
   createPerfil(usuario){
        try {
                     
            return new Promise((resolve,reject)=>{
                let idSalvo;
                const sql = `INSERT INTO clientes (emalta,pessoas_id,paciente_motivo)
                    VALUES (0,'${usuario.id}','${usuario.objetivo}')`;
                   
                var conn = conexao();
                conn.query(sql,  (error, results)=> {
                    if (error){
                        reject(error);
                        throw error;                       
                    }else{
                        // console.log('logando ',results.insertId);
                        // idSalvo = results.insertId;
                        // conn.end();
                        // return idSalvo; 
                        resolve(results)
                        conn.end();
                    }          
                })

            });

        } catch (error) {
            console.log(error);
        }
    }
    saveHorarios(dia,hora){
        try {
                     
            return new Promise((resolve,reject)=>{

                for(let i=0;i<dia.length;i++){
                    const sql = `INSERT INTO horarios (dia,hora) VALUES ('${dia[i]}','${hora[i]}')`;
                    var conn = conexao();
                    conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    
                    resolve(results);
                    
                    
                    }).end();
                    
                }
            })                

        } catch (error) {
            console.log(error);
        }
    }
    saveAgenda(idPessoa,idHorarios){
        try {
                console.log('chegou no método')     
            return new Promise((resolve,reject)=>{

                for(let i=0;i<idHorarios.length;i++){
                    const sql = `INSERT INTO agenda (pacientes_pessoas_id,horarios_id)
                    VALUES ('${idPessoa}','${idHorarios[i]}')`;
                    console.log('query ',sql)
                    var conn = conexao();
                    conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    
                    resolve(results);
                    
                    
                    })
                    conn.end();
                }
            })                

        } catch (error) {
            console.log(error);
        }
    }

}
const errors=[];
function validaPerfil(body){        
    if(body.objetivo.length<3 || body.objetivo.lenght>=50){                     
        this.errors.push('informe um objetivo da consulta entre 3 a 50 caracteres');
        this.error++;
        return;          
    }      

}
function formatarHora(horarios){     
    for(let i=0;i<horarios.length;i++){             
        horarios[i] = horarios[i]+":00";           
    }       
    return horarios;

}
module.exports = {validaPerfil:validaPerfil, errors:errors, formatarHora: formatarHora};

            
            
            
            

