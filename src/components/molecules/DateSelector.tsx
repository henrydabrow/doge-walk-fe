const months = [
  { value: 'Jan', label: 'jan'},
  { value: 'Feb', label: 'feb'},
  { value: 'Mar', label: 'mar'},
  { value: 'Apr', label: 'apr'},
  { value: 'May', label: 'may'},
  { value: 'Jun', label: 'jun'},
  { value: 'Jul', label: 'jul'},
  { value: 'Aug', label: 'aug'},
  { value: 'Sep', label: 'sep'},
  { value: 'Oct', label: 'oct'},
  { value: 'Nov', label: 'nov'},
  { value: 'Dec', label: 'dec'}
]

interface Props {
  name: string;
  border?: string;
  handleChange?: any;
  values?: any;
}

const DateSelector = ({
  name,
  border,
  handleChange,
  values,
}: Props) => (
  <div className="flex justify-between">
    <div>
      <select
        name='day'
        key='day'
        onChange={handleChange}
        className={`h-10 w-20\
                    font-mono text-xs text-gray-500\
                    outline-none\
                    border-2 rounded-md\
                    hover:bg-red-50\
                    focus:border-red-400 focus:bg-red-100 focus:placeholder-gray-500 ` + border}
      >
        <option value="" label="day" className={"text-gray-500"}/>
        { Array.from(Array(30).keys()).map((day) =>
          <option
            value={(day + 1).toString()}
            label={(day + 1).toString()}
            key={(day + 1).toString()}
          />
        )}
      </select>
    </div>

    <div>
      <select
        name='month'
        key='month'
        onChange={handleChange}
        className={`h-10 w-24\
                    font-mono text-xs text-gray-500\
                    outline-none\
                    border-2 rounded-md\
                    hover:bg-red-50\
                    focus:border-red-400 focus:bg-red-100 focus:placeholder-gray-500 ` + border}
      >
        <option value="" label="month" className={"text-gray-500"}/>
        { months.map(({ value, label }, index) =>
          <option
            value={value}
            label={label}
            key={index}
          />
        )}
      </select>
    </div>

    <div>
      <select
        name='year'
        key='year'

        onChange={handleChange}        className={`h-10 w-24\
                    font-mono text-xs text-gray-500\
                    outline-none\
                    border-2 rounded-md\
                    hover:bg-red-50\
                    focus:border-red-400 focus:bg-red-100 focus:placeholder-gray-500 ` + border}
      >
        <option value="" label="year" className={"text-gray-500"}/>
        { Array.from(Array(30).keys()).map((day) =>
          <option
            value={(2021 - day).toString()}
            label={(2021 - day).toString()}
            key={(2021 - day).toString()}
          />
        )}
      </select>
    </div>
  </div>
);

export default DateSelector;
