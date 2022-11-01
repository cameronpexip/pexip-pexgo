export const initialState = { topToasts: [] };

export default function pexipReducer(state, action) {
  const { type, payload } = action;
  let newState = { ...state };

  switch (type) {
    case 'ADD_TOP_TOAST':
      newState.topToasts = [...newState.topToasts, payload.toast];
      break;
    case 'REMOVE_TOP_TOAST':
      newState.topToasts = [
        ...newState.topToasts.filter((t) => t.id != payload.id),
      ];
      break;
  }

  return newState;
}
