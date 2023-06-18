import Button from '../../Button/Button'
import styles from './ModalError.module.css'
import error from '../../../assets/error.png'
import { useAppDispatch } from '../../../hooks/hooks'
import { closeModal } from '../../../redux/formSlice'
import buttonClose from '../../../assets/buttonClose.svg'

const ModalError = () => {

    const dispatch = useAppDispatch()

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.head}>
                        <h3>Ошибка</h3>
                        <img  src={buttonClose} alt='button-close' onClick={() => dispatch(closeModal())} />
                    </div>
                    <div>
                        <img src={error} alt='error' />
                    </div>
                    <div className={styles.btn}>
                        <Button type='button' variant='blue' onClick={() => dispatch(closeModal())}> Закрыть </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalError
