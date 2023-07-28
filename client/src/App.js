import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Pagenotfound  from './pages/Pagenotfound';


//admin
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import NewUser from './pages/Admin/NewUser';
import LogCheckIn from './pages/Admin/LogCheckIn'
import LogCheckOut from './pages/Admin/LogCheckOut'

//user
import PrivateRoute from './components/Routes/Private'
import UserDashboard from './pages/User/Dashboard'
import UserAbsen from './pages/User/Absen';
import UserPassword from './pages/User/Password';
import Loghistory from './pages/User/Loghistory';

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<Pagenotfound />} />

        <Route path='/admin' element={<AdminRoute />}>
            <Route path='' element={<AdminDashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='users/new' element={<NewUser />} />
            <Route path='log-checkin' element={<LogCheckIn />} />
            <Route path='log-checkout' element={<LogCheckOut />} />
        </Route>

        <Route path='/user' element={<PrivateRoute />}>
            <Route path='' element={<UserDashboard />} />
            <Route path='absen' element={<UserAbsen />} />
            <Route path='password' element={<UserPassword />} />
            <Route path='log-history' element={<Loghistory />} />
        </Route>




     </Routes>
    </>
  );
}

export default App;