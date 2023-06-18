import styles from './Stepper.module.css';
import activeStep from '../../assets/activeStep.svg';
import checkStep from '../../assets/checkStep.svg';

type Props = {
    step: number
    setStep: any
}

const Stepper:React.FC<Props> = ({step, setStep}) => {

    const WIDTH = step * 50

    const span = [ '1', '2', '3']
    const labels = span.map( (el, i) => <span key={i} style={{ color: step == i || step > i ? 'blue' : 'inherit', fontWeight: step === i ? '600' : '400' }}>{el}</span> )

    return (
        <div className={styles.container}>
            <div className={styles.stepper} >
                <div className={styles.activeStep} style={{ width: `${WIDTH}%`, backgroundColor: 'blue' }}>
                
                </div>

                <div className={`${styles.circle} ${styles.circleOne}`} >
                    { step === 0 ? <img src={activeStep} alt='activeStep' className={styles.img}  /> : <img src={checkStep} alt='checkStep' className={styles.img} /> }
                </div>
                <div className={`${styles.circle} ${styles.circleTwo}`} >
                    { step === 1 && <img src={activeStep} alt='activeStep' className={styles.img} /> }
                    { step > 1 && <img src={checkStep} alt='checkStep' className={styles.img} /> }
                </div>
                <div className={`${styles.circle} ${styles.circleThree}`} >
                    { step === 2 && <img src={activeStep} alt='activeStep' className={styles.img} /> }
                </div>      
            </div>

            <div className={styles.numbers}>
                {labels}
            </div>

        </div>
    )
}

export default Stepper
