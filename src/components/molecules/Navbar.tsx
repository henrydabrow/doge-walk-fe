import { Link } from "react-router-dom"

const Navbar = () => (
  <nav className="flex justify-between item-center h-24 bg-white-100 text-black-400 hover:bg-gray-50 relative font-mono font-medium text-xl">
    <Link to="/" className="pl-8 pt-8 text-2xl animate-pulse-slow">Jeety</Link>
    <div className="px-4 pt-6 pr-10 cursor-pointer md:hidden">
      <svg
        className="w-11 h-11"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </div>
    <div className="pr-10 pt-9 md:block hidden">
      <Link className="p-4" to="/">home</Link>
      <Link className="p-4" to="/login">login</Link>
      <Link className="p-4" to="/register">register</Link>
    </div>
  </nav>
)

export default Navbar;
