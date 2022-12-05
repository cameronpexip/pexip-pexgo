import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faQrcode,
  faCalendar,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

import './Landing.scss';
import PexipHealthLogo from '../../Assets/pexHealth.png';
import PexipLogo from '../../Assets/logo-white.png';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className='landingContainer'>
      <div className='landingHeader'>
        <img src={PexipHealthLogo} alt='pexHealth' />
      </div>
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
            <div className='optionCardHeader'>
              Favourites
              <br />
              お気に入り
            </div>
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
            <div className='optionCardHeader'>
              Scan QR
              <br />
              QR をスキャン
            </div>
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
            <div className='optionCardHeader'>
              Calendar
              <br />
              カレンダー
            </div>
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
            <div className='optionCardHeader'>
              Settings
              <br />
              設定
            </div>
          </div>
        </div>
      </div>
      <div className='landingFooter'>
        <div className='landingDeviceName'>
          healthcare-07
          <br />
          健康-07
        </div>
        <div className='landingLogo'>
          <img src={PexipLogo} alt='pexHealth' />
        </div>
        <div className='landingRoomName'>
          My Medical Clinic
          <br />
          私の診療所
        </div>
      </div>
    </div>
  );
}
