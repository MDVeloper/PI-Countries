import css from './countryIndividual.module.css';

export default function Country({name, flagimg, continent}){
    return (
        <div className={css.card} >
            <div className={css.imgContainer}>                
                <img className={css.img} src={flagimg} />
            </div>

            <div className={css.container}>   
                <h4>{name}</h4>
                <span className={css.textColor}>{continent}</span>
            </div>
        </div>


    )
}