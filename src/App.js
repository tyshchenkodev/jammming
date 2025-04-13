import logo from './logo.svg';
import './App.css';
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