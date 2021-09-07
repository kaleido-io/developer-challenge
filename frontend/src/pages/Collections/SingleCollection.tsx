import React, { useState } from 'react'
import { useParams } from 'react-router'
import { NFTCollectionInterface } from '../../interfaces/nftCollectionInterface'
import { mockCollections } from '../../mocks/mockCollections'
import { mockSingleNftTransactions } from '../../mocks/mockSingleNftTransactions'
import classNames from '../../utils/classNames'
/**
 * Single collection page
 */
export default function SingleCollection(): JSX.Element {
  const { id }: { id: string } = useParams()
  const [selectedNFT, setSelectedNFT] = useState(1);
  /** NFT collection from param ID */
  const collection: NFTCollectionInterface | undefined = mockCollections.find(c => c._id === id)

  return (
    <div className="relative h-screen bg-faded flex overflow-hidden">
      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:border-t lg:border-gray-200">
        {/* Main content */}
        <div className="flex-1 flex items-stretch overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mt-3 sm:mt-2">
                <div className="hidden sm:block">
                  <div className="flex items-center border-b border-gray-200">
                    <h1 className="flex-1 text-2xl font-bold text-gray-900">{collection?.name}</h1>
                  </div>
                </div>
              </div>
              {/* Gallery */}
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                >
                  {(Array.from(new Array(Number(collection?.totalTokens)))).map((_, idx) => (
                    <li key={idx + 1} className="relative">
                      <div
                        onClick={() => setSelectedNFT(idx + 1)}
                        className={classNames(
                          selectedNFT === (idx + 1)
                            ? 'ring-2 ring-offset-2 ring-primary-500'
                            : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-primary-500',
                          'cursor-pointer group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                        )}
                      >
                        <img
                          src={collection?.imageUrl}
                          alt={collection?.name}
                          className={classNames(
                            selectedNFT === (idx + 1) ? '' : 'group-hover:opacity-75',
                            'object-cover pointer-events-none'
                          )}
                        />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                          <span className="sr-only">View details for {idx + 1}/{collection?.totalTokens}</span>
                        </button>
                      </div>
                      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                        {idx + 1}/{collection?.totalTokens}
                      </p>
                      <p className="block text-sm font-medium text-gray-500 pointer-events-none">2 ETH</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </main>
          {/* Details sidebar */}
          <aside className="hidden w-96 bg-faded p-8 border-l border-gray-200 overflow-y-auto lg:block">
            <div className="pb-16 space-y-6">
              <div>
                <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                  <img src={collection?.imageUrl} alt="" className="object-cover" />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      <span className="sr-only">Details for </span>
                      {selectedNFT}/{collection?.totalTokens}
                    </h2>
                  </div>
                  <p className="text-sm font-medium text-gray-500">2 ETH</p>
                </div>
              </div>
              <div>
                {/* Transaction history */}
                <h3 className="font-medium text-gray-900 pb-2">History</h3>
                <div className="flow-root">
                  <ul role="list" className="-mb-8">
                    {mockSingleNftTransactions.map((event, eventIdx) => (
                      <li key={event._id}>
                        <div className="relative pb-8">
                          {eventIdx !== mockSingleNftTransactions.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-faded" aria-hidden="true" />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={classNames(
                                  event.iconBackground,
                                  'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-faded'
                                )}
                              >
                                <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {event.content}{' '}
                                </p>
                                <p className="font-medium text-gray-900">
                                  {event.target}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time dateTime={event.datetime}>{event.date}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}