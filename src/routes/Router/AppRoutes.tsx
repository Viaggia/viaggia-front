import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import NotFound from '../../pages/NotFound/NotFound'
import Details from '../../pages/Details/Details'
import Payment from '../../pages/Payment/Payment'
import Search from '../../pages/Search/Search'
import Profile from '../../pages/Profile/Profile'
import Recovery from '../../pages/Recovery/Recovery'
import TokenVerification from '../../pages/Recovery/TokenVerification'
import NewPassword from '../../pages/Recovery/NewPassword'
import Packages from '../../pages/Packages/Packages'
import AuthSuccess from '../../pages/AuthSuccess/AuthSuccess'
import Promotion from '../../pages/Promotion/Promotion'



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/details" element={<Details />} />
      <Route path="/payment" element={<Payment />} />
      <Route path='/recovery' element={<Recovery />} />
      <Route path='/recovery/token' element={<TokenVerification />} />
      <Route path='/recovery/newpassword' element={<NewPassword />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/auth-success" element={<AuthSuccess />} />

      <Route path="/promotion" element={<Promotion />} />

    </Routes>
  )
}

export default AppRoutes
