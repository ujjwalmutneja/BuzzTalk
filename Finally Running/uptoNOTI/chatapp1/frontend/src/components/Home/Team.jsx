import imageSr from '../../assests/me.jpg'
import imagesa from '../../assests/vaibhav.jpg'
const people = [
  {
    name: 'Ujjwal Mutneja',
    role: 'Developer',
    imageUrl:
      imageSr,
  },
  {
    name: 'Vansh Thakur',
    role: 'Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Vaibhav Tiwari',
    role: 'Developer',
    imageUrl:
     imagesa,
  },
  // More people...
];

export default function Example() {
  return (
    <div  id="team" className="bg-white py-20 sm:py-32 mb-20"> {/* Increased padding */}
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-pretty text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"> {/* Increased font size */}
            Meet Our Developers
          </h2>
          <p className="mt-8 text-xl text-gray-600"> {/* Increased font size */}
            "A developer’s mind is like a puzzle—every problem is a new challenge to solve, and the code is the key!" 💻
          </p>
        </div>
        <ul role="list" className="grid gap-x-10 gap-y-16 sm:grid-cols-2 sm:gap-y-20 xl:col-span-2"> {/* Adjusted gaps */}
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-8"> {/* Increased gap */}
                <img alt="" src={person.imageUrl} className="h-24 w-24 rounded-full" /> {/* Increased image size */}
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-gray-900"> {/* Increased font size */}
                    {person.name}
                  </h3>
                  <p className="text-base font-semibold text-indigo-600"> {/* Increased font size */}
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
