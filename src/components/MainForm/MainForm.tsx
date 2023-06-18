import {  Field, FieldArray ,useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Button from '../Button/Button';
import { Link } from "react-router-dom";
import { useTypedSelector, useAppDispatch } from '../../hooks/hooks';
import buttonRemove from '../../assets/buttonRemove.svg'
import buttonAdd from '../../assets/buttonAdd.png'
import { submitForm } from '../../redux/formSlice';
import styles from './MainForm.module.css';

const validationSchema = Yup.object().shape({
    nickname: Yup.string()
    .max(30, "Максимальная длина 30 символов")
    .matches(/^[a-zA-Z0-9]+$/, "Может содержать только буквы и цифры")
    .required("Обязательное поле"),
    name: Yup.string()
    .max(50, "Максимальная длина 50 символов")
    .matches(/^[a-zA-Z]+$/, "Может содержать только буквы")
    .required("Обязательное поле"),
    sername: Yup.string()
    .max(50, "Максимальная длина 50 символов")
    .matches(/^[a-zA-Z]+$/, "Может содержать только буквы")
    .required("Обязательное поле"),
    sex: Yup.string().oneOf(["man", "woman"], "Выберите пол"),
    advantages: Yup.array()
    .of(Yup.string()),
    checkboxGroup: Yup.array().of(Yup.string()),
    radioGroup: Yup.string().required("Выберите вариант"),
    about: Yup.string().max(200, "Максимальная длина 200 символов"),
});

type Props = {
    step: number
    setStep: (step:number) => void
}

const MainForm:React.FC<Props> = ({step, setStep}) => {
    
    const [ valid, setValid] = useState<boolean>(false)
    const [ count, setCount] = useState<number>(0)
    const dispatch = useAppDispatch()
    const { email, phone} = useTypedSelector(state => state.form)
  
    const formik = useFormik({
        initialValues: {
            nickname: '',
            name: '',
            sername: '',
            sex: '',
            advantages: ['', '', '',],
            checkboxGroup: [],
            radioGroup: null,
            about: ''

        },
        validationSchema,
        validateOnChange: valid, 
        validateOnBlur: valid,
        onSubmit: (values) => {
            const obj = {...values, phone, email}
            console.log(obj)
            dispatch( submitForm(obj))  
        },
    })

    const handleNextStep1 = () => {
        formik.validateForm().then(res => {
            const { nickname, name, sername, sex } = res
            if(!nickname && !name && !sername && !sex) {
                setStep(step + 1)
            } else {
                setValid(true)
            }
        })
    }

    const handleNextStep2 = () => {
        formik.validateForm().then(res => {
            const { checkboxGroup, radioGroup, advantages } = res
            if(!checkboxGroup && !radioGroup && !advantages) {
                setStep(step + 1)
            } else {
                setValid(true)
            }
        })
    }

    const handleTextareaChange = (event:any) => {
        formik.handleChange(event);
        setCount(event.target.value.replace(/\s/g, '').length);
      };

    return (
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    { step === 0 && 
                    <>
                        <div className={styles.formItem}>
                            <span>Nickname</span><br />
                            <Field className={styles.inputText} name='nickname' placeholder='placeholder' />
                            { valid && formik.errors.nickname && formik.touched.nickname ? <div >{formik.errors.nickname}</div> : <div className={styles.tip}>Tip</div> }
                        </div>

                        <div className={styles.formItem} >
                            <span>Name</span><br />
                            <Field className={styles.inputText} placeholder='placeholder' name='name'/>
                            { valid && formik.errors.name && formik.touched.name ? <div >{formik.errors.name}</div> : <div className={styles.tip}>Tip</div> }
                        </div>

                        <div className={styles.formItem}>
                            <span>Sername</span><br />
                            <Field className={styles.inputText} placeholder='placeholder' name='sername'/>
                            { valid && formik.errors.sername && formik.touched.sername ? <div >{formik.errors.sername}</div> : <div className={styles.tip}>Tip</div> }
                        </div> 

                        <div className={styles.formItem}>
                            <span>Sex</span><br />
                            <Field as='select' name='sex' id='sex' className={styles.select}>
                                <option value='man' className={styles.option}>Man</option>
                                <option value='woman'>Woman</option>
                            </Field>
                        </div>

                        <div className={styles.buttons} >
                            <Link to='/'> <Button variant='white' type='button'> Назад </Button> </Link>
                            <Button variant='blue' onClick={ () => {
                                setValid(true)
                                handleNextStep1()
                            }} type='button'> Вперед </Button>
                        </div>

                    </>
                    }

                    { step === 1 && 
                    <>
                        <div className={styles.formItem}>
                            <span>Advantages</span><br />
                            <FieldArray name='advantages' >
                                { ( {push, remove}) => (
                                    <>
                                        {formik.values.advantages.map( (advantage, index) => (
                                            <div key={index} className={styles.advantages}>
                                                <Field className={styles.inputText} name={`advantages.${index}`} placeholder='placeholder'/>
                                                <img src={buttonRemove} alt='button-remove' style={{marginLeft: '18.5px'}} onClick={ () => remove(index)} />
                                            </div>
                                        )) }
                                        <div>
                                            <img src={buttonAdd} alt='button-add' onClick={ () => push('')} />
                                        </div>   
                                    </>
                                )}
                            </FieldArray>
                        </div>

                        <div className={styles.formItem}>
                            <span>Checkbox Group</span><br />
                            <div className={styles.spanGroup}>
                                <Field name="checkboxGroup" type='checkbox' value='1' />
                                <span>1</span>
                            </div>
                            <div className={styles.spanGroup}>
                                <Field name='checkboxGroup' type='checkbox' value='2' />
                                <span>2</span>
                            </div>
                            <div className={styles.spanGroup}>
                                <Field name='checkboxGroup' type='checkbox' value='3'  />
                                <span>3</span>
                            </div>
                            { valid && formik.errors.checkboxGroup && formik.touched.checkboxGroup ? <div >{formik.errors.checkboxGroup}</div> : <div className={styles.tip}></div> }
                        </div>

                        <div className={styles.formItem}>
                            <span>Radio Group</span><br />
                            <div className={styles.spanGroup}>
                                <Field name='radioGroup' type='radio' value='1' />
                                <span>1</span>
                            </div>
                            <div className={styles.spanGroup}>
                                <Field name='radioGroup' type='radio' value='2' />
                                <span>2</span>
                            </div>
                            <div className={styles.spanGroup}>
                                <Field name='radioGroup' type='radio' value='3' />
                                <span>3</span>
                            </div>
                            { valid && formik.errors.radioGroup && formik.touched.radioGroup ? <div >{formik.errors.radioGroup}</div> : <div className={styles.tip}></div> }
                        </div>

                        <div className={styles.buttons} >
                            <Button onClick={() => setStep(step - 1)} variant='white' type="button"> Назад </Button>
                            <Button onClick={ () => {
                                setValid(true)
                                handleNextStep2()
                            }}  variant='blue' type='button'> Вперед </Button>
                        </div>
                    </>
                    }
                    
                    { step === 2 && 
                        <>
                        <div className={styles.formItem}>
                            <span>About</span><br />
                            <div className={styles.textareaContainer}>
                                <textarea
                                    name='about'
                                    onChange={handleTextareaChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.about}
                                    className={styles.textareaItem}
                                    placeholder='placeholder'
                                />
                                <div className={styles.textareaCounter}> {count}/200 </div>
                            </div>
                            { valid && formik.errors.about && formik.touched.about ? <div >{formik.errors.about}</div> : <div className={styles.tip}>Tip</div> }
                        </div>

                        <div className={styles.buttons} >
                            <Button onClick={() => setStep(step - 1)} variant='white' type='button'> Назад </Button>
                            <Button  variant='blue' type='button' onClick={ () => {
                                setValid(true)
                                formik.handleSubmit()
                            }}> Отправить </Button>
                        </div>
                        </>
                    }
                </form>
            </FormikProvider>
    )
}

export default MainForm