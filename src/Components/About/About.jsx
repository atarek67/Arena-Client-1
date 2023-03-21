import React from 'react'
import img from '../../images/Register.svg'
import style from './about.module.css'
import AboutCard from './AboutCard'
import { useTranslation } from 'react-i18next';
export default function About() {
    const [t,i18n]=useTranslation();
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className='col-lg-12 col-md-6 text-center mt-5 fontTik'>
                        {/* <p>{t("Created for")} <span className={style.mySpan}>{t("ease the reservation")}</span> </p> */}
                        {/* <h2 className={style.t}>{t("WELCOME to About page")}</h2> */}
                        <h2 className="fontTik mt-3">{t("Here you can reserve any court")} </h2>
                        
                    </div>
                    {/* <div className='col-12 text-center d-lg-block d-none'>
                        <img src={img} className="w-50 m-4" alt="Goal Picture" />
                    </div> */}
                </div>
                <div className="mb-5">
                    <AboutCard/>
                </div>
            </div>
        </>
    )
}
