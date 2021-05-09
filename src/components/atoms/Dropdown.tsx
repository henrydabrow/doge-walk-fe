interface Props {
  name: string;
  placeholder?: string;
  type?: string;
  border?: string;
  handleChange?: any;
  values?: any;
}

const Dropdown = ({ name, placeholder, type, border, handleChange, values }: Props) => (
  <select
    name={name}
    value={values}
    onChange={handleChange}
    className={"h-10 w-60\
                font-mono text-xs text-gray-500\
                outline-none\
                border-2 rounded-md\
                hover:bg-red-50\
                focus:border-red-400 focus:bg-red-100 focus:placeholder-gray-500 " + border}
  >
    <option value="" label="gender" className={"text-gray-500"}/>
    <option value="female" label="female" />
    <option value="male" label="male" />
    <option value="non-binary" label="non-binary" />
  </select>
);

export default Dropdown;