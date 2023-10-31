import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetails';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UsersList/>}/>
      <Route exact path='/user-detail/:id' element={<UserDetail/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
