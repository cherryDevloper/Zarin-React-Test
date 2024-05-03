import { DatePicker } from 'antd';
import moment from 'moment';

interface YearPickerProps {
  onYearChange: (year: number) => void;
}

const YearPicker = ({ onYearChange }: YearPickerProps) => {
  const handleChange = (date: moment.Moment | null) => {
    if (date) {
      onYearChange(date.year());
    }
  };

  return (
    <div className="flex items-center mb-4 w-1/2">
      <DatePicker
        picker="year"
        placeholder="Select a year"
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default YearPicker;
