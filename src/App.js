import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [tarefas, setarTarefas] = useState([])
  const [modal, setModal] = useState(false)

  const salvarTarefa = () =>{
    var tarefa = document.getElementById('content-tarefa')
    let fechar = document.getElementById('addTarefa-content')

    
    if(tarefa.value == ''){
      alert('A tarefa deve possuir um nome.')
    } else{
      setarTarefas([
        ...tarefas, //usa aquilo que já existe e acrecenta no array o resultado a seguri
        {
          id: new Date().getTime(),
          tarefa: tarefa.value,
          finalizada: false
        }
      ])
  
      window.localStorage.setItem('tarefas', JSON.stringify([
        ...tarefas, 
        {
          id: new Date().getTime(),
          tarefa: tarefa.value,
          finalizada: false
        }
      ]))
      
      if(!modal){
        fechar.textContent = 'x'
        fechar.style.fontSize = '30px'
        fechar.style.lineHeight = '45px';
      } else{
        fechar.textContent = '+'
        fechar.style.fontSize = '40px'
        fechar.style.lineHeight = '50px';
      }
  
      setModal(false)
    }
    
   
  }

  const marcarConcluida = (id, cond) => {
    let novasTarefas = tarefas.filter((val) =>{
      
      if(val.id == id){
        val.finalizada = cond
      }
      return val
    })

    setarTarefas(novasTarefas)
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
  }

  const abrirModal = ()=>{
    setModal(!modal)
    let fechar = document.getElementById('addTarefa-content')

    if(!modal){
      fechar.textContent = 'x'
      fechar.style.fontSize = '30px'
      fechar.style.lineHeight = '45px';
    } else{
      fechar.textContent = '+'
      fechar.style.fontSize = '40px'
      fechar.style.lineHeight = '50px';
    }
    
  }

  const deletarTarefa = (id)=>{
    
    let novasTarefas = tarefas.filter(function(val){
        if(val.id != id){
          return val;
      }
    })
    
    setarTarefas(novasTarefas);
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
  }

  useEffect(() =>{
    if(window.localStorage.getItem('tarefas') != undefined){
      setarTarefas(JSON.parse(window.localStorage.getItem('tarefas')))
      console.log(window.localStorage.getItem('tarefas'))
    }
  })

  return (
    <div className="App">
      {
        modal?
        <div className='modal'>
          <div className='modalContent'>
            <h2> Adicione sua Trefa </h2>
            <input id='content-tarefa' type='text' placeholder='Título da tarefa...'></input>
            <button onClick={() => salvarTarefa()}>Adicionar!</button>
          </div>
        </div>
        :
        <div className='div-vazia'></div>
      }
      <div onClick={()=>abrirModal()} className='addTarefa'> <p id = "addTarefa-content"> + </p>  </div>
      <div className='boxTarefas'>
        <h2>Tarefas: </h2>
        {
          tarefas.map(function(val){

            if(!val.finalizada){
              return(
                <div className='tarefaSingle'>
                  <p onClick={()=> marcarConcluida(val.id, true)}>{val.tarefa}</p>
                  <span onClick={()=> deletarTarefa(val.id)}>Excluir</span>
                </div>
              )
            } else{
              return(
                <div className='tarefaSingle'>
                  <p onClick={()=> marcarConcluida(val.id, false)} style={{textDecoration: 'line-through'}}> {val.tarefa} </p> 
                  <span onClick={()=> deletarTarefa(val.id)}>Excluir</span>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
