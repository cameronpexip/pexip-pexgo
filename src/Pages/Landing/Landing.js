import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faQrcode,
  faCalendar,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

import './Landing.scss';
import PexipLogo from '../../Assets/logo-white.png';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className='landingContainer'>
      <div className='landingHeader'>Department of Health</div>
      <div className='landingContent'>
        <div className='optionCards'>
          <div
            className='optionCard'
            onClick={() => navigate('/favourites')}
            aria-label='hf_no_number|hf_show_text|hf_use_description|hf_orientation:right|Select Favourites'
            title='hf_no_number|hf_show_text|hf_use_description|hf_orientation:right|Select Favourites'
          >
            <div className='optionCardNumber'>1</div>
            <div className='optionCardIcon'>
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className='optionCardHeader'>Favourites</div>
          </div>

          <div
            className='optionCard'
            onClick={() => navigate('/qr')}
            title={`hf_make_clickable|hf_show_text|hf_use_description|Select QR`}
          >
            <div className='optionCardNumber'>2</div>
            <div className='optionCardIcon'>
              <FontAwesomeIcon icon={faQrcode} />
            </div>
            <div className='optionCardHeader'>Scan QR</div>
          </div>

          <div className='optionCard'>
            <div className='optionCardNumber'>3</div>
            <div className='optionCardIcon'>
              <FontAwesomeIcon icon={faCalendar} />
            </div>
            <div className='optionCardHeader'>Calendar</div>
          </div>

          <div className='optionCard'>
            <div className='optionCardNumber'>4</div>
            <div className='optionCardIcon'>
              <FontAwesomeIcon icon={faTools} />
            </div>
            <div className='optionCardHeader'>Settings</div>
          </div>
        </div>
      </div>
      <div className='landingFooter'>
        <div className='landingDeviceName'>healthcare-007</div>
        <div className='landingLogo'>
          <img src={PexipLogo} />
        </div>
        <div className='landingRoomName'>Clinic XYZ Southern Region</div>
      </div>
    </div>
  );
}
