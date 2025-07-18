import React, { useEffect, useState } from 'react';
import API from '../api';
import axios from 'axios';
import TodoItem from '../components/todoItem';
import { useNavigate } from 'react-router-dom';
import '../App.css'


const Dashboard = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      navigate('/login'); // Redirect to login if token is invalid
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/todos/${editId}`, { text: todoText });
    } else {
      await API.post('/todos', { text: todoText });
    }
    setTodoText('');
    setEditId(null);
    fetchTodos();
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setTodoText(text);
  };

  const handleDelete = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='container'>
      <h2 >Your To-Do List</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter a task"
          required
        />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <TodoItem
          key={todo._id}
         todo={todo}
           onEdit={handleEdit}
           onDelete={handleDelete}
           />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;