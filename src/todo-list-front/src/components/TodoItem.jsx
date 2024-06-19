import { useContext, useEffect, useState } from "react"
import { TodoContext } from "../context/TodoContext"
import style from "../styles/TodoItem.module.css"
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

export default function TodoItem({todo}) {

    // { updateTodo, deleteTodo } desestrutura as funções updateTodo e deleteTodo do valor do contexto.
    // Essas funções foram definidas no TodoContext e são usadas para atualizar e deletar tarefas, respectivamente.
    const { updateTodo, deleteTodo } = useContext(TodoContext)

    // Controla se o componente está no modo de edição.
    // Quando isEditing é true, o componente renderiza um campo de entrada para editar o texto da tarefa.
    // Quando isEditing é false, o componente renderiza o texto da tarefa e os botões de ação.
    const [isEditing, setIsEditing] = useState(false)

    // Armazena o texto da tarefa enquanto ela está sendo editada.
    // Permite que o usuário veja o texto atual da tarefa e faça alterações enquanto edita.
    const [newText, setNewText] = useState(todo.text)

    // Função para lidar com a edição do todo
    const handleEdit = () => {
        setIsEditing(true)
    }

    // Função para salvar o todo editado
    const handleSave = () => {
        updateTodo(todo.id, {text: newText}).then(() => {
            setIsEditing(false)
        })
    }

    // Função para deletar o todo
    const handleDelete = () => {
        deleteTodo(todo.id)
    }

    useEffect(() => {
        // Exemplo: Monitorar mudanças em todo.text para atualizar newText se necessário
        setNewText(todo.text)
    }, [todo.text]) // Atualiza newText sempre que todo.text mudar

    return (
        <div className={style.todo_item}>
            {isEditing ? (
                // Se verdadeiro
                <>
                    <input
                        className={style.todo_input}
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                    <FaSave className={style.save} onClick={handleSave} />
                    
                    
                </>
            ) : (
                // Se falso
                <>
                    <span>{todo.text}</span>
                    {/* editar */}
                    <FiEdit className={style.edit} onClick={handleEdit} />
                </>
            )}
            {/* Botao sempre está lá */}
            {/* deletar */}
            <MdDelete className={style.delete} onClick={handleDelete} />
        </div>
    )
}
