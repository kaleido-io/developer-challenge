/**
 * Interface for overview card details
 */
export interface OverviewCardInterface {
    amount: string;
    changePct: string;
    changeType: 'up' | 'down';
    href: string;
    name: string;
    prevAmount: string;
}