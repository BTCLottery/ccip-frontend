// MenuOpenButton.tsx
import { MouseEvent, ReactElement } from 'react';
import useGlobalState from '@/store/globalState';

export default function MenuOpenButton(): ReactElement {
  const [, setSideNavMenuOpen] = useGlobalState('sideNavMenuOpen');

  const handleButtonClick = (event: MouseEvent) => {
    event.stopPropagation(); // Prevent this event from bubbling up
    setSideNavMenuOpen(prev => !prev);
  };

  return (
    <button
      id="menu-toggle-button"
      type="button"
      className="sm:mr-1 inline-flex items-center p-2 text-sm text-white rounded-lg hover:bg-coolPurple focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-coolPurple dark:focus:ring-coolPurple"
      aria-expanded="false"
      aria-controls="navbar-cta"
      data-collapse-toggle="navbar-cta"
      onClick={handleButtonClick}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}
