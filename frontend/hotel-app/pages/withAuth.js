import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const currentPath = router.asPath;

        useEffect(() => {
            // Check user role here (you can get the user's role from your authentication state or API)
            const userRole = window.sessionStorage.getItem('role'); // Replace this with your actual logic to get the user's role
            const token = window.sessionStorage.getItem('token'); // Replace this with your actual logic to get the user's role

            if (!token) {
                router.push('/login'); // Redirect to the login page
            } else {
                if (userRole === "admin" && !currentPath.startsWith("/admin")) {
                    // Redirect to the login page or show an error message
                    router.push('/admin'); // Redirect to the login page
                } else if (userRole === "resepsionis" && !currentPath.startsWith("/resepsionis")) {
                    router.push('/resepsionis/orderlist'); // Redirect to the login page

                }else if (userRole === "customer" && !currentPath.startsWith("/customerPortal")) {
                    router.push('/customerPortal')
                }
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
