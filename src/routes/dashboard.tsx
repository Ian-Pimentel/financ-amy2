import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
});

function Dashboard() {

    return (
        <div className="p-2">Hello from Dashboard!</div>
    );
}