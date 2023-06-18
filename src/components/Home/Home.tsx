import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import folder from '../../assets/folder.svg'
import StartForm from '../StartForm/StartForm'

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    АИ
                </div>
                <div className={styles.headerInfo}>
                    <div className={styles.names}>
                        <h2>Иван Иванов </h2>
                    </div>
                    <div>
                        <ul className={styles.menu}>
                            <li> <Link to='#' className={styles.link}> <img src={folder} alt='folder' /> Telegram </Link> </li>
                            <li> <Link to='#' className={styles.link}> <img src={folder} alt='folder' /> Github </Link></li>
                            <li> <Link to='#' className={styles.link}> <img src={folder} alt='folder' /> Resume </Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <StartForm />
        </div>
    )
}

export default Home