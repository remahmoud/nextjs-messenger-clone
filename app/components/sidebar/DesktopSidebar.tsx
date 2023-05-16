"use client";

import { useState } from "react";
import DesktopItem from "./DesktopItem";
import useRoutes from "@/app/hooks/useRoutes";

export default function DesktopSidebar() {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r lg:bg-white lg:pb-4 xl:px-6">
            <nav className="mt-4 flex flex-col justify-between">
                <ul
                    role="list"
                    className="flex flex-col items-center space-y-1"
                >
                    {routes.map((item, idx) => (
                        <DesktopItem
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            key={idx}
                            onClick={item.onClick}
                            active={item.active}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
}
