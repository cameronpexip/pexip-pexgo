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
} from '@fortawesome/free-solid-svg-icons';

import './InCall.scss';

export default function InCall() {
  const navigate = useNavigate();

  const [showNearEnd, setShowNearEnd] = useState(false);
  const [flashlightState, setFlashlightState] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);

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

  function switchView(override = undefined) {
    if (override !== undefined) {
      setShowNearEnd(override);
    } else {
      setShowNearEnd((show) => !show);
    }
  }

  function toggleFlashlight(override = undefined) {
    let light = override != undefined ? override : !flashlightState;

    navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
      const track = mediaStream.getVideoTracks()[0];
      track
        .applyConstraints({
          advanced: [{ torch: light }],
        })

        .then(() => {
          setFlashlightState(light);
        })
        .catch((e) => {
          console.error('Could not toggle flashlight', e);
        });
    });
  }

  function setZoom(zoomIn) {
    let zoom = zoomLevel;

    if (zoomIn) {
      zoom = zoom + 1;
    } else {
      zoom = zoom - 1;
    }

    if (zoom < 0) zoom = 0;
    if (zoom > 4) zoom = 4;

    navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
      const track = mediaStream.getVideoTracks()[0];
      track
        .applyConstraints({
          advanced: [{ zoom: zoom }],
        })

        .then(() => {
          setZoomLevel(zoom);
        })
        .catch((e) => {
          alert('Could not zoom camera', e);
          console.error('Could not zoom camera', e);
        });
    });
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
        <div
          className={
            flashlightState
              ? 'callControl callControlActiveYellow'
              : 'callControl'
          }
          onClick={() => toggleFlashlight()}
        >
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
        <div className='callControl' onClick={() => setZoom(true)}>
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
        </div>
        <div className='callControl' onClick={() => setZoom(false)}>
          <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
        </div>
        <div className='callControl' onClick={() => switchView(true)}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className='callControl' onClick={() => switchView(false)}>
          <FontAwesomeIcon icon={faMountain} />
        </div>
        <div className='callControl'>
          <FontAwesomeIcon
            icon={faLightbulb}
            onClick={() => toggleFlashlight(true)}
          />
        </div>
        <div className='callControl'>
          <FontAwesomeIcon
            icon={faLightbulb}
            onClick={() => toggleFlashlight(false)}
          />
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
