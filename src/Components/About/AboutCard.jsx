import React from 'react'
import reserveImg from '../../images/reserveImg.svg'
import fieldOwner from '../../images/filedOwner.svg'
import search from '../../images/search.svg'
import style from './about.module.css'
import { useTranslation } from 'react-i18next';


export default function AboutCard() {
    const [t,i18n]=useTranslation();
    return (
        <>
            <div className="row ">
                <div className="card col-sm-4 mt-5" >
                    <img className="card-img-top text-center  m-5 w-75" src={reserveImg} alt="Card image" />
                    <div className="card-body">
                        <p className={style.textcard}>{t("The player can reserve any Court in any date and time.")}</p>
                    </div>
                </div>
                <div className="card col-sm-4 mt-5" >
                    <img className="card-img-top text-center m-5 w-75 " src={fieldOwner} alt="Card image" />
                    <div className="card-body">
                        <p className={style.textcard}>{t("Field Owner Can add his owm fields and the price per hour.")}</p>
                    </div>
                </div>
                <div className="card col-sm-4 mt-5" >
                    <img className="card-img-top text-center m-5 w-75" src={search} alt="Card image" />
                    <div className="card-body">
                        <p className={style.textcard}>{t("Any User can discover all the courts and the prices and search by Location and Price.")}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
