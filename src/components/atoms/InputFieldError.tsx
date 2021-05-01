export interface Props {
  error: string;
}

const InputFieldError = ({ error }: Props) => (
  <p className="font-mono text-xs text-red-400 mx-1">
    {error}
  </p>
);

export default InputFieldError;