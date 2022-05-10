declare type RouteProps = {
    path: string;
    label: string;
    component: any;
};
export interface AppShellProps {
    label: string;
    routes: RouteProps[];
}
/**
 * Primary UI component for user interaction
 */
export declare const AppShell: ({ label, routes }: AppShellProps) => JSX.Element;
export {};
