import { Dialog, Transition } from '@headlessui/react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
/**
 * New collection modal component
 * @param props track open/close state of modal
 */
export default function NewCollectionModal(props: { close: () => any, show: boolean }): JSX.Element {
    const [assetLink, setAssetLink] = React.useState("")
    const [formState, setFormState] = React.useState({})

    /**
     * Change state of form when an input is changed
     * @param event input event triggered onChange
     */
    const handleInputChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    }
    /**
     * On form submit, create NFT collection and close modal
     * @param e event triggered onSubmit
     */
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        // TODO - Request to create new NFT collection with form values
        props.close
    }

    return (
        <Transition.Root show={props.show} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.close}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-faded rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <form className="space-y-8 divide-y divide-gray-200">
                                <div className="space-y-8 divide-y divide-gray-200">
                                    <div>
                                        {/* Title */}
                                        <div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">New NFT Collection</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Create a new collection of NFTs to mint and sell to your fans
                                            </p>
                                        </div>
                                        {/* Name */}
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-4">
                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                    Collection Name
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        name="collectionName"
                                                        id="collectionName"
                                                        autoComplete="collectionName"
                                                        defaultValue={''}
                                                        className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                                                    />
                                                </div>
                                            </div>
                                            {/* Description */}
                                            <div className="sm:col-span-6">
                                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                    Description
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="collectionDescription"
                                                        name="collectionDescription"
                                                        rows={2}
                                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                        defaultValue={''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            {/* Number of tokens in collection */}
                                            <div className="sm:col-span-4">
                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                    # Tokens in Collection
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={handleInputChange}
                                                        type="number"
                                                        name="collectionTotalTokens"
                                                        id="totalAvailable"
                                                        defaultValue={''}
                                                        autoComplete="totalAvailable"
                                                        className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                                                    />
                                                </div>
                                            </div>
                                            {/* Link to NFT asset */}
                                            <div className="sm:col-span-6">
                                                <label htmlFor="assetLink" className="block text-sm font-medium text-gray-700">
                                                    Link to NFT Asset
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                        <input
                                                            type="url"
                                                            name="collectionAssetLink"
                                                            id="collectionAssetLink"
                                                            defaultValue={''}
                                                            className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                                                            placeholder="https://link-to-asset.com"
                                                            onChange={(event) => {
                                                                handleInputChange(event)
                                                                setAssetLink(event.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                    {/* Test asset link */}
                                                    <a href={assetLink} rel="noreferrer" target="_blank">
                                                        <button
                                                            type="button"
                                                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-faded hover:bg-faded-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                                        >
                                                            <ExternalLinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                            <span>Test</span>
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Cancel/Submit form */}
                                <div className="pt-5">
                                    <div className="flex justify-end">
                                        <button
                                            onClick={props.close}
                                            type="button"
                                            className="bg-faded py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
