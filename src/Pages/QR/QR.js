import { useEffect, useState } from 'react';
import { useZxing } from 'react-zxing';
import { useNavigate } from 'react-router-dom';
import { useToasts } from '../../Providers/Toasts/ToastsProvider';
import { usePexip } from '../../Providers/Pexip/PexipProvider';

import './QR.scss';
import VideCover from '../../Assets/VideoCover.png';

export default function QR() {
  const [qrWait, setQRWait] = useState(false);
  const { addTopToast } = useToasts();
  const navigate = useNavigate();

  const { makeCall } = usePexip();

  const { ref } = useZxing({
    onResult(result) {
      if (!qrWait) {
        addTopToast(`QR Code Read`, null, 1000);
        callAddress(result.getText());

        setQRWait(true);
        setTimeout(setQRWait(false), 1000);
      }
    },
  });

  function callAddress(json) {
    json = JSON.parse(json);

    if (!json || !json.pexCall) {
      addTopToast(`Please check your QR code and try again`, null, 3000);
      return;
    }

    addTopToast(`Calling ${json.pexCall}`, null, 3000);
    navigate('/call');
    makeCall(json.pexCall, 'RealWare Navigator');
  }

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
          <video ref={ref} autoPlay='autoplay' poster={VideCover} />
        </div>
      </div>
      <div className='qrFooter'>
        <div className='qrFooterLeft'></div>
        <div
          className='footerButton'
          onClick={() => navigate('/')}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
        >
          <div className='footerButtonButton'>Go Back</div>
        </div>
        <div className='qrFooterRight'></div>
      </div>
    </div>
  );
}
