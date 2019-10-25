import * as React from "react";

export interface IIcon {
    height: string;
    width: string;
    fill: string;
};

export const Profile: React.FC<IIcon> = ({ height, width, fill }) => {
    return (
        <svg style={{ height: height, width: width }} viewBox="0 0 30 50" strokeOpacity="null" strokeWidth="0">
            <circle cx="15" cy="12.6" r="12.5" fill={fill} />
            <path d="M30,30.5c0,-4.139 -3.361,-7.5 -7.5,-7.5l-15,0c-4.139,0 -7.5,3.361 -7.5,7.5l0,19c0,4.139 3.361,7.5 7.5,7.5l15,0c4.139,0 7.5,-3.361 7.5,-7.5l0,-19Z" fill={fill} />
        </svg>
    );
}