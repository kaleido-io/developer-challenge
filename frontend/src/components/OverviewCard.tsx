import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';
import React from 'react';
import { OverviewCardInterface } from '../interfaces/overviewCardInterface';
import classNames from '../utils/classNames';
/**
 * Overview card component
 * @param props details for card
 */
export default function OverviewCard(props: { card: OverviewCardInterface }): JSX.Element {
    return (
        <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{props.card.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {props.card.amount}
                    <span className="ml-2 text-sm font-medium text-gray-500">from {props.card.prevAmount}</span>
                </div>
                <div
                    className={classNames(
                        props.card.changeType === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                        'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0'
                    )}
                >
                    {props.card.changeType === 'up' ? (
                        <ArrowSmUpIcon
                            className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                            aria-hidden="true"
                        />
                    ) : (
                        <ArrowSmDownIcon
                            className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                            aria-hidden="true"
                        />
                    )}
                    <span className="sr-only">{props.card.changeType === 'up' ? 'Increased' : 'Decreased'} by</span>
                    {props.card.changePct}
                </div>
            </dd>
        </div>
    )
}
