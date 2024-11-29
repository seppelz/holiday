import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Intelligente Brückentage',
    description: 'Maximiere deinen Urlaub durch optimale Nutzung von Brückentagen und Feiertagen.',
    icon: CalendarIcon,
  },
  {
    name: 'Verkehrsprognose',
    description: 'Vermeide Staus und plane deine Reise mit unserer Verkehrsvorhersage.',
    icon: MapIcon,
  },
  {
    name: 'Flexible Planung',
    description: 'Plane deinen Urlaub mit festen oder flexiblen Daten - ganz wie es dir passt.',
    icon: ClockIcon,
  },
];

export default function HomePage() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Urlaubsplanung leicht gemacht
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Optimiere deine Urlaubstage mit unserem intelligenten Planungstool. 
            Finde die besten Brückentage und vermeide Verkehrsspitzen.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/planner"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Jetzt planen
            </Link>
            <Link to="/calendar" className="text-sm font-semibold leading-6 text-gray-900">
              Kalender ansehen <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Smarte Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Alles was du für die perfekte Urlaubsplanung brauchst
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 