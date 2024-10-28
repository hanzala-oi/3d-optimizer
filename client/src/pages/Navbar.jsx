import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md font-poppins">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">3D Optimizer Tool</h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-gray-200 hover:text-white transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              className="text-gray-200 hover:text-white transition duration-200"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
