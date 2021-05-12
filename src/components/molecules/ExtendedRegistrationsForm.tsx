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
        opts={inputBorder}
      />
      <InputField
        name='lastName'
        placeholder='last name'
        opts={inputBorder}
      />
      <InputField
        name='city'
        placeholder='city'
        opts={inputBorder}
      />
      <InputField
        name='country'
        placeholder='country'
        opts={inputBorder}
      />
      <InputField
        name='postalCode'
        placeholder='postal code'
        opts={inputBorder}
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