import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MenuAlt1Icon, SearchIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { User } from '../API';
import { navigation } from '../components/Navigation';
import { actionCreators, State } from '../state';
import { getShortenedAddress } from '../utils/getShortenedAddress';

export const Header = (): JSX.Element => {
    const user: User = useSelector((state: State) => state.user)
    const dispatch = useDispatch();
    const { openSidebar } = bindActionCreators(actionCreators, dispatch)

    return (
        <>
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-faded border-b border-gray-200 lg:border-none">
                <button
                    type="button"
                    className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
                    onClick={() => openSidebar()}
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
                                        {navigation.filter(n => n.secondaryNav).map(nav => (
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
        </>
    )
}