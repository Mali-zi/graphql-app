import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import { NavLink } from 'react-router-dom';

interface IToDo {
  id: string;
  title: string;
  completed: boolean;
}

function Home() {
  const url = 'https://graphqlzero.almansi.me/api';
  const [newToDo, setNewToDo] = useState('');
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState<IToDo[]>([]);

  const searchToDo = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      const searchQuery = `query FilteredTodos($options: PageQueryOptions) {
        todos(options: {
          "search": {"q": ${search}}
        }) {
          data {
            id
            title
            completed
            }
          }
        }
      }`;
      const data = await makeRequest(searchQuery);
      setSearch('');
    }
  };

  const createNewToDo = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (newToDo.trim().length > 0) {
      const newTaskQuery = `mutation CreateNewToDo {
        createTodo(input: {title: "${newToDo}", completed: false}) {
          title
          id
          completed
        }
      }`;
      const data = await makeRequest(newTaskQuery);
      setNewToDo('');
    }
  };

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const tickCheckBox = `mutation CreateNewToDo {
      createTodo(input: {title: "${newToDo}", completed: false}) {
        title
        id
        completed
      }
    }`;
  };

  const makeRequest = async (query: string) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  };

  makeRequest(`query Todos {
    todos {
      data {
        id
        title
        completed
      }
    }
  }`).then((data) => setTodos(data.data.todos.data));

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log('uid', uid);
      } else {
        // User is signed out
        // ...
        console.log('user is logged out');
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <NavLink to="/login" className="btn btn-primary me-3">
          Log In
        </NavLink>
        <NavLink to="/signup" className="btn btn-primary me-3">
          Sing Up
        </NavLink>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>GraphQL</h1>
      <div className="row">
        <label htmlFor="addToDo" className="form-label col">
          Add new item
          <input
            type="text"
            id="addToDo"
            className="form-control my-2"
            value={newToDo}
            onChange={(e) => {
              setNewToDo(e.target.value);
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e: React.MouseEvent) => createNewToDo(e)}
          >
            Add
          </button>
        </label>
        <label htmlFor="searchToDo" className="form-label col">
          Search item
          <input
            type="search"
            id="searchToDo"
            className="form-control my-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e: React.MouseEvent) => searchToDo(e)}
          >
            Search
          </button>
        </label>
      </div>
      <hr />
      <ul className="list-group">
        {todos.map((item) => (
          <li key={item.id} className="d-flex list-group-item">
            <input
              type="checkbox"
              className="p-2 flex-shrink-0"
              checked={item.completed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheck(e)
              }
            />
            <div className="p-2 w-100">{item.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
