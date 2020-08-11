
import React,{useState, useEffect} from 'react';
import Recipe from './components/Recipe';
import './App.css';

function App() {

  const APP_ID = "80be1496";
  const APP_KEY = "f9cc3edbf6390e80fd5233534f8a8c2c";	

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getData();
  }, [query]);

  const getData = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const handleChange = e => {
    setSearch(e.target.value)
    console.log(search)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);  
  }

  return (
    <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={handleChange}/>
          <button className="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
            {recipes.map(recipe => (
              <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}  
              />
            ))};
        </div>
      
    </div>
  );
}

export default App;
