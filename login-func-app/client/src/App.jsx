import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import Username from './components/Username';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/password' element={<Password />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/recovery' element={<Recovery />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/' element={<Username />} />
      </Routes>
    </Router>
  );
}
export const server = 'http://localhost:5000';
export default App;
