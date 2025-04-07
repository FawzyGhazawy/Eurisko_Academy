import Navbar from "./components/Navbar";
import { Searchbar } from "./components/SearchBar";
import UserGrid from "./components/UserGrid";


function App() {
  return (
<div className="min-h-screen text-black bg-white dark:bg-black dark:text-white">
  <Navbar />
  <Searchbar />
  <UserGrid />
</div>

  );
}

export default App;
