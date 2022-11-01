import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePexip } from '../../Providers/Pexip/PexipProvider';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignal,
  faRetweet,
  faLightbulb,
  faMicrophone,
  faMicrophoneSlash,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faMountain,
  faDisplay,
} from '@fortawesome/free-solid-svg-icons';

import './InCall.scss';

export default function InCall() {
  const navigate = useNavigate();

  const [showNearEnd, setShowNearEnd] = useState(false);

  const farEndVideo = useRef(null);
  const nearEndVideo = useRef(null);

  const {
    farEndStream,
    nearEndStream,
    disconnectCall,
    toggleMicMute,
    muteMic,
  } = usePexip();

  function disconnect() {
    navigate('/');
    disconnectCall();
  }

  function switchView(override) {
    if (override) {
      setShowNearEnd(override);
    } else {
      setShowNearEnd((show) => !show);
    }
  }

  useEffect(() => {
    if (farEndStream != null && farEndVideo.current != null) {
      if (
        typeof MediaStream !== 'undefined' &&
        farEndStream instanceof MediaStream
      ) {
        farEndVideo.current.srcObject = farEndStream;
        console.log('farEndStream', 'Set 1');
      } else {
        farEndVideo.current.src = farEndStream;
        console.log('farEndStream', 'Set 2');
      }
    }
  }, [farEndStream]);

  useEffect(() => {
    if (nearEndStream != null && nearEndVideo.current != null) {
      if (
        typeof MediaStream !== 'undefined' &&
        nearEndStream instanceof MediaStream
      ) {
        nearEndVideo.current.srcObject = nearEndStream;
      } else {
        nearEndVideo.current.src = nearEndStream;
      }
    }
  }, [nearEndStream]);

  return (
    <div className='inCallContainer'>
      <div className='callControlLeft'>
        <div className='callControl'>
          <FontAwesomeIcon icon={faUser} />
          <div className='participantCount'>10</div>
        </div>
        <div className='callControl'>
          <FontAwesomeIcon icon={faSignal} />
        </div>
        <div className='callControl' onClick={() => switchView()}>
          <FontAwesomeIcon icon={faRetweet} />
        </div>
        <div className='callControl'>X5</div>
        <div className='callControl callControlActiveYellow'>
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
        <div
          className={
            muteMic ? 'callControl callControlActiveRed' : 'callControl'
          }
          onClick={() => toggleMicMute()}
        >
          {muteMic ? (
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          ) : (
            <FontAwesomeIcon icon={faMicrophone} />
          )}
        </div>
      </div>
      <div className='callControlRight'>
        <div className='callControl'>
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
        </div>
        <div className='callControl'>
          <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
        </div>
        <div className='callControl' onClick={() => switchView(true)}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className='callControl' onClick={() => switchView(false)}>
          <FontAwesomeIcon icon={faMountain} />
        </div>
        <div className='callControl'>
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
        <div className='callControl'>
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
      </div>
      <div className='callVideo'>
        <video
          ref={nearEndVideo}
          autoPlay='autoPlay'
          muted
          style={{ display: showNearEnd ? 'block' : 'none' }}
        ></video>
        <video
          ref={farEndVideo}
          autoPlay='autoPlay'
          style={{ display: !showNearEnd ? 'block' : 'none' }}
        ></video>
      </div>
      <div className='callFooter'>
        <div className='footerButton' onClick={() => toggleMicMute()}>
          <div className='footerButtonButton'>Mic Mute</div>
        </div>

        <div className='footerButton' onClick={() => disconnect()}>
          <div className='footerButtonButton'>Disconnect Call</div>
        </div>
      </div>
    </div>
  );
}
