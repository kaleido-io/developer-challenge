import { IdentificationIcon } from '@heroicons/react/outline'
import { CashIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React from 'react'
import { User } from '../API'
import OverviewCard from '../components/OverviewCard.tsx/OverviewCard'
import { OverviewCardInterface } from '../interfaces/overviewCardInterface'
import { mockTransactions } from '../mocks/mockTransactions'
import classNames from '../utils/classNames'
/**
 * Interface for transaction types
 */
interface transactionTypeInterface {
  Minted: string;
  Resell: string;
  'Initial Sale': string;
}
/**
 * Cards to show in dashboard
 */
const cards: OverviewCardInterface[] = [
  { amount: '26', changePct: '73.3%', changeType: 'up', href: '#', name: 'Sold Tokens', prevAmount: '15' },
  { amount: '4', changePct: '42.8%', changeType: 'down', href: '#', name: 'Resold Tokens', prevAmount: '7' },
  { amount: '$8,100', changePct: '138.2%', changeType: 'up', href: '#', name: 'Profit', prevAmount: '$3,400' }
]
/**
 * Map transaction type to class string
 */
const transactionTypeStyles: transactionTypeInterface = {
  'Minted': 'bg-green-100 text-green-800',
  'Resell': 'bg-yellow-100 text-yellow-800',
  'Initial Sale': 'bg-blue-100 text-blue-800',
}
/**
 * Dashboard page
 */
export default function Dashboard(props: { user: User }): JSX.Element {
  return (
    <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
      {/* Page header */}
      <div className="bg-faded shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Profile */}
              <div className="flex items-center">
                <img
                  className="hidden h-16 w-16 rounded-full sm:block"
                  src={props.user?.avatar}
                  alt="avatar"
                />
                <div>
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src={props.user?.avatar}
                      alt="avatar"
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      Hey, {props.user?.name}
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Description</dt>
                    <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                      <IdentificationIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {props.user?.description}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <a href="/collections">
                <button
                  type="button"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  My Collections
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Main section */}
      <div className="mt-8">
        {/* Last 30 day cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Last 30 Days</h2>
          <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
            {/* Card */}
            {cards.map((card) => (
              <OverviewCard key={card.name} card={card} />
            ))}
          </dl>
        </div>
        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Recent activity
        </h2>
        {/* Activity list (smallest breakpoint only) */}
        <div className="shadow sm:hidden">
          <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
            {mockTransactions.map((transaction) => (
              <li key={transaction.id}>
                <a href={transaction.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
                  <span className="flex items-center space-x-4">
                    <span className="flex-1 flex space-x-2 truncate">
                      <CashIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="flex flex-col text-gray-500 text-sm truncate">
                        <span className="truncate">{transaction.description}</span>
                        <span>
                          <span className="text-gray-900 font-medium">{transaction.sellValue}</span>
                        </span>
                        <time dateTime={transaction.datetime}>{transaction.date}</time>
                      </span>
                    </span>
                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {/* Nav for smallest breakpoint */}
          <nav
            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
            aria-label="Pagination"
          >
            <div className="flex-1 flex justify-between">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-faded hover:text-gray-500"
              >
                Previous
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-faded hover:text-gray-500"
              >
                Next
              </a>
            </div>
          </nav>
        </div>
        {/* Activity table (small breakpoint and up) */}
        <div className="hidden sm:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                        Transaction Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sell Value
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        From...To
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id} className="bg-white">
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <a href={transaction.href} className="group inline-flex space-x-2 truncate text-sm">
                              <CashIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <p className="text-gray-500 truncate group-hover:text-gray-900">{transaction.description}</p>
                            </a>
                          </div>
                        </td>
                        <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span
                            className={classNames(
                              transactionTypeStyles[transaction.type],
                              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                            )}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900">{transaction.sellValue}</span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className={transaction.profit.charAt(0) === '-' ? 'text-red-600' : 'text-green-600'}>{transaction.profit}</span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <span className="text-gray-900">{transaction.fromAddress}...{transaction.toAddress}</span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          <time dateTime={transaction.datetime}>{transaction.date}</time>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <nav
                  className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                      <span className="font-medium">20</span> transactions
                    </p>
                  </div>
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-faded hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-faded hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
