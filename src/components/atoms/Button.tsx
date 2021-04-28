export interface Props {
  label: string;
}

const Button = ({label}: Props) => (
  <button
    className="
      w-28 my-2 px-3 py-2 mx-9
      font-mono text-sm text-gray-600
      border-2 rounded-md
      bg-purple-50 border-purple-300
      hover:bg-purple-200 hover:text-gray-800
  ">
    {label}
  </button>
);

export default Button;