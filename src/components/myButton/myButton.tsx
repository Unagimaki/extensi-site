import { ButtonHTMLAttributes, FC } from 'react'
import classes from './myButton.module.scss'
import styles from 'classnames'


interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
    withArrowIcon?: boolean
    onClick?: () => void
    classNames?: string

}

export const MyButton: FC<props> = ({
    withArrowIcon = false, onClick, classNames, ...props
}) => {
    return(
        <button onClick={onClick} className={styles(classes.button, classNames)} {...props}>
            {
                <img
                    src={`/assets/icons/${withArrowIcon ? 'arrow' : 'plus'}.svg`}
                    className={classes.icon}
                    alt="icon"
                />
            }
            <div className={classes.decor}/>
        </button>
    )
}