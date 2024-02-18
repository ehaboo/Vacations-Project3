import { useState } from "react";
import "./UserMenu.css";




interface UserMenuProps {
    onFilter: (filters: {
        isVacationsArr: boolean;
        isLikedVacations: boolean;
        isComingVacations: boolean;
        isCurrentVacations: boolean;
    }) => void;
}

function UserMenu({onFilter }: UserMenuProps): JSX.Element {

    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index: number) => {
        setActiveIndex(index === activeIndex ? activeIndex : index);

        const filters = {
            isVacationsArr: index === 0,
            isLikedVacations: index === 1,
            isComingVacations: index === 2,
            isCurrentVacations: index === 3,
        };

        onFilter(filters)


    };


    return (
        <div className="UserMenu">
            <div className="dropdown">
                <input type="checkbox" id="dropdown" />

                <label className="dropdownFace" htmlFor="dropdown">
                    <div className="dropdownText">Filter By</div>

                    <div className="dropdownArrow pointer"></div>
                </label>

                <ul className="dropdownItems">
                    <li className={activeIndex === 0 ? 'active' : ''} onClick={() => handleClick(0)}>All Vacations</li>
                    <li className={activeIndex === 1 ? 'active' : ''} onClick={() => handleClick(1)} >Liked Vacations</li>
                    <li className={activeIndex === 2 ? 'active' : ''} onClick={() => handleClick(2)} >Coming Vacations</li>
                    <li className={activeIndex === 3 ? 'active' : ''} onClick={() => handleClick(3)} >Current Vacations</li>
                </ul>
            </div>

            <svg>
                <filter id="goo" >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </svg>
        </div>
    );
}

export default UserMenu;
