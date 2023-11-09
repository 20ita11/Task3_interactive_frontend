import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/TodoList.css';

const TodoList = ({ setPage }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedData, setEditedData] = useState('');
  const [editedStatus, setEditedStatus] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const navigate = useNavigate();


  const fetchTasks = () => {
    const email = localStorage.getItem('userEmail');

    fetch(`https://nm-backend-ctri.onrender.com/getTasks/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        if (data.length > 0) {
          console.log(data.length);
          const userUid = data[0].uid;
          localStorage.setItem('userUid', userUid);
        } else {
          console.log("no todo");
        }
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const addTask = () => {
    const userId = localStorage.getItem('userId');

    fetch('https://nm-backend-ctri.onrender.com/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: newTask,
        status: false,
        userCredentials: {
          id: localStorage.getItem("userUid"),
        },
      }),
    })
      .then(() => {
        setNewTask('');
        fetchTasks();
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const editTask = (task) => {
    setEditingTask(task.taskId);
    setEditedData(task.data);
    setEditedStatus(task.status);
  };

  const toggleStatus = (task) => {
    setEditedData(task.data);
    setEditedStatus(!task.status);
  };

  const saveTask = () => {
    const updatedTask = {
      todoId: editingTask,
      data: editedData,
      status: editedStatus,
      userCredentials: {
        id: localStorage.getItem("userUid"),
      },
    };
    console.log(updatedTask);

    fetch(`https://nm-backend-ctri.onrender.com/updateTask`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        setEditingTask(null);
        setEditedData('');
        setEditedStatus(false);
        fetchTasks();
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  const deleteTask = (task) => {
    fetch(`https://nm-backend-ctri.onrender.com/deleteTasks/${task.taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const goToLogin = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <button type='button' className='logout' onClick={goToLogin}>logout</button>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length===0 ? (<>
        <p>No task</p>
        </>) : (<>
        {/* {console.log(tasks[0].data,"if")} */}
          {tasks.map((task) => (
            <li key={task.taskId} className="task-item">
              <span
                className={task.status ? 'completed' : 'not-completed'}
                onClick={() => toggleStatus(task)}
              >
                {task.data}
              </span>
              <div className="task-actions">
                <button onClick={() => editTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task)}>Delete</button>
              </div>
            </li>
          ))}
        </>)}
      </ul>
      {editingTask !== null && (
        <div className="edit-task">
          <input
            type="text"
            value={editedData}
            onChange={(e) => setEditedData(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={editedStatus}
              onChange={() => setEditedStatus(!editedStatus)}
            />
            Completed
          </label>
          <button onClick={saveTask}>Save</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
