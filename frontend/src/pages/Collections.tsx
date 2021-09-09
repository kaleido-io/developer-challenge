import { PlusIcon } from '@heroicons/react/solid';
import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { NFTCollection } from '../API';
import NewCollectionModal from '../components/NewCollectionModal';
import { listNFTCollections } from '../graphql/queries';

/**
 * NFT Collections page
 */
export default function Collections(): JSX.Element {
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [collections, setCollections] = useState([] as NFTCollection[])

  useEffect(() => {
    fetchCollections()
  }, [])

  /**
   * Fetch collections of user
   */
  async function fetchCollections() {
    try {
      const nftCollectionData: any = await API.graphql(graphqlOperation(listNFTCollections))
      const nftCollection: NFTCollection[] = nftCollectionData.data.listNFTCollections.items
      setCollections(nftCollection)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div >
      <div className="bg-faded shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Page Title */}
              <div className="flex items-center">
                <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  Your NFT Collections
                </h1>
              </div>
            </div>
            {/* CTA to trigger NFT collection modal */}
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                onClick={() => setShowCollectionForm(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create Collection
              </button>
              <NewCollectionModal show={showCollectionForm} close={() => setShowCollectionForm(false)} />
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <ul role="list" className="pt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {collections.map((c) => (
              <li
                key={c.name}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="flex-1 flex flex-col p-8">
                  <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={c.imageUrl} alt={c.name} />
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">{c.name}</h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Description</dt>
                    <dd className="text-gray-500 text-sm">{c.description}</dd>
                    <dt className="sr-only">Number Sold</dt>
                    <dd className="mt-3">
                      {c.isMinted ?
                        <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                          {c.totalSold} of {c.totalTokens} Sold
                        </span> :
                        <span className="px-2 py-1 text-red-800 text-xs font-medium bg-red-100 rounded-full">
                          Not Minted
                        </span>
                      }
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <a
                        href={'/collections/' + c.id}
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <span className="ml-3">View Collection</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
