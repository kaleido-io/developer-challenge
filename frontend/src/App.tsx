import './App.css';
import Layout from './components/Layout';
import GamesTable from './components/GamesTable';
import { useState, useEffect } from 'react';

function App() {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function login() {
            try {
                const res = await fetch('/api/login');
                if (!res.ok) {
                    throw new Error('Failed to login');
                }
                const loginData = await res.json();
                setUser(loginData);
            } catch (error) {
                console.error('Error logging in: ', error);
            }
        }

        login();
    }, []);

    return (
        <div className="App">
            <Layout>
                <div className={'h-full w-10/12 m-2.5 bg-lime-900'}>
                    <GamesTable user={user} />
                </div>
            </Layout>
        </div>
    );
}

export default App;
