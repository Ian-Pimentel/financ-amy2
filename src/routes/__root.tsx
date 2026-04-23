import ModalProvider from "@/shared/components/ModalContext";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const rootRoute = createRootRoute({
    component: () => (
        <>
            <ModalProvider>
                <Outlet />
            </ModalProvider>

            <TanStackRouterDevtools initialIsOpen={false} />
        </>
    ),
});