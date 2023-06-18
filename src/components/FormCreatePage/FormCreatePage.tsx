import styles from './FormCreatePage.module.css';
import { useState } from 'react';
import ModalSuccess from '../Modal/ModalSuccess/ModalSuccess';
import { useTypedSelector } from '../../hooks/hooks';
import ModalError from '../Modal/ModalError/ModalError';
import MainForm from '../MainForm/MainForm';
import Stepper from '../Stepper/Stepper';

const FormCreatePage = () => {
    const [ step, setStep ] = useState<number>(0)
    const { success } = useTypedSelector(state => state.form )

    return (
        <div className={styles.container}>
            <Stepper step={step} />
            <MainForm step={step} setStep={setStep} />
            { success === true && <ModalSuccess /> }
            { success === false && <ModalError /> }
        </div>
    )
}

export default FormCreatePage