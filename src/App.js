import logo from './logo.svg';
import './App.css';
import InscriptionForm from './components/InscriptionForm';

import { Route, Routes } from 'react-router-dom';
import ReservationList from './components/ReservationList';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<InscriptionForm/>}/>
      <Route path='/reservations' element={<ReservationList/>}/>
    </Routes>
    </>
  );
}

export default App;
