import { useEffect, useState, useCallback } from 'react';
import { useToasts } from '../../Providers/Toasts/ToastsProvider';
import { useNavigate } from 'react-router-dom';

import { usePexip } from '../../Providers/Pexip/PexipProvider';

import './Calendar.scss';

export default function Calendar() {
  const [calendars, setCalendars] = useState([
    {
      date: '',
      subject: 'Medical Checkup',
      owner: 'Dr S. Jones',
      uri: 'pexTV.health@pexipdemo.com',
    },
    {
      date: '',
      subject: 'Medical Checkup',
      owner: 'Dr A. Peterson',
      uri: 'pextv.medic@pexipdemo.com',
    },
    {
      date: '',
      subject: 'Board Meeting',
      owner: 'Private',
      uri: 'pextv@pexipdemo.com',
    },
  ]);

  const { addTopToast } = useToasts();
  const navigate = useNavigate();

  const { makeCall } = usePexip();

  const getDates = useCallback(() => {
    let cal = [...calendars];
    let now = new Date();

    cal[0].date = `${now.getHours()}:00 - ${now.getHours() + 1}:00`;
    cal[1].date = `${now.getHours() + 1}:00 - ${now.getHours() + 1}:30`;
    cal[2].date = `${now.getHours() + 2}:00 - ${now.getHours() + 2}:30`;

    setCalendars(cal);
  }, []);

  function callCalendar(index) {
    addTopToast(`Calling ${calendars[index].subject}`, null, 3000);
    navigate('/call');
    makeCall(calendars[index].uri, 'RealWare Navigator');
  }

  useEffect(() => {
    getDates();
  }, [getDates]);

  return (
    <div className='calendarContainer'>
      <div className='calendarHeader'>Calendar</div>
      <div className='calendarContent'>
        <div className='optionCards'>
          {calendars.map((calendar, index) => {
            return (
              <div
                className='optionCard'
                key={index}
                onClick={() => callCalendar(index)}
                aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Select ${
                  index + 1
                }`}
                title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Select ${
                  index + 1
                }`}
              >
                <div className='optionCardNumber'>{`${index + 1}`}</div>
                <div className='optionCardHeader'>{calendar.date}</div>
                <div className='optionCardText'>{calendar.subject}</div>
                <div className='optionCardText'>{calendar.owner}</div>
              </div>
            );
          })}
        </div>
        <div className='calendarContentText'>
          Say "Select <i>n</i>" where <i>n</i> is the item you wish to call
        </div>
      </div>
      <div className='calendarFooter'>
        <div className='calendarFooterLeft'></div>
        <div
          className='footerButton'
          onClick={() => navigate('/')}
          aria-label={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
          title={`hf_no_number|hf_hide_text|hf_use_description|hf_orientation:right|Go Back`}
        >
          <div className='footerButtonButton'>Go Back</div>
        </div>
        <div className='calendarFooterRight'></div>
      </div>
    </div>
  );
}
