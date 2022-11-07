import { useToasts } from '../../Providers/Toasts/ToastsProvider';
import { useNavigate } from 'react-router-dom';

import { usePexip } from '../../Providers/Pexip/PexipProvider';

import './Favourites.scss';

export default function Favourites() {
  const { topToasts, addTopToast } = useToasts();
  const navigate = useNavigate();

  const { makeCall } = usePexip();

  let favourites = [
    {
      name: 'cm',
      description: "Cameron McGuffie's VMR",
    },
    {
      name: 'healthcare.demo',
      description: 'Healthcare Demo VMR',
    },
    {
      name: 'teams.demo',
      description: 'Teams Demo VMR',
    },
  ];

  function callFavourite(index) {
    addTopToast(`Calling ${favourites[index].description}`, null, 3000);
    navigate('/call');
    makeCall(favourites[index].name, 'RealWare Navigator');
  }

  return (
    <div className='favouriteContainer'>
      <div className='favouriteHeader'>Favourites</div>
      <div className='favouriteContent'>
        <div className='optionCards'>
          {favourites.map((favourite, index) => {
            return (
              <div
                className='optionCard'
                key={index}
                onClick={() => callFavourite(index)}
                aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Select ${
                  index + 1
                }`}
                title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Select ${
                  index + 1
                }`}
              >
                <div className='optionCardNumber'>{`${index + 1}`}</div>
                <div className='optionCardHeader'>{favourite.name}</div>
                <div className='optionCardText'>{favourite.description}</div>
              </div>
            );
          })}
        </div>
        <div className='favouriteContentText'>
          Say "Select <i>n</i>" where <i>n</i> is the item you wish to call
        </div>
      </div>
      <div className='favouriteFooter'>
        <div className='favouriteFooterLeft'></div>
        <div
          className='footerButton'
          onClick={() => navigate('/')}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
        >
          <div className='footerButtonButton'>Go Back</div>
        </div>
        <div className='favouriteFooterRight'></div>
      </div>
    </div>
  );
}
