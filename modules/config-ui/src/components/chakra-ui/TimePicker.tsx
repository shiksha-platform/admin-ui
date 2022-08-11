/**
 * Reference
 * https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9#file-date-picker-tsx
 * https://reactdatepicker.com/#example-select-time-only
 * https://github.com/Hacker0x01/react-datepicker/
 * https://gist.github.com/igoro00/99e9d244677ccafbf39667c24b5b35ed#file-date-picker-css
 */
import React, { HTMLAttributes } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./time-picker.css";

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}: Props & HTMLAttributes<HTMLElement>) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
};

export default DatePicker;
