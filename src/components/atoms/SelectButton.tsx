export interface Props {
  label: string;
}

const SelectButton = ({ label }: Props) => (
  <button
    className={`w-32 px-6 py-2 focus:outline-none
                font-mono text-xs text-gray-500
                border-2 rounded-md
                bg-white border-green-400
                hover:bg-green-100 hover:text-gray-800
                focus:border-green-400 focus:bg-green-100 focus:text-gray-800`}
    type="button"
  >
    {label}
  </button>
);

export default SelectButton;