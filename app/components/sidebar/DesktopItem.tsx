import React from "react";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
    icon: any;
    label: string;
    href: string;
    active?: boolean;
    onClick?: () => void;
}
export default function DesktopItem({
    active,
    onClick,
    href,
    label,
    icon: Icon,
}: DesktopItemProps) {
    const handleClick = () => onClick && onClick();
    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx(
                    "group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black",
                    active && "bg-gray-100 text-black"
                )}
            >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}
