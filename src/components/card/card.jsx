import styles from './styles.module.css';

export default function Card({title, description}){
    return(
        <div className={styles.card}>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    )
}