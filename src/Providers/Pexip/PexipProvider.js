import React, { createContext, useReducer, useContext, useEffect } from 'react';
import pexipReducer, { initialState } from './pexipReducer';

const PexipContext = createContext(initialState);

export const pexRTC = new window['PexRTC']();

export function usePexip() {
  const context = useContext(PexipContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within PexipContext');
  }

  return context;
}

export default function PexipProvider({ children }) {
  const [state, dispatch] = useReducer(pexipReducer, initialState);

  function toggleMicMute() {
    pexRTC.muteAudio(!state.muteMic);

    dispatch({
      type: 'UPDATE_MIC_MUTE',
      payload: {
        muteMic: !state.muteMic,
      },
    });
  }

  function toggleVidMute() {
    pexRTC.muteVideo(!state.muteVid);

    dispatch({
      type: 'UPDATE_VID_MUTE',
      payload: {
        muteVid: !state.muteVid,
      },
    });
  }

  function updatePinState(pinState) {
    dispatch({
      type: 'UPDATE_PIN_STATE',
      payload: {
        pinState: pinState,
      },
    });
  }

  function updateCallState(callState) {
    dispatch({
      type: 'UPDATE_CALL_STATE',
      payload: {
        callState: callState,
      },
    });
  }

  function updateFarEndStream(stream) {
    dispatch({
      type: 'UPDATE_FAR_END_STREAM',
      payload: {
        farEndStream: stream,
      },
    });
  }

  function updateNearEndStream(stream) {
    dispatch({
      type: 'UPDATE_NEAR_END_STREAM',
      payload: {
        nearEndStream: stream,
      },
    });
  }

  function selectAudioDevice(deviceId) {
    dispatch({
      type: 'SELECT_AUDIO_DEVICE',
      payload: {
        selectedAudioDevice: deviceId,
      },
    });
  }

  function selectVideoDevice(deviceId) {
    dispatch({
      type: 'SELECT_VIDEO_DEVICE',
      payload: {
        selectedVideoDevice: deviceId,
      },
    });
  }

  function updateinRemotePresentation(inRemotePresentation) {
    dispatch({
      type: 'UPDATE_IN_PRESENTATION',
      payload: {
        inRemotePresentation: inRemotePresentation,
      },
    });
  }

  function updatePresentationSource(presentationSource) {
    dispatch({
      type: 'UPDATE_PRESENTATION_SOURCE',
      payload: {
        presentationSource: presentationSource,
      },
    });
  }

  function updateinLocalPresentation(inLocalPresentation) {
    dispatch({
      type: 'UPDATE_PRESENTING_LOCALLY',
      payload: {
        inLocalPresentation: inLocalPresentation,
      },
    });
  }

  function rosterListUpdate(roster) {
    dispatch({
      type: 'UPDATE_PARTICIPANT_COUNT',
      payload: {
        participantCount: roster.length,
      },
    });
  }

  function makeCall(meeting, participantName) {
    pexRTC.vp8_enabled = false;
    pexRTC.vp9_enabled = false;

    pexRTC.muteAudio(state.muteMic);
    pexRTC.muteVideo(state.muteVid);

    pexRTC.video_source = state.selectedVideoDevice;
    pexRTC.audio_source = state.selectedAudioDevice;

    pexRTC.makeCall('au.pexipdemo.com', meeting, participantName);
  }

  function enterPin(pin) {
    pexRTC.connect(pin);
    updatePinState('');
  }

  function disconnectCall() {
    pexRTC.disconnect();
    pexRTC.pin = null;
    updatePinState('');
    updateinRemotePresentation(false);
  }

  function sendDTMF(dtmf) {
    pexRTC.sendDTMF(dtmf);
  }

  function toggleLocalPresentation() {
    if (!state.inLocalPresentation) {
      pexRTC.present('screen');
    } else {
      pexRTC.present(null);
    }
  }

  const value = {
    muteMic: state.muteMic,
    muteVid: state.muteVid,
    pinState: state.pinState,
    callState: state.callState,
    inRemotePresentation: state.inRemotePresentation,
    presentationSource: state.presentationSource,
    inLocalPresentation: state.inLocalPresentation,

    farEndStream: state.farEndStream,
    nearEndStream: state.nearEndStream,
    selectedAudioDevice: state.selectedAudioDevice,
    selectedVideoDevice: state.selectedVideoDevice,

    participantCount: state.participantCount,

    toggleMicMute,
    toggleVidMute,
    selectAudioDevice,
    selectVideoDevice,

    makeCall,
    enterPin,
    disconnectCall,
    sendDTMF,
    toggleLocalPresentation,
  };

  useEffect(() => {
    function callSetup(stream, pinStatus) {
      switch (pinStatus) {
        case 'required':
        case 'optional':
          updatePinState(pinStatus);
          break;
        default:
          updatePinState('');
          pexRTC.connect();
      }

      updateNearEndStream(stream);
      updateCallState(true);
    }

    function callConnected(stream) {
      updateFarEndStream(stream);
      updateCallState(true);
    }

    function callDisconnected(reason = '') {
      pexRTC.pin = null;
      updateCallState(false);
      updatePinState('');
      updateinRemotePresentation(false);
    }

    function callError(error) {
      pexRTC.pin = null;
      updateCallState(false);
      updatePinState('');
      updateinRemotePresentation(false);

      alert(error);
    }

    function callPresentation(setting, presenter, uuid) {
      updatePresentationSource('');
      updateinRemotePresentation(setting);

      // If someone starts presenting, track no loger presenting locally.
      if (setting === true) {
        updateinLocalPresentation(false);
      }
    }

    function callPresentationReload(url) {
      if (!state.inLocalPresentation) {
        updatePresentationSource(url);
      }
    }

    function screenshareConnected(stream) {
      updateinRemotePresentation(true);
      updateinLocalPresentation(true);
      updatePresentationSource(stream);
    }

    function screenshareStopped(reason) {
      updateinRemotePresentation(false);
      updateinLocalPresentation(false);
      updatePresentationSource('');
    }

    // Link the callSetup method to the onSetup callback
    pexRTC.onSetup = callSetup;
    // Link the callConnected method to the onConnect callback
    pexRTC.onConnect = callConnected;
    // Link the callError method to the onError callback
    pexRTC.onError = callError;
    // Link the callDisconnected method to the onDisconnect callback
    pexRTC.onDisconnect = callDisconnected;

    pexRTC.onPresentation = callPresentation;
    pexRTC.onPresentationReload = callPresentationReload;

    pexRTC.onScreenshareConnected = screenshareConnected;
    pexRTC.onScreenshareStopped = screenshareStopped;

    pexRTC.onRosterList = rosterListUpdate;
  }, []);

  return (
    <PexipContext.Provider value={value}>{children}</PexipContext.Provider>
  );
}
