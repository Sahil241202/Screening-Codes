import { useEffect, useState } from 'react';
import './SearchingBar.css';

function App() {
  const [inputs, setInputs] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache,setCache] = useState({});

  async function fetchData() {
    if(cache[inputs]){
      console.log("CACHE RETURN", cache[inputs]);
      setResults(cache[inputs]);
      return;
    }


    console.log("API CALL",inputs);
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + inputs);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({...prev, [inputs]: json?.recipes}));
  }

  useEffect(() => {
    //Concept of debouncing
    const timer = setTimeout(fetchData,300);

    return () => {
      clearTimeout(timer);
    }
  }, [inputs]);

  return (
    <div className="App">
      <h1 className="Heading">Autocomplete SearchBar</h1>
      <div>
        <input 
          className="search-input" 
          type="text" 
          placeholder="Enter any recipe you want" 
          onChange={(e) => setInputs(e.target.value)} 
          onFocus={(e) => setShowResults(true)}
          onBlur={(e) => setShowResults(false)}
          value={inputs} 
        />

        {showResults && (
          <div className="results-container">
        {results.map((r) => (
            <span className="result" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
