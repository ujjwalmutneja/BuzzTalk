


import React, { useRef } from 'react'; // Import useRef hook
import imageSrc from '../../assests/pngegg.png'
import {Link} from 'react-router-dom';

export default function HomePage() {
  // Create a reference to the header section
  const headerRef = useRef(null);

  return (
    <div id="home" className="relative isolate px-6 pt-20 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Content Section */}
      <div
        ref={headerRef}
        className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-56 flex flex-col-reverse lg:flex-row items-center justify-between"
      >
        {/* Text Content */}
        <div className="text-left lg:w-1/2 lg:pr-16">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Connect and Collaborate with Buzz Talk
          </h1>
          <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
            Experience seamless communication with Buzz Talk, your all-in-one messaging platform. Share ideas, collaborate instantly, and stay connected with your team, no matter where you are.
          </p>
          <div className="mt-10 flex items-center justify-start gap-x-6">
            <Link  to="/Hom"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Started
            </Link>
            <a href="#services" className="text-sm font-semibold text-gray-900">
              Learn More <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
          <img
            className="w-full max-w-4xl rounded-lg"
            src={imageSrc}
            alt="Buzz Talk App Screenshot"
          />
        </div>
      </div>
    </div>
  );
 }
