import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faQrcode,
  faCalendar,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

import './Landing.scss';
import PexipLogo from '../../Assets/pexHealth.png';

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
            aria-label='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Favourites'
            title='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Favourites'
          >
            <div className='optionCardIcon'>
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className='optionCardHeader'>Favourites</div>
          </div>

          <div
            className='optionCard'
            onClick={() => navigate('/qr')}
            aria-label='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Scan QR'
            title='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Scan QR'
          >
            <div className='optionCardIcon'>
              <FontAwesomeIcon icon={faQrcode} />
            </div>
            <div className='optionCardHeader'>Scan QR</div>
          </div>

          <div
            className='optionCard'
            onClick={() => navigate('/calendar')}
            aria-label='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Calendar'
            title='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Calendar'
          >
            <div className='optionCardIcon'>
              <FontAwesomeIcon icon={faCalendar} />
            </div>
            <div className='optionCardHeader'>Calendar</div>
          </div>

          <div
            className='optionCard'
            onClick={() => navigate('/settings')}
            aria-label='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Settings'
            title='hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Settings'
          >
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
          <img src={PexipLogo} alt='pexHealth' />
        </div>
        <div className='landingRoomName'>Clinic XYZ Southern Region</div>
      </div>
    </div>
  );
}
