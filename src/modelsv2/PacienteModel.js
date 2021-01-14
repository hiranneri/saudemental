const bcrypt = require('bcryptjs');
const conexao = require('../../conexao');

class Paciente{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    async buscaPacientes(){
        try {
            const pacientes = await this.findPacientes();
           
            return pacientes;
        } catch (e) {
            console.log(e);
        }
    }
    findPacientes(){
        try {
                     
            return new Promise((resolve,reject)=>{
               
               const sql = `SELECT * FROM pessoas where crp='';`;
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results)
                    conn.end();
                    
                })
                })

        } catch (error) {
            console.log(error);
        }
    }
    async buscaPaciente(){
        try {
            const paciente = await this.findPaciente(this.body);
           
            return paciente;
        } catch (e) {
            console.log(e);
        }
    }
    findPaciente(body){
        try {
                     
            return new Promise((resolve,reject)=>{
               
               const sql = `SELECT * FROM pessoas where crp='' AND id='${body.id}';`;
              
                var conn = conexao();
                conn.query(sql,  (error, results, fields)=> {
                    if (error){
                        reject(error);
                        throw error;
                       
                    }
                    resolve(results)
                    conn.end();
                    
                })
                })

        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = Paciente;

