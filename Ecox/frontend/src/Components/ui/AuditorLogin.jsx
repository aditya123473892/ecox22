import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-slice";
import landingimage from "../../assets/landingimage.jpg";

// Mock function to simulate backend verification
const mockVerifyCredentials = (name, accreditationNumber) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === "John Doe" && accreditationNumber === "12345") {
        resolve({ success: true, message: "Login successful" });
      } else {
        reject({ success: false, message: "Invalid credentials" });
      }
    }, 1000);
  });
};

function AuditorLogin() {
  const [name, setName] = useState("");
  const [accreditationNumber, setAccreditationNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = () => {
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!accreditationNumber.trim()) {
      setError("Accreditation Number is required");
      return false;
    }
    if (accreditationNumber.length !== 5) {
      setError("Accreditation Number must be 5 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await mockVerifyCredentials(name, accreditationNumber);
      if (result.success) {
        dispatch(login({ name, accreditationNumber }));
        navigate("/auditor-dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${landingimage})`,
      }}
    >
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 bg-opacity-90 backdrop-filter backdrop-blur-lg transform transition-all duration-300 hover:scale-105 border-2 border-black">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 animate-fadeIn">
          Login as Auditor
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 animate-shake">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="animate-fadeInUp">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="accreditationNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Accreditation Number
            </label>
            <input
              type="text"
              id="accreditationNumber"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={accreditationNumber}
              onChange={(e) => setAccreditationNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuditorLogin;
