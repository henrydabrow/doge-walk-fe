import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const linkStyling = "p-2 border-2 border-purple-50 hover:border-purple-200 hover:text-gray-800 rounded-md";
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className="flex justify-between m-2 h-16 border-2 border-purple-200 rounded-md \
                    bg-purple-50 text-gray-600 font-mono font-medium text-xl">
      <Link to="/" className="pl-8 pt-4 hover:text-gray-800 animate-pulse-slow">doge walk</Link>

      <div className="flex">
        { expanded ?
          <div className="pt-4 md:hidden">
            <Link className={`${linkStyling} text-sm`} to="/login">login</Link>
            <Link className={`${linkStyling} text-sm`} to="/register">register</Link>
            <Link className={`${linkStyling} text-sm`} to="/pets">pets</Link>
          </div> : null
        }
        <div className="px-4 pt-4 pr-8 cursor-pointer md:hidden" onClick={() => {setExpanded(!expanded)}}>
          <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
      </div>
      <div className="pr-8 pt-4 md:block hidden">
        <Link className={linkStyling} to="/login">login</Link>
        <Link className={linkStyling} to="/register">register</Link>
        <Link className={linkStyling} to="/pets">pets</Link>
      </div>
    </nav>
  )
}

export default Navbar;
