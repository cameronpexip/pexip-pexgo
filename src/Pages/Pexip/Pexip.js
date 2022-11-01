import { Routes, Route } from 'react-router-dom';

import Toasts from '../../Components/Toasts/Toasts';
import Landing from '../Landing/Landing';
import Favourites from '../Favourites/Favourites';
import QR from '../QR/QR';
import InCall from '../InCall/InCall';

import PexipProvider from '../../Providers/Pexip/PexipProvider';
import ToastsProvider from '../../Providers/Toasts/ToastsProvider';

import './Pexip.scss';

export default function Pexip() {
  return (
    <ToastsProvider>
      <PexipProvider>
        <div className='pageContainer'>
          <Toasts />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='favourites' element={<Favourites />} />
            <Route path='qr' element={<QR />} />
            <Route path='call' element={<InCall />} />
          </Routes>
        </div>
      </PexipProvider>
    </ToastsProvider>
  );
}
