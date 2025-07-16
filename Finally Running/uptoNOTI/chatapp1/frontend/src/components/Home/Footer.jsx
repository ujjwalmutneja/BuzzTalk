const links = [
  { name: 'About Us', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Contact Support', href: '#' },
];
const stats = [
  { name: 'Active Users Worldwide', value: '1M+' },
  { name: 'Messages Sent Daily', value: '10M+' },
  { name: 'Languages Supported', value: '50+' },
  { name: 'Community Groups', value: '5K+' },
];

export default function BuzzTalkFooter() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-20">
      <img
        alt="Background"
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Connect Beyond Limits
          </h2>
          <p className="mt-6 text-base font-medium text-gray-300">
            BuzzTalk is all about bringing people together, no matter where they are. Join the conversation today and be part of the buzz!
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-gray-300">{stat.name}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>© 2024 BuzzTalk. All rights reserved. Powered by connection and innovation.</p>
          <p className="mt-4 text-sm italic text-gray-300">
            "A conversation is like a tennis match—keep the ball rolling and never let it drop!" 🎾
          </p>
        </div>
      </div>
    </div>
  );
}