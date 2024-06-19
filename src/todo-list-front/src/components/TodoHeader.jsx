import style from '../styles/TodoHeader.module.css'

export default function TodoHeader() {
    return(
        <div className={style.header}>
            <div className={style.content}>
                {/* <LogoTodo/> */}
                <div className={style.text}>
                    <h2>TodoList</h2>
                </div>
            </div>
        </div>
    )
}
