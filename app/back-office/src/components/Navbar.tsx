import OurLogoWithoutRect from "@/assets/logo";
import React from "react";

const Header = () => {
  const [showSubmenu, setShowSubmenu] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);

  return (
    <header className="z-40 py-4  bg-gray-800 flex justify-between items-center">
      <div className="flex justify-center">
        <a href="/dashboard">
          <div className="flex items-center mx-5">
            <OurLogoWithoutRect width="80" height="80" />
            <div className="flex items-center mx-5">
              <p className="text-2xl text-green-500 font-semibold">WEB</p>
              <p className="ml-2 font-semibold italic text-white">ANALYTICS</p>
            </div>
          </div>
        </a>
      </div>
      <div className="flex items-center justify-between h-8 px-6">
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="p-2 bg-white text-green-400 align-middle rounded-full hover:text-white hover:bg-green-400 focus:outline-none "
              aria-label="Notifications"
              aria-haspopup="true"
              onClick={() => {
                setShowNotification(!showNotification), setShowSubmenu(false);
              }}
            >
              <div className="flex items-cemter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </button>
            <div>
              {showNotification && (
                <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-green-400 border border-green-500 rounded-md shadow-md">
                  <li className="flex">
                    <a
                      className="text-white inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                      href="/tags"
                    >
                      <span>Créé un tags</span>
                    </a>
                  </li>
                  <li className="flex">
                    <a
                      className="text-white inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                      href="/tunnels"
                    >
                      <span>Créé un tunnel</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </li>

          <li className="relative">
            <button
              className="p-2 bg-white text-green-400 align-middle rounded-full hover:text-white hover:bg-green-400 focus:outline-none "
              aria-label="Account"
              aria-haspopup="true"
              onClick={() => {
                setShowSubmenu(!showSubmenu), setShowNotification(false);
              }}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </button>
            <div>
              {showSubmenu && (
                <ul
                  className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-green-400 border border-green-500 rounded-md shadow-md block"
                  aria-label="submenu"
                >
                  <li className="flex">
                    <a
                      className=" text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                      href="/profile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Profil</span>
                    </a>
                  </li>
                  <li className="flex">
                    <a
                      className="text-white inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                      href="/logout"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Se déconnecter</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
