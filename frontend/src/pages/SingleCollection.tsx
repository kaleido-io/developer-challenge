import { CheckCircleIcon } from '@heroicons/react/outline'
import { API, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NFTCollection, NFTToken } from '../API'
import { getNFTCollection, tokensByCollection } from '../graphql/queries'
import classNames from '../utils/classNames'

/**
 * Single collection page
 */
export default function SingleCollection(): JSX.Element {
  const { id }: { id: string } = useParams()
  const [selectedNFT, setSelectedNFT] = useState({} as NFTToken);
  const [collection, setCollection] = useState({} as NFTCollection)
  const [tokensInCollection, setTokensInCollection] = useState([] as NFTToken[])

  useEffect(() => {
    fetchNFTCollection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Fetch collection by param id
   */
  async function fetchNFTCollection() {
    try {
      // Set NFT collections of page
      const nftCollectionData: any = await API.graphql(graphqlOperation(getNFTCollection, { id }))
      const nftCollection: NFTCollection = nftCollectionData.data.getNFTCollection
      setCollection(nftCollection)
      // Get tokens iin collection
      const tokensByCollectionData: any = await API.graphql(graphqlOperation(tokensByCollection, { nftCollectionID: id }))
      const tokensByCollectionItems: NFTToken[] = tokensByCollectionData.data.tokensByCollection.items
      setTokensInCollection(tokensByCollectionItems.sort((a, b) => { return Number(a.name) - Number(b.name) }))
      // Set selected token to first index of collection
      setSelectedNFT(tokensInCollection[0])
    } catch (err) {
      console.log(err)
    }
  }

  if (collection === ({} as NFTCollection) || selectedNFT === ({} as NFTToken)) {
    return (<div></div>)
  }

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
                    {/* TODO - This button will mint the NFTs in Kaleido */}
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                      Mint Collection
                    </button>
                  </div>
                </div>
              </div>
              {/* Gallery */}
              <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                <ul
                  role="list"
                  className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                >
                  {tokensInCollection.map(tkn => (
                    <li key={tkn.name} className="relative">
                      <div
                        onClick={() => setSelectedNFT(tkn)}
                        className={classNames(
                          selectedNFT?.id === tkn.id
                            ? 'ring-2 ring-offset-2 ring-primary-500'
                            : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-primary-500',
                          'cursor-pointer group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                        )}
                      >
                        <img
                          src={collection?.imageUrl}
                          alt={tkn.name}
                          className={classNames(
                            selectedNFT?.id === tkn.id ? '' : 'group-hover:opacity-75',
                            'object-cover pointer-events-none'
                          )}
                        />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                          <span className="sr-only">View details for {tkn.name}/{collection?.totalTokens}</span>
                        </button>
                      </div>
                      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                        {tkn.name}/{collection?.totalTokens}
                      </p>
                      <p className="block text-sm font-medium text-gray-500 pointer-events-none">{tkn?.lastPrice}</p>
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
                      {selectedNFT?.name}/{collection?.totalTokens}
                    </h2>
                  </div>
                  <p className="text-sm font-medium text-gray-500">{selectedNFT?.lastPrice}</p>
                </div>
              </div>
              <div>
                {/* Transaction history */}
                <h3 className="font-medium text-gray-900 pb-2">History</h3>
                <div className="flow-root">
                  <ul role="list" className="-mb-8">
                    {selectedNFT?.history?.items ? selectedNFT?.history?.items.map((event) => (
                      <li key={event?.id}>
                        <div className="relative pb-8">
                          {/* TODO - Handle icons */}
                          {/* {eventIdx !== mockSingleNftTransactions.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-faded" aria-hidden="true" />
                          ) : null} */}
                          <div className="relative flex space-x-3">
                            <div>
                              {/* TODO - Handle icons */}
                              {/* <span
                                className={classNames(
                                  event?.iconBackground,
                                  'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-faded'
                                )}
                              >
                                <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                              </span> */}
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {event?.from}{' '}
                                </p>
                                to
                                <p className="font-medium text-gray-900">
                                  {event?.to}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time>{event?.date}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )) : <div>No Price History</div>}
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