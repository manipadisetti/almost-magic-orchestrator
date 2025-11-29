// Badge component for Proprietary Technology and Patent Pending
import React from "react";

interface BadgeProps {
    label: string;
    color?: string; // optional Tailwind color class suffix, e.g., "purple"
}

export const Badge: React.FC<BadgeProps> = ({ label, color = "purple" }) => {
    const bgClass = `bg-${color}-100`;
    const textClass = `text-${color}-800`;
    return (
        <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${bgClass} ${textClass}`}>
            {label}
        </span>
    );
};
