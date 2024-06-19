//import './App.css'
import style from './styles/App.module.css'
import './styles/Global.css'
import TodoHeader from './components/TodoHeader'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { TodoProvider } from './context/TodoContext'

function App() {

  return (
    <TodoProvider>
      <TodoHeader />
      <main className={style.main}>
        <TodoForm />
        <TodoList />
      </main>
    </TodoProvider>
  )
}

export default App
