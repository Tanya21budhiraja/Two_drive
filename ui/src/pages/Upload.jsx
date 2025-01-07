import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to File Management System</h1>
        <p className="text-xl text-gray-600">Get started by registering or logging in.</p>
        <div className="space-x-4">
          <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
          <Link to="/login" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
