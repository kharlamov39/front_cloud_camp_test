import styles from './Button.module.css';

type Props = {
    children: React.ReactNode
    type?: 'submit' | 'button'
    variant: 'blue' | 'white'
    onClick?: () => void
}

const Button:React.FC<Props> = ({children, type, variant, onClick }) => {
    return (
        <button className={`${styles[variant]} ${styles.button}`} type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button