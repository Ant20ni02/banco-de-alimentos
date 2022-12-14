import '../styles/Navbar.css';
import { useState, useEffect, useRef, useId } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faBrush, faPalette, faCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import url from '../config/API';
import icon from '../images/icons/icon.png';

const Navbar = ({isOpenSidebar, toggleSidebar, ...props}) => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        const getUser = async () => {
            const idUser = localStorage.getItem("idUser");
            const response = await fetch(url+`getNamePhoto/${idUser}`, {
                method: "GET",
                headers: {
                    'x-access-token' : localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if(data.mensaje !== undefined && data.mensaje === "Token inválido"){
                localStorage.removeItem("token");
                localStorage.removeItem("idUser");
                navigate("/inicio-de-sesion", { replace: true });
            }
            setUser(data[0]);
        }
        let color = localStorage.getItem("theme")
        document.documentElement.style.setProperty('--accent-color', color);
        let apparenceRadio = localStorage.getItem("appearance")
        if (apparenceRadio === "dark") {
            document.documentElement.style.setProperty('--bg-color', "#1e2021");
            document.documentElement.style.setProperty('--main-color', "#181a1b");
            document.documentElement.style.setProperty('--text-color', "#e8e6e3");
            document.documentElement.style.setProperty('--details', "#42474a");
        } else if (apparenceRadio === "light") {
            document.documentElement.style.setProperty('--bg-color', "#f5f5f5");
            document.documentElement.style.setProperty('--main-color', "#FFFFFF");
            document.documentElement.style.setProperty('--text-color', "#131516");
            document.documentElement.style.setProperty('--details', "#c0c0c0");
        }
        getUser();
    }, []);

    return (
        <>
            <nav className="Navbar">
                <ul className="Navbar-container">
                    <li className="Navbar-item">
                        {/* <div className='menu-hamburger'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div> */}
                        <FontAwesomeIcon icon={faBars} className="Navbar-icon-menu-hamburger" onClick={toggleSidebar}/>
                    </li>
                    <li className="Navbar-item">
                        <NavLink to="/bamx/pagina-principal" accessKey='P'>
                            <img src={icon} alt="icon" className="Navbar-logo"/>
                        </NavLink>
                    </li>
                    <li className="Navbar-item">
                        <span>
                            <img className="imgProfile" src={user.img} alt={user.firstName} />
                            {user.firstName} {user.lastName}
                        </span>
                    </li>
                    <li className="Navbar-item">
                        <div className="Navbar-item-circle" onClick={() => setShowMenu(!showMenu)}><FontAwesomeIcon icon={faCaretDown} className="Navbar-icon"/></div>
                        {
                            showMenu && (
                                <DropdownMenu/>
                            )
                        }
                    </li>
                </ul>
            </nav>
        </>
    );
}

const DropdownMenu = () => {
    const navigate = useNavigate();
    const id = useId();
    let theme = localStorage.getItem('theme');

    if (theme === "#FE921D") {
        localStorage.setItem("theme", "#FE921D");
        theme = localStorage.getItem('theme');
    } else if (theme === "#0DB14B") {
        localStorage.setItem("theme", "#0DB14B");
        theme = localStorage.getItem('theme');
    } else if (theme === "#ED1A3B") {
        localStorage.setItem("theme", "#ED1A3B");
        theme = localStorage.getItem('theme');
    }

    const changeTheme = (e) => {
        const themeRadio = e.target.value;

        if (themeRadio === "#FE921D") {
            document.documentElement.style.setProperty('--accent-color', "#FE921D");
            localStorage.setItem("theme", "#FE921D");
            theme = localStorage.getItem('theme');
            /* theme = "#FE921D"; */
        } else if (themeRadio === "#0DB14B") {
            document.documentElement.style.setProperty('--accent-color', "#0DB14B");
            localStorage.setItem("theme", "#0DB14B");
            theme = localStorage.getItem('theme');
            /* theme = "#0DB14B"; */
        } else if (themeRadio === "#ED1A3B") {
            document.documentElement.style.setProperty('--accent-color', "#ED1A3B");
            localStorage.setItem("theme", "#ED1A3B");
            theme = localStorage.getItem('theme');
            /* theme = "#ED1A3B"; */
        }
    }

    let appearance = localStorage.getItem('appearance');

    const changeAppearance = (e) => {
        const appearanceRadio = e.target.value;

        if (appearanceRadio === "light") {
            document.documentElement.style.setProperty('--bg-color', "#181a1b");
            document.documentElement.style.setProperty('--main-color', "#1e2021");
            document.documentElement.style.setProperty('--text-color', "#FFFFFF");
            localStorage.setItem("appearance", "dark");
            appearance = localStorage.getItem('appearance');
        } else if (appearance === "dark") {
            document.documentElement.style.setProperty('--bg-color', "#f5f5f5");
            document.documentElement.style.setProperty('--main-color', "#FFFFFF");
            document.documentElement.style.setProperty('--text-color', "#000000");
            localStorage.setItem("appearance", "light");
            appearance = localStorage.getItem('appearance');
        }
    }   

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("idUser");
        navigate("/inicio-de-sesion", { replace: true });
    }
    
    return (
        <ul className="Navbar-dropdown">
            <li className="Navbar-dropdown-item">
                <div className="Navbar-dropdown-item-legend">
                    <span>Apariencia </span><FontAwesomeIcon icon={faBrush} className="Navbar-dropdown-item-icon"/>
                </div>
                <div className="Navbar-dropdown-item-checkboxes">
                    {/* <input type="radio" id={`${id}-auto`} name="appearance" value="auto" checked/>
                    <label htmlFor={`${id}-auto`}>Automático</label> */}
                    <input type="radio" className='appearance-light' id={`${id}-light`} name="appearance" value="light" onClick={changeAppearance}/>
                    <label htmlFor={`${id}-light`}  ><FontAwesomeIcon icon={faCircle} className='appearance-light-icon'/></label>
                    <input type="radio" className='appearance-dark' id={`${id}-dark`} name="appearance" value="dark" onClick={changeAppearance}/>
                    <label htmlFor={`${id}-dark`} ><FontAwesomeIcon icon={faCircle} className='appearance-dark-icon'/></label>
                </div>
            </li>
            <li className="Navbar-dropdown-item">
                <div className="Navbar-dropdown-item-legend">
                    <span>Tema </span><FontAwesomeIcon icon={faPalette} className="Navbar-dropdown-item-icon"/>
                </div>
                <div className="Navbar-dropdown-item-checkboxes">
                    <input type="radio" className='theme-yellow' id={`${id}-yellow`} name="theme" value="#FE921D" onClick={changeTheme}/>
                    <label htmlFor={`${id}-yellow`}><FontAwesomeIcon icon={faCircle} className='theme-yellow-icon'/></label>

                    <input type="radio" className='theme-green' id={`${id}-green`} name="theme" value="#0DB14B" onClick={changeTheme}/>
                    <label htmlFor={`${id}-green`}><FontAwesomeIcon icon={faCircle} className='theme-green-icon'/></label>

                    <input type="radio" className='theme-red' id={`${id}-red`} name="theme" value="#ED1A3B" onClick={changeTheme}/>
                    <label htmlFor={`${id}-red`}><FontAwesomeIcon icon={faCircle} className='theme-red-icon'/></label>
                </div>
            </li>
            <li className="Navbar-dropdown-item" onClick={handleLogout}>
                <div className="Navbar-dropdown-item-legend">
                    <span>Salir </span><FontAwesomeIcon icon={faRightFromBracket} className="Navbar-dropdown-item-icon"/>
                </div>
            </li>
        </ul>
    );
}

export default Navbar;
