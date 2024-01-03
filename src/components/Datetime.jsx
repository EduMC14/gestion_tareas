
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
  

const Datetime = ( props ) => {
  const handleChange = (newValue) => {
    const newDate = dayjs(newValue).format('YYYY-MM-DD');
    
    console.log(props.property)
    props.save({...props.state, [props.property]:  newDate})
  };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker']}  >
          <div className="date-picker-wrapper">
          <DatePicker 
          label="Fecha"
          value={dayjs(props.state.fecha_a_entregar, 'YYYY-MM-DD')} 
          onChange={handleChange}
          />
          </div>
        </DemoContainer>
      </LocalizationProvider>
      );
}

export default Datetime;