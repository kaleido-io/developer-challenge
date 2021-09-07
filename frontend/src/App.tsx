import { Dialog, Menu, Transition } from '@headlessui/react';
import { CogIcon, CollectionIcon, HomeIcon, LogoutIcon, MenuAlt1Icon, QuestionMarkCircleIcon, ShieldCheckIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';
import { API, graphqlOperation } from 'aws-amplify';
import React, { Fragment, SVGProps, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { getUser } from './graphql/queries';
import { UserInterface } from './interfaces/userInterface';
import Collections from './pages/Collections/Collections';
import SingleCollection from './pages/Collections/SingleCollection';
import Dashboard from './pages/Dashboard/Dashboard';
import Help from './pages/Help/Help';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Privacy from './pages/Privacy/Privacy';
import Settings from './pages/Settings/Settings';
import classNames from './utils/classNames';
import getShortenedAddress from './utils/getShortenedAddress';

/**
 * Interface for navigation link
 */
interface NavigationInterface {
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
}
/**
 * Main app component
 */
function App(): JSX.Element {
  const [currentNav, setCurrentNav] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState({} as UserInterface)

  // TODO: Navigation panel should depress correctly
  const navigation: NavigationInterface[] = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'NFT Collections', href: '/collections', icon: CollectionIcon },
    { name: 'Settings', href: '/settings', icon: CogIcon },
    { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
    { name: 'Privacy', href: '/privacy', icon: ShieldCheckIcon },
  ]

  // TODO: Navigation panel should depress correctly
  const headerNavigation: NavigationInterface[] = [
    { name: 'Account Settings', href: '/settings', icon: CogIcon },
    { name: 'Logout', href: '/logout', icon: LogoutIcon }
  ]

  useEffect(() => {
    fetchUser('38679115-7c2f-487c-aae9-2a1614b85938')
  }, [])

  /**
   * Fetch user from dynamo db
   * @param id id of user to fetch
   */
  async function fetchUser(id: string) {
    try {
      const userData: any = await API.graphql(graphqlOperation(getUser, { id }))
      const user: UserInterface = userData.data.getUser
      console.log(user)
      setUser(user)
    } catch (err) {
      console.log(err)
    }
  }

  // TODO: Implement Authentication
  if (false) {
    return <Login />
  }

  if (!user) {
    return (<div></div>)
  }

  return (
    <div className="relative h-screen flex overflow-hidden bg-faded">
      {/* Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {/* Close sidebar button */}
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="/instock.png"
                  alt="Instock logo"
                />
              </div>
              <nav className="mt-5 flex-shrink-0 h-full divide-y divide-primary-800 overflow-y-auto" aria-label="Sidebar">
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      onClick={() => setCurrentNav(item.name)}
                      href={item.href}
                      className={classNames(
                        currentNav === item.name ? 'bg-primary-800 text-white' : 'text-primary-100 hover:text-white hover:bg-primary-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      aria-current={currentNav === item.name ? 'page' : undefined}
                    >
                      <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-primary-200" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component */}
          <div className="flex flex-col flex-grow bg-primary-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/instock.png"
                alt="Instock logo"
              />
            </div>
            <nav className="mt-5 flex-1 flex flex-col divide-y divide-primary-800 overflow-y-auto" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => setCurrentNav(item.name)}
                    href={item.href}
                    className={classNames(
                      currentNav === item.name ? 'bg-primary-800 text-white' : 'text-primary-100 hover:text-white hover:bg-primary-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={currentNav === item.name ? 'page' : undefined}
                  >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-primary-200" aria-hidden="true" />
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Main section */}
      <div className="flex-1 overflow-auto focus:outline-none">
        {/* Top header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-faded border-b border-gray-200 lg:border-none">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* Search bar */}
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    name="search-field"
                    className="bg-faded block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search transactions"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-faded rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt="avatar"
                    />
                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                      <span className="sr-only">Open user menu for </span>{user.name}
                    </span>
                    <ChevronDownIcon
                      className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-faded ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                      <p className="text-sm">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{getShortenedAddress(user.ethAddress)}</p>
                    </div>
                    <div className="py-1">
                      {headerNavigation.map(nav => (
                        <Menu.Item key={nav.name}>
                          <a
                            href={nav.href}
                            className='group flex items-center px-4 py-2 text-sm text-gray-700'
                          >
                            <nav.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                            {nav.name}
                          </a>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/dashboard"]}>
              <Dashboard user={user} />
            </Route>
            <Route path="/collections/:id">
              <SingleCollection />
            </Route>
            <Route path="/collections">
              <Collections />
            </Route>
            <Route path="/settings">
              <Settings user={user} />
            </Route>
            <Route path="/help">
              <Help />
            </Route>
            <Route path="/privacy">
              <Privacy />
            </Route>
            <Route path="/404" />
            <PageNotFound />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </div>
    </div >
  );
}

export default App;
