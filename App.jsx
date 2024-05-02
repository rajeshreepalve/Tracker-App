import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        userId: 1,
        id: tasks.length + 1,
        title: newTask,
        completed: false
      };

      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>📑🖊️Task Tracker🖊️📑</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="🖊️Add Your Task🖊️"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className={task.completed ? 'completed' : ''}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.completed ? 'Completed' : 'Incomplete'}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => toggleComplete(task.id)} className={task.completed ? 'undo-button' : 'complete-button'}>
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
