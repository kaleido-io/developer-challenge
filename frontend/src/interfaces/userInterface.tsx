/**
 * Interface for an individual user
 */
export interface UserInterface {
    avatar: string;
    description: string;
    email: string;
    name: string;
    socials: {
        instagram: string;
        spotify: string;
        twitter: string;
        youtube: string;
    };
}