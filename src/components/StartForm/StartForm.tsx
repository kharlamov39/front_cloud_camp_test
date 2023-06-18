import styles from './StartForm.module.css';
import { Field, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchStartForm } from '../../redux/formSlice';

const StartForm = () => {
    
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object().shape({
        phone: Yup.string().matches(/\d+/, 'Only numbers').required('Required'),
        email: Yup.string()
        .email('Invalid email')
        .matches(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu, 'Invalid Email')
        .required('Required'),
    });

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            phone: '',
            email: ''
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch( fetchStartForm(values) )
            navigate('/create')
        }
    })

    return (
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <div className={styles.numberItem}>
                        <span>Номер телефона</span><br />
                        <Field type='text' name='phone' >
                            { ({field} :any) => (
                                <InputMask {...field} mask='+7 (999) 999-99-99' placeholder='+7 (___) ___-__-__' value={formik.values.phone} className={styles.input}/>
                            )} 
                        </Field>
                        {formik.errors.phone && formik.touched.phone ? <div >{formik.errors.phone}</div> : <div></div> }
                    </div>

                    <div className={styles.emailItem}>
                        <span>Email</span><br />
                        <Field type='email' name='email' placeholder='tim.jennings@example.com' className={styles.input}/>
                        {formik.errors.email && formik.touched.email ? <div >{formik.errors.email}</div> : <div></div> }
                    </div>
    
                    
                    <div className={styles.btn}>
                        <Button type='submit' variant='blue' >
                            Начать
                        </Button>
                    </div>
                                    
                </form>
            </FormikProvider>
    )
}

export default StartForm