import React from 'react';
import style from './footer.module.css';
import logo from "../../images/Logo.png";
import { NavLink } from 'react-router-dom';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { useTranslation } from 'react-i18next';
export default function Footer() {
    const [t,i18n]=useTranslation();
    return (
        <div>

            <div className="">

            </div>

            <footer className={style.footer_distributed}>
                <div className={style.footer_left}>
                    <h6 className={style.footer_links}>


                        <div className={style.footer_right}>
                            <NavLink to={"https://facebook.com"}><i className="fa fa-facebook"></i></NavLink>
                            <NavLink to={"https://twitter.com"}><i className="fa fa-twitter"></i></NavLink>
                            <NavLink to={"https://linkedin.com"}><i className="fa fa-linkedin"></i></NavLink>
                            <NavLink to={"https://github.com"}><i className="fa fa-github"></i></NavLink>
                        </div>
                        <img src={logo} alt="logo" className={style.logo} />
                        {t("Arena Platform")}
                    </h6>

                    <p>Arena © 2023</p>



                </div>
            </footer>
        </div>
    )
}
