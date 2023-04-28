
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const Datetime = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} >
          <DatePicker label="Fecha" />
        </DemoContainer>
      </LocalizationProvider>
      );
}

export default Datetime;