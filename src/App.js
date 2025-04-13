import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import SearchResults from './components/SearchResults';


export default function App() {
 const searchResults = [{
  id: 1,
  name: "A Beautiful Lie",
  artist: "30 seconds to mars",
  album: "A Beautiful Lie"
 }];

  return (
    <>
    <SearchResults tracks={searchResults}/>
    </>
  )
};

=======

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> 3644098 (Create SearchBar component)
