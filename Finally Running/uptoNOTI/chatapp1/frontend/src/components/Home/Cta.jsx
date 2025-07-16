

export default function Cta() {
  return (
    <div
      id="cta"
      className="bg-gray-50 pt-24" // Add padding to ensure the content doesn't overlap with the navbar
    >
      {/* Section Heading */}
      <div className="text-center py-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Ready to Take the Next Step
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Revolutionizing team communication and collaboration.
        </p>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl py-16 sm:px-6 sm:py-0 lg:px-8 lg:pt-16">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          {/* Background Gradient */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Text Content */}
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Supercharge Your Workflow with BuzzTalk
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Chat is just the beginning. Unlock the full potential of your team
              with tools that improve communication, streamline processes, and
              boost productivity. Your team’s success starts with the right
              conversations.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="text-sm font-semibold text-white hover:underline"
              >
                Explore Features <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="Chat app screenshot"
              src="https://ik.imagekit.io/ably/ghost/prod/2023/02/the-ultimate-live-chat-features-list.png?tr=w-1728,q-50"
              width={1500}
              height={900}
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

