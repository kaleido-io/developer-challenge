import React from 'react'
/**
 * Privacy page
 */
export default function Privacy(): JSX.Element {
  return (
    <div className="relative py-16 bg-faded overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Privacy
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your Privacy Matters
            </span>
          </h1>
        </div>
        {/* Body */}
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices id nulla sed vehicula. Suspendisse sed ultricies dui. Sed posuere egestas ligula, non luctus quam dapibus et. Proin pulvinar condimentum facilisis. Morbi ut nunc molestie, tincidunt mauris id, sollicitudin arcu. Donec vitae augue eget nulla lacinia mattis. Phasellus tempus magna vel semper sollicitudin. In sed odio rutrum ipsum dictum consectetur. Nunc turpis quam, aliquam non eleifend et, molestie eu augue. Quisque sagittis ipsum vitae nibh mollis, ac volutpat ipsum sagittis. Integer in tempor nunc. Proin ac nunc sagittis, efficitur enim eget, volutpat erat. Proin vehicula tellus sit amet dictum vehicula. Vivamus ultricies purus ut turpis posuere, sit amet rutrum erat consequat.
          </p>
          <p>
            Phasellus sodales iaculis elit, eu dictum elit mattis ac. Curabitur in velit eget ex accumsan pretium vitae vel lacus. Nullam nisl augue, placerat sed vestibulum non, malesuada id diam. Ut tempus ante eget dui interdum pulvinar. Suspendisse potenti. Mauris id convallis ante. Sed justo sem, consequat ut sagittis ut, consequat nec ante. Suspendisse sed mi et mauris tempus auctor. Suspendisse cursus quis ex at gravida. Sed facilisis sem non egestas rutrum. Phasellus pretium elit pellentesque interdum varius. Suspendisse at consectetur orci. Vestibulum maximus commodo sapien eget mollis.
          </p>
          <p>
            Nunc ut sagittis nisi. Mauris sit amet blandit orci. Phasellus viverra enim ac efficitur interdum. Phasellus bibendum tristique pharetra. Suspendisse at eleifend urna. Etiam bibendum enim tincidunt lacus mollis, eu volutpat tortor mattis. Proin at urna pellentesque, faucibus nunc vel, interdum sem. Quisque viverra ornare accumsan. Pellentesque ac finibus metus. Donec at tristique sapien. Fusce rhoncus turpis id nunc laoreet blandit a vel metus. Donec eu purus semper, luctus ex vitae, vehicula nisi. Proin egestas pellentesque neque, eu tempor neque iaculis eget.
          </p>urpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
        </div>
      </div>
    </div>
  )
}
