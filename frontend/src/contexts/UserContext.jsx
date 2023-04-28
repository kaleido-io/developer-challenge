import React, { useState, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { USERS } from '../users';

export const UserContext = createContext();

const StyledStatusContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 8px 32px;
    width: 100%;
    font-weight: light;
`;

function StatusBar({ name, role, walletAddress }) {
    return (
        <StyledStatusContainer>
            <div>{name}</div>
            <div>{role}</div>
            <div>{walletAddress}</div>
        </StyledStatusContainer>
    );
}

StatusBar.propTypes = {
    name: PropTypes.string,
    role: PropTypes.string,
    walletAddress: PropTypes.string
};

const WhoAreYouContainer = styled.div`
    padding: 48px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
`;

export function WhoAreYou({ children }) {
    // const [user, setUser] = useState(USERS[2]);
    const [user, setUser] = useState();
    const value = useMemo(() => ({ user }), [user]);

    if (!user) {
        return (
            <WhoAreYouContainer>
                <div>Who are you?</div>
                <div>
                    {USERS.filter((userObject) => !!userObject.role).map((userObject) => (
                        <button
                            type="button"
                            key={`user-${userObject.walletAddress}`}
                            onClick={() => {
                                setUser(userObject);
                            }}
                        >
                            {userObject.name} ({userObject.role})
                        </button>
                    ))}
                </div>
            </WhoAreYouContainer>
        );
    }

    return (
        <UserContext.Provider value={value}>
            <StatusBar {...user} />
            {children}
        </UserContext.Provider>
    );
}
