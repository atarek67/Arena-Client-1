import React from 'react'
import style from './errortest.module.css'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
export default function ErrorTest() {
    const [t,i18n   ]=useTranslation();
    return (
        <div>
            <section className={style.page_404}>
                <div className="container">
                    <div className="row text-center">
                        <div className="col-sm-12 ">
                            <div className="">
                                <div className={style.four_zero_four_bg}>
                                    <h1 className="text-center font-monospace ">404</h1>


                                </div>

                                <div className={style.contant_box_404}>
                                    <h3 className="h2">
                                        {t("Look like you're lost")}
                                    </h3>

                                    <p>{t("the page you are looking for not avaible!")}</p>

                                    <NavLink to="/home" className={style.link_404}>{t("Go to Home")}</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
