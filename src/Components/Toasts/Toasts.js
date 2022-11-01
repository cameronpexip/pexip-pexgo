import { useToasts } from '../../Providers/Toasts/ToastsProvider';

import './Toasts.scss';

export default function Toasts() {
  const { topToasts } = useToasts();

  return (
    <div className='toastsContainer'>
      <div className='toastsTop'>
        {topToasts.length > 0
          ? topToasts.map((toast) => {
              return (
                <div className='toast' key={toast.id}>
                  <div className='toastHeader'>{toast.header}</div>
                  {toast.content ? (
                    <div className='toastContent'>{toast.content}</div>
                  ) : (
                    ''
                  )}
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
}
