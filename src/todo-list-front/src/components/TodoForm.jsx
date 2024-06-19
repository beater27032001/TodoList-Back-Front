import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { IoIosAddCircle } from "react-icons/io";
import style from '../styles/TodoForm.module.css'

export default function TodoForm () {
    const {addTodo} = useContext(TodoContext);
    const[text, setText] = useState('')

    const handleInvalid = (event) => {
        event.target.setCustomValidity('Esse campo é obrigatório!');
    };

    const handleChange = (event) => {
        setText(event.target.value);
        event.target.setCustomValidity('');
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim() === '') {
            alert('Preencha o campo antes de enviar!');
        } else {
            addTodo(text);
            setText('');
        }
        
    }

    return(
        <form className={style.todo_form} onSubmit={handleSubmit}>
            <textarea
                className={style.todo_textarea}
                type="text"
                value={text}
                onChange={handleChange}
                onInvalid={handleInvalid}
                required
                placeholder="Add a new task"
            ></textarea>
            <button className={style.todo_button} onClick={handleSubmit}>
                <span className={style.todo_span}>Add</span><IoIosAddCircle className={style.add_task}/> 
            </button>
            {/* <button type="submit">Add</button> */}
            
        </form>
    )
}
