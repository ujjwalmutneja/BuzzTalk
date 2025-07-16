

// import { useState } from 'react';
// import { Dialog, DialogPanel } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import imageSrl from '../../assests/logobuzz.png';


// const navigation = [
//   { name: 'Home', href: '#home' },
//   { name: 'Join Us', href: '#cta' },
//   { name: 'Explore Services', href: '#services' },
//   { name: 'Know About Us', href: '#team' },
// ];

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="bg-black sticky top-0 z-50 shadow-md">
//       <header className="inset-x-0 top-0 z-50">
//         <nav
//           aria-label="Global"
//           className="flex items-center justify-between px-6 py-4 lg:px-8"
//         >
//           {/* Logo Section */}
//           <div className="flex lg:flex-1">
//             <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt="Buzz_Talk Logo"
//                 src= {imageSrl}
//                 className="h-8 w-auto"
//               />
//             </a>
//           </div>

//           {/* Hamburger Menu for Mobile */}
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//             </button>
//           </div>

//           {/* Desktop Navigation Links */}
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-sm font-semibold text-white hover:text-indigo-600"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>

//           {/* Log In Button */}
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             <a
//               href="#login"
//               className="text-sm font-semibold text-white hover:text-indigo-600"
//             >
//               Log in <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </nav>

//         {/* Mobile Menu (Dialog) */}
//         <Dialog
//           open={mobileMenuOpen}
//           onClose={setMobileMenuOpen}
//           className="lg:hidden"
//         >
//           <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
//           <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//             <div className="flex items-center justify-between">
//               <a href="#" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img
//                   alt="Logo"
//                   src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
//                   className="h-8 w-auto"
//                 />
//               </a>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="-m-2.5 rounded-md p-2.5 text-white"
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="mt-6 space-y-6">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="-m-2 block p-2 text-base font-semibold text-white hover:text-indigo-600"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>
//     </div>
//   );
// }






import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import imageSrl from '../../assests/logobuzz.png';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Join Us', href: '#cta' },
  { name: 'Explore Services', href: '#services' },
  { name: 'Know About Us', href: '#team' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black sticky top-0 z-50 shadow-md">
      <header className="inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between px-6 py-4 lg:px-8"
        >
          {/* Logo Section */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="Buzz_Talk Logo"
                src= {imageSrl}
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-white hover:text-indigo-600"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Log In Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
      to="/Hom"
    className="text-sm font-semibold text-white hover:text-indigo-600"
  >
    Log in <span aria-hidden="true">&rarr;</span>
  </Link>
          </div>
        </nav>

        {/* Mobile Menu (Dialog) */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Logo"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 space-y-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-m-2 block p-2 text-base font-semibold text-white hover:text-indigo-600"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
