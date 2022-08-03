import { useState } from 'react';
import Header from './components/Header/Header'
import PlusIcon from './assets/Plus.svg'
import Clipboard from './assets/Clipboard.svg'
import Todo, { Todos } from './components/Todo/Todo'
import './App.scss'
import nextId from "react-id-generator";
import _ from 'lodash';

function App() {
  const [todos, setTodos] = useState<Todos[]>([])
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')

  function handleNewTodo(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!newTodoTitle.length) return;

    const newTodo: Todos = {
      isDone: false,
      title: newTodoTitle,
      id: nextId(),
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos);
    setNewTodoTitle('');
  }

  function handleRemoveTodo(id: string) {
    let newTodos = _.cloneDeep(todos).filter((todo) => todo.id !== id);

    setTodos(newTodos);
  }

  function handleCheckTodo(id: string) {
    let newTodos = _.cloneDeep(todos).map((todo) =>
      todo.id === id ? ({
        ...todo,
        isDone: !todo.isDone
      }) : todo
    );

    setTodos(newTodos);
  }

  return (
    <div className="main-wrapper">
      <Header />
      <div className="content-wrapper">
        <div className="input-wrapper">
          <input
            value={newTodoTitle}
            placeholder="Adicione uma nova tarefa"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodoTitle(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.keyCode === 13) {
                handleNewTodo(e);
              }
            }}
          />
          <button onClick={handleNewTodo}>
            Criar
            <img src={PlusIcon} alt="Plus" />
          </button>
        </div>
        <div className="todos-wrapper">
          <div className="titles-wrapper">
            <p className="total-todos">Tarefas criadas <span className="highlighted-number">{todos.length}</span></p>
            <p className="total-todos">
              Concluidas
              <span className="highlighted-number">{`${todos.length > 0 ? todos.filter((todo) => todo.isDone).length + " de " + todos.length : todos.length}`}</span>
            </p>
          </div>
          {todos.length ?
            todos.map((todo) => (
              <Todo
                {...todo}
                handleRemove={handleRemoveTodo}
                handleCheck={handleCheckTodo}
              />
            )) : (
              <div className="no-data">
                <img src={Clipboard} alt="Clipboard" />
                <span style={{ fontWeight: 'bold', marginTop: '16px' }}>Você ainda não tem tarefas cadastradas</span>
                <span > Crie tarefas e organize seus itens a fazer</span>
              </div>
            )}
        </div>
      </div>
    </div >
  )
}

export default App
