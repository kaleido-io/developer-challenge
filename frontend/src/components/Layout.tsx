import Navigation from './Navigation';
function Layout({ children }: { children: any }) {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
}

export default Layout;
