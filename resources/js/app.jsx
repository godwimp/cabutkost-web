import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ShippingProvider } from "@/contexts/ShippingContext";
import { StorageProvider } from "@/contexts/StorageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import GuestLayout from "@/layouts/GuestLayout";
import MainLayout from "@/layouts/MainLayout";
import ErrorBoundary from "@/Components/ErrorBoundary";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { formatPageTitle } from "./utils/titleFormatter";
import { updateFavicon } from "./utils/favicon";
import { APP_NAME, APP_LOGO } from "./config/app";

createInertiaApp({
    title: (title) => formatPageTitle(title, APP_NAME),
    resolve: async (name) => {
        try {
            const pages = import.meta.glob("./Pages/**/*.jsx");
            const page = await resolvePageComponent(
                `./Pages/${name}.jsx`,
                pages
            );

            if (!page.default.layout) {
                if (name.startsWith("admin/")) {
                    page.default.layout = (page) => <AdminLayout>{page}</AdminLayout>;
                } else if (name.startsWith("Auth/")) {
                    page.default.layout = (page) => <GuestLayout>{page}</GuestLayout>;
                } else {
                    page.default.layout = (page) => <MainLayout>{page}</MainLayout>;
                }
            }

            return page;
        } catch (error) {
            console.error('Page resolution error:', error);
            // Return the NoPage component for 404 errors
            return import('./Pages/NoPage.jsx');
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ErrorBoundary>
                <AuthProvider>
                    <ShippingProvider>
                        <StorageProvider>
                            <App {...props} />
                        </StorageProvider>
                    </ShippingProvider>
                </AuthProvider>
            </ErrorBoundary>
        );
    },
    progress: {
        color: "#4B5563",
    },
}).then(() => {
    updateFavicon(APP_LOGO);
}).catch(error => {
    console.error('Inertia setup error:', error);
});