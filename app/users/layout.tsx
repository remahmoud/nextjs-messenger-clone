import React, { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default async function Userslayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        // @ts-expect-error
        <Sidebar>
            <div className="h-full">{children}</div>
        </Sidebar>
    );
}
