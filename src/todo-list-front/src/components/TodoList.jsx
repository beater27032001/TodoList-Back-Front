import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"
import TodoItem from "./TodoItem"
import style from '../styles/TodoList.module.css'


export default function TodoList() {
    const{todos} = useContext(TodoContext)

    return(
        <div className={style.todo_list}>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}
