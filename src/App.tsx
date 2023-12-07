import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface IToDo {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [newToDo, setNewToDo] = useState('');
  const addToDo = () => {};
  const [search, setSearch] = useState('');
  const searchToDo = () => {};
  const [todos, setTodos] = useState<IToDo[]>([]);

  return (
    <div className='container'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>GraphQL</h1>
      <div className='row'>
        <label htmlFor='addToDo' className='form-label col'>
          Add new item
          <input
            type='text'
            id='addToDo'
            className='form-control my-2'
            value={newToDo}
            onChange={(e) => {
              setNewToDo(e.target.value);
            }}
          />
          <button type='button' className='btn btn-primary' onClick={addToDo}>
            Add
          </button>
        </label>
        <label htmlFor='searchToDo' className='form-label col'>
          Search item
          <input
            type='search'
            id='searchToDo'
            className='form-control my-2'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type='button' className='btn btn-primary' onClick={searchToDo}>
            Search
          </button>
        </label>
      </div>
      <hr />
      <ul>
        {todos.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
