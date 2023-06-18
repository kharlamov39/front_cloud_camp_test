import { Link } from 'react-router-dom'
import Button from '../../Button/Button'
import styles from './ModalSuccess.module.css'
import success from '../../../assets/success.png'
import { useAppDispatch } from '../../../hooks/hooks'
import { closeModal } from '../../../redux/formSlice'

const ModalSuccess = () => {

    const dispatch = useAppDispatch()

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.head}>
                        <h3>Форма успешно отправлена</h3>
                    </div>
                    <div>
                        <img src={success} alt='success' />
                    </div>
                    <div>
                        <Link to='/'>
                            <Button type='button' variant='blue' onClick={ () => dispatch(closeModal())}> На главную</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalSuccess
