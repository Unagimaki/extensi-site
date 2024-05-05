import { FC } from "react"
import classes from './ViewState.module.scss'

interface props {
    isActive: boolean
    clicked: boolean
    rotation: [number, number, number]
}

const ViewState: FC<props> = ({clicked, isActive, rotation}) => {
    return(
        <ul className={classes.container}>
            <li className={classes.li}>clicked: {clicked}</li>
            <li className={classes.li}>isActive: {isActive}</li>
            <li className={classes.li}>rotation: {rotation}</li>
        </ul>
    )
}

export default ViewState