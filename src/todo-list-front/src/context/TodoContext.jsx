//Gerencia o estado global da aplicação, fornecendo funções para adicionar, atualizar e deletar todos.
import {createContext, useEffect, useState } from "react"

import axios from "axios"

// Criação do contexto
export const TodoContext = createContext()

// Componente provedor do contexto
export function TodoProvider({children}){

    //A linha const [todos, setTodos] = useState([]) utiliza o hook useState do React para definir um estado local dentro de um componente funcional.
    //Ele retorna um par de valores: o estado atual e uma função para atualizá-lo.
    const [todos, setTodos] = useState([])

    //Função para carregar todos os 'todos' do backend ao carregar o context
    useEffect(()=>{
        axios.get('http://localhost:8080/todos')
        .then(response => {
            setTodos(response.data);
        })
        .catch(error => {
            console.log('Erro ao carregar todos: ', error)
        })
    }, [])//Array vazio para executar apenas uma vez ao montar o context

    // Função para adicionar um novo todo
    const addTodo = (text) => {
        axios.post('http://localhost:8080/todos', {text})
            .then(response => {
                // A sintaxe [...todos] cria uma nova matriz
                // contendo todos os itens atuais do estado todos.
                // Isso é conhecido como "spread operator" e é uma maneira de copiar todos os elementos de uma matriz para outra.
                setTodos([...todos, response.data])
            })
            .catch(error => {
                console.log('Erro ao adicionar um novo todo: ', error)
            })
        
    }

    // Função para atualizar um todo existente
    const updateTodo = (id, newText) => {
        axios.put(`http://localhost:8080/todos/${id}`, {text: newText})
            .then(response => {
                setTodos(todos.map(todo => todo.id === id ? response.data : todo))
            })
            .catch(error => {
                console.log('Erro ao atualizar um todo: ', error)
            })
    }

    // Função para deletar um todo
    const deleteTodo = (id) => {
        axios.delete(`http://localhost:8080/todos/${id}`)
            .then( () => {
                // A função filter é chamada na matriz todos.
                // A função filter cria uma nova matriz contendo apenas os elementos que satisfazem a condição fornecida.
                // Neste caso, a condição é que o id do todo deve ser diferente do id passado como argumento.
                setTodos(todos.filter(todo => todo.id !== id))
            })
            .catch(error => {
                console.log('Erro ao deletar um todo: ', error)
            })
        
    }

    return (
        // TodoContext.Provider é um componente que faz parte do contexto criado anteriormente.
        // Ele aceita um valor (value) que será disponibilizado para todos os componentes filhos que consomem o contexto.
        <TodoContext.Provider value={{todos, addTodo, updateTodo, deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

// todos: O estado atual das tarefas, um array de objetos.
// addTodo: Função para adicionar uma nova tarefa.
// updateTodo: Função para atualizar uma tarefa existente.
// deleteTodo: Função para deletar uma tarefa.
// children é uma prop especial no React que representa os elementos filhos passados para este componente.