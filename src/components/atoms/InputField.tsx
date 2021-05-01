import { Field } from 'formik';

export interface Props {
  name: string;
  placeholder?: string;
  type?: string;
  border?: string;
}

const InputField = ({ name, placeholder, type, border }: Props) => (
  <Field
    name={name}
    placeholder={placeholder || ''}
    type={type || 'text'}
    className={"block h-10 w-60 my-4 p-4\
                font-mono text-xs\
                outline-none\
                border-2 rounded-md\
                hover:bg-red-50\
                focus:border-red-400 focus:bg-red-100 focus:placeholder-gray-500 " + border}
  />
);

export default InputField;