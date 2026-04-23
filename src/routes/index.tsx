import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import ExpensesYear from '../features/expensesYear/ExpensesYear';

export const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: ExpensesYear,
});