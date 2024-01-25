import {Routes,Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      hi
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/account' element={<Account />} />
     </Routes>
    </div>
  );
}

export default App;
