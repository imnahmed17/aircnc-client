import { DateRange } from 'react-date-range';

const Calender = ({ value, handleSelect }) => {
    return (
        <div className='flex justify-center'>
            <DateRange
                rangeColors={['#F43F5E']}
                ranges={[value]}
                onChange={handleSelect}
                // date={new Date()}
                direction='vertical'
                showDateDisplay={false}
                // minDate={value.startDate}
                // maxDate={value.endDate}
            />
        </div>
    );
};

export default Calender;