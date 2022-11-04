import { useEffect } from 'react';
import { useZxing } from 'react-zxing';
import { useNavigate } from 'react-router-dom';

import './QR.scss';

export default function QR() {
  const navigate = useNavigate();

  const { ref } = useZxing({
    onResult(result) {
      alert(result.getText());
    },
  });

  useEffect(() => {
    // https://reactjs.org/blog/2020/08/10/react-v17-rc.html#effect-cleanup-timing
    const vidRef = ref.current;

    return () => {
      if (vidRef) {
        const stream = vidRef.srcObject;

        if (stream) {
          const tracks = stream.getTracks();

          tracks.forEach(function (track) {
            track.stop();
          });

          vidRef.srcObject = null;
        }
      }
    };
  });

  return (
    <div className='qrContainer'>
      <div className='qrHeader'>Scan QR Code</div>
      <div className='qrContent'>
        <div className='qrScanner'>
          <video ref={ref} autoPlay='autoplay' />
        </div>
      </div>
      <div className='qrFooter'>
        <div className='qrFooterLeft'></div>
        <div
          className='footerButton'
          onClick={() => navigate('/')}
          title={`hf_make_clickable|hf_show_text|hf_use_description|Go Back`}
        >
          <div className='footerButtonButton'>
            <div className='footerButtonNumber'>1</div>OK
          </div>
        </div>
        <div className='qrFooterRight'></div>
      </div>
    </div>
  );
}
