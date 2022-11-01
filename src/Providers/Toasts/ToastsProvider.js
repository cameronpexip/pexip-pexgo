import { createContext, useReducer, useContext } from 'react';
import ToastsReducer, { initialState } from './toastsReducer';

import uuid from 'react-uuid';

const ToastsContext = createContext(initialState);

export const pexRTC = new window['PexRTC']();

export function useToasts() {
  const context = useContext(ToastsContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within ToastsContext');
  }

  return context;
}

export default function ToastsProvider({ children }) {
  const [state, dispatch] = useReducer(ToastsReducer, initialState);

  const value = {
    topToasts: state.topToasts,
    addTopToast: addTopToast,
  };

  function addTopToast(header, content, duration) {
    let id = uuid();

    dispatch({
      type: 'ADD_TOP_TOAST',
      payload: {
        toast: {
          id: id,
          header: header,
          content: content,
        },
      },
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_TOP_TOAST',
        payload: {
          id: id,
        },
      });
    }, duration);
  }

  return (
    <ToastsContext.Provider value={value}>{children}</ToastsContext.Provider>
  );
}
