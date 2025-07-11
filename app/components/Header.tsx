import { useState } from "react";
import { Form, Link } from "react-router";
export default function Header( props: { isLogin: boolean } ) {
  const { isLogin } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Musica
        </Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <nav
          className={`absolute inset-x-0 top-full bg-white text-gray-800 flex flex-col md:static md:flex md:flex-row md:bg-transparent md:text-white ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            <li>
                  <Link
                    to="/about"
                    className="block px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    About
                  </Link>
                </li>
                { isLogin ? (<><li>
              <button
                type="button"
                className="block px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                // onClick={() => setReadyPost(true)}
              >
                Post
              </button></li>
              <li>
              <Link to ="/logout" className="block px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition">
                Logout
              </Link>
            </li></>
                ):(    
              <>  
                <li>
                  <div
                    className="block px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                   <Form method="post" action="/auth/auth0">
                     <button type="submit">
                       Login
                    </button>
                   </Form>
                  </div>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded hover:bg-gray-200 md:hover:bg-indigo-700 md:hover:text-white transition"
                  >
                    SignUp
                  </Link>
                </li>
              </>) }  
          </ul>
        </nav>
      </div>
    </header>
  );
}
