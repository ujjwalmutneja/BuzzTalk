
import React from "react";

const Service = () => {
  return (
    <div id="services" className="container mx-auto p-4 mt-24 pt-20 mb-20 ">
      {/* Service Title */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-grey">
          Our Services 
        </h1>
      </div>

      {/* Service Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* AI Chatbot */}
        <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 h-96">
          {/* Icon */}
          <div className="flex justify-center items-center mt-8">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRcb2Qt33rBqR1f_HKMfduwNOPnpo17VfQYw&s"
                alt="Chatbot Icon"
                className="w-20 h-20 rounded-full"
              />
            </div>
          </div>
          <div className="p-8 text-center">
            <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              AI Chatbot
            </h5>
            <p className="mb-4 font-medium text-gray-700 dark:text-gray-400">
              Enhance user experience with our advanced AI-powered chatbot that
              provides real-time support and intelligent responses.
            </p>
          </div>
        </div>

        {/* Responsive Design */}
        <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 h-96">
          <div className="flex justify-center items-center mt-8">
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex justify-center items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbXg-bYQh0EyLHd_jwkaJNVESKvlgs6_qF3g&s"
                alt="Responsive Design Icon"
                className="w-20 h-20 rounded-full"
              />
            </div>
          </div>
          <div className="p-8 text-center">
            <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Responsive Design
            </h5>
            <p className="mb-4 font-medium text-gray-700 dark:text-gray-400">
              Ensure seamless user experience across all devices with our
              mobile-first responsive design approach.
            </p>
          </div>
        </div>

        {/* Security */}
        <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 h-96">
          <div className="flex justify-center items-center mt-8">
            <div className="w-24 h-24 bg-red-500 rounded-full flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-12 h-12 text-white"
              >
                <path d="M12 0c-3.866 0-7 3.134-7 7v2h-3v15h20v-15h-3v-2c0-3.866-3.134-7-7-7zm0 2c2.76 0 5 2.24 5 5v2h-10v-2c0-2.76 2.24-5 5-5zm6 8h2v13h-16v-13h2v1h12v-1zm-3 2h-6v2h6v-2zm-6 4h6v2h-6v-2z" />
              </svg>
            </div>
          </div>
          <div className="p-8 text-center">
            <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Security
            </h5>
            <p className="mb-4 font-medium text-gray-700 dark:text-gray-400">
              Safeguard user data with end-to-end encryption, ensuring privacy
              and protection for your chat application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;

