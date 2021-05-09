import InputField from '../atoms/InputField';
import Dropdown from '../atoms/Dropdown';

interface Props {
  inputBorder: string;
  handleChange: any;
  values: any;
}

const ExtendedRegistrationForm = ({ inputBorder, handleChange, values }: Props) => {
  return(
    <>
      <InputField
        name='firstName'
        placeholder='first name'
        border={inputBorder}
      />
      <InputField
        name='lastName'
        placeholder='last name'
        border={inputBorder}
      />
      <InputField
        name='city'
        placeholder='city'
        border={inputBorder}
      />
      <InputField
        name='country'
        placeholder='country'
        border={inputBorder}
      />
      <InputField
        name='postalCode'
        placeholder='postal code'
        border={inputBorder}
      />
      <Dropdown
        handleChange={handleChange}
        values={values.gender}
        name='gender'
        placeholder='gender'
        border={inputBorder}
      />
    </>
  )
}

export default ExtendedRegistrationForm;