import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Settings.scss';

export default function Settings() {
  const [fullScreen, setFullScreen] = useState(false);
  const navigate = useNavigate();

  function toggleFullscreen() {
    if (!fullScreen) {
      document.documentElement.webkitRequestFullScreen();
    } else {
      document.webkitExitFullscreen();
    }

    setFullScreen((setting) => {
      return !setting;
    });
  }

  return (
    <div className='settingsContainer'>
      <div className='settingsHeader'>Settings</div>
      <div className='settingsContent'>
        <div
          className='settingsButton'
          onClick={() => toggleFullscreen()}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Toggle Fullscreen`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Toggle Fullscreen`}
        >
          Toggle Fullscreen
        </div>
      </div>
      <div className='settingsFooter'>
        <div className='settingsFooterLeft'></div>
        <div
          className='footerButton'
          onClick={() => navigate('/')}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
        >
          <div className='footerButtonButton'>Go Back</div>
        </div>
        <div className='settingsFooterRight'></div>
      </div>
    </div>
  );
}
