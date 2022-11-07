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
import VideCover from '../../Assets/VideoCover.png';

export default function InCall() {
  const navigate = useNavigate();

  const [showNearEnd, setShowNearEnd] = useState(false);
  const [flashlightState, setFlashlightState] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const farEndVideo = useRef(null);
  const nearEndVideo = useRef(null);

  const {
    farEndStream,
    nearEndStream,
    disconnectCall,
    toggleMicMute,
    muteMic,
    participantCount,
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

    if (zoom < 1) zoom = 1;
    if (zoom > 4) zoom = 4;

    console.log('Zoom to', zoom);

    navigator.mediaDevices
      .getUserMedia({ video: { zoom: true } })
      .then((mediaStream) => {
        const track = mediaStream.getVideoTracks()[0];

        // const capabilities = track.getCapabilities();
        // const settings = track.getSettings();

        // console.log('capabilities', capabilities);
        // console.log('capabilities.zoom', capabilities.zoom);
        // console.log('settings', settings);

        track
          .applyConstraints({
            advanced: [{ zoom: zoom }],
          })

          .then(() => {
            setZoomLevel(zoom);
          })
          .catch((e) => {
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
          <div className='participantCount'>{participantCount}</div>
        </div>
        <div className='callControl'>
          <FontAwesomeIcon icon={faSignal} />
        </div>
        <div className='callControl'>
          <FontAwesomeIcon icon={faRetweet} />
        </div>
        <div className='callControl'>X{zoomLevel}</div>
        <div
          className={
            flashlightState
              ? 'callControl callControlActiveYellow'
              : 'callControl'
          }
        >
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
        <div
          className={
            muteMic ? 'callControl callControlActiveRed' : 'callControl'
          }
        >
          {muteMic ? (
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          ) : (
            <FontAwesomeIcon icon={faMicrophone} />
          )}
        </div>
      </div>
      <div className='callControlRight'>
        <div
          className='callControlRightButton'
          onClick={() => setZoom(true)}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Zoom In`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Zoom In`}
        >
          Zoom In
        </div>
        <div
          className='callControlRightButton'
          onClick={() => setZoom(false)}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Zoom Out`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Zoom Out`}
        >
          Zoom Out
        </div>
        <div
          className='callControlRightButton'
          onClick={() => switchView(true)}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Switch Near`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Switch Near`}
        >
          Switch Near
        </div>
        <div
          className='callControlRightButton'
          onClick={() => switchView(false)}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Switch Far`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Switch Far`}
        >
          Switch Far
        </div>
        <div
          className='callControlRightButton'
          onClick={() => toggleFlashlight(true)}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Flashlight On`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Flashlight On`}
        >
          Flashlight On
        </div>
        <div
          className='callControlRightButton'
          onClick={() => toggleFlashlight(false)}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Flashlight Off`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:left|Flashlight Off`}
        >
          Flashlight Off
        </div>
      </div>
      <div className='callVideo'>
        <video
          ref={nearEndVideo}
          autoPlay='autoPlay'
          muted
          style={{ display: showNearEnd ? 'block' : 'none' }}
          poster={VideCover}
        ></video>
        <video
          ref={farEndVideo}
          autoPlay='autoPlay'
          style={{ display: !showNearEnd ? 'block' : 'none' }}
          poster={VideCover}
        ></video>
      </div>
      <div className='callFooter'>
        <div className='footerButton'>
          <div
            className='footerButtonButton'
            onClick={() => toggleMicMute()}
            aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Toggle Mute`}
            title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Toggle Mute`}
          >
            Toggle Mute
          </div>
        </div>

        <div
          className='footerButton'
          onClick={() => disconnect()}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Disconnect Call`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Disconnect Call`}
        >
          <div className='footerButtonButton'>Disconnect Call</div>
        </div>
      </div>
    </div>
  );
}
