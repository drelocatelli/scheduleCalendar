import React from "react";
import './index.css';

export default function Platform({children}: {children: React.ReactNode}) {
    return(
        <div className="platform">
            {children}
        </div>
    );
}