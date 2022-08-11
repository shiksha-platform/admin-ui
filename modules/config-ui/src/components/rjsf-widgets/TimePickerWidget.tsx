import { useState } from "react";
import DatePicker from "../chakra-ui/TimePicker";

const parseTime = (timeString: string): Date | undefined => {
  if (timeString == "" || timeString == undefined) return undefined;

  var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
  if (time == null) return undefined;

  var hours = parseInt(time[1], 10);
  if (hours == 12 && !time[4]) {
    hours = 0;
  } else {
    hours += hours < 12 && time[4] ? 12 : 0;
  }
  var d = new Date();
  d.setHours(hours);
  d.setMinutes(parseInt(time[3], 10) || 0);
  d.setSeconds(0, 0);
  return d;
};

const formatTime = (date: Date): string => {
  const hr = date.getHours();
  const min = date.getMinutes();
  return (
    "" + (hr > 12 ? hr - 12 : hr) + ":" + min + " " + (hr > 12 ? "PM" : "AM")
  );
};

const TimePickerWidget = (props: any) => {
  const [value, setValue] = useState(parseTime(props.value));
  return (
    <DatePicker
      id="date"
      selectedDate={value}
      onChange={(date) => {
        props.onChange(formatTime(date as Date));
        setValue(date as Date);
      }}
    />
  );
};

export default TimePickerWidget;
