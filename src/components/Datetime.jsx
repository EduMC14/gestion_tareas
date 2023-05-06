
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
  

const Datetime = ( props ) => {
 
  const handleChange = (newValue) => {
    const newDate = dayjs(newValue).format('DD/MM/YYYY');
    props.save({...props.date, 'fecha_a_entregar':  newDate})
  };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker']} >
          <DatePicker 
          label="Fecha"
          value={dayjs(props.date.fecha_a_entregar, 'DD/MM/YYYY')} 
          onChange={handleChange } />
        </DemoContainer>
      </LocalizationProvider>
      );
}

export default Datetime;