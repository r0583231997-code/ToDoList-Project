

// export default App;
import React, { useEffect, useState } from 'react';
import service from './service.js';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete, todo.name);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    /* הוספתי מעטפת חיצונית כדי למרכז את הכל באמצע המסך */
    <div className="page-container">
      <section className="todo-card">
        <header className="todo-header">
          <h1>יומן המשימות</h1>
          <form onSubmit={createTodo}>
            <input 
              className="new-todo-input" 
              placeholder="מה יש לנו לעשות היום?" 
              value={newTodo} 
              onChange={(e) => setNewTodo(e.target.value)} 
            />
          </form>
        </header>
        
        <section className="main-content">
          <ul className="task-list">
            {todos.map(todo => {
              return (
                <li className={todo.isComplete ? "task-item completed" : "task-item"} key={todo.id}>
                  <div className="task-view">
                    <input 
                      className="task-toggle" 
                      type="checkbox" 
                      checked={todo.isComplete} 
                      onChange={(e) => updateCompleted(todo, e.target.checked)} 
                    />
                    <label className="task-label">{todo.name}</label>
                    <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>מחק</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default App;