import React from 'react';
import { SocialIcon } from 'react-social-icons';
import { User } from '../API';
import { SocialInterface } from '../interfaces/socialInterface';
import getShortenedAddress from '../utils/getShortenedAddress';
/**
 * Supported social sign in platforms
 */
const socialSignIns: SocialInterface[] = [
  { color: "#E94475", name: "instagram", href: "https://instagram.com" },
  { color: "#2EBD59", name: "spotify", href: "https://spotify.com" },
  { color: "#00ACED", name: "twitter", href: "https://twitter.com" },
  { color: "#FF3333", name: "youtube", href: "https://youtube.com" },
]
/**
 * Settings page
 */
export default function Settings(props: { user: User }): JSX.Element {
  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            {/* Description list with inline editing */}
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                <p className="max-w-2xl text-sm text-gray-500">
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
              <div className="mt-6">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">{props.user?.name}</span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="bg-faded rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <dt className="text-sm font-medium text-gray-500">Photo</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={props.user?.avatar}
                          alt=""
                        />
                      </span>
                      <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                        <button
                          type="button"
                          className="bg-faded rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update
                        </button>
                        <span className="text-gray-300" aria-hidden="true">
                          |
                        </span>
                        <button
                          type="button"
                          className="bg-faded rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Remove
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <dt className="text-sm font-medium text-gray-500">ETH Address</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">{getShortenedAddress(props.user.ethAddress)}</span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="bg-faded rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">{props.user?.description}</span>
                      <span className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          className="bg-faded rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            {/* Third party social accounts */}
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Social Accounts</h3>
                <p className="max-w-2xl text-sm text-gray-500">
                  Authenticate with your social media accounts
                </p>
              </div>
              <div className="mt-6">
                <dl className="divide-y divide-gray-200">
                  {socialSignIns.map((item) => (
                    <div key={item.name} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500"> <SocialIcon network={item.name} style={{ height: 34, width: 34 }} /></dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">{item.href}</span>
                        <span className="ml-4 flex-shrink-0">
                          <button
                            type="button"
                            className="bg-faded rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            style={{ color: item.color }}
                          >
                            Sign-In
                          </button>
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}