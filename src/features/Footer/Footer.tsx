import { FC, useEffect } from 'react'
import Link from 'next/link'
import classes from './footer.module.scss'

export const Footer: FC = () => {

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>

        <div className={classes.text}>
          <div className={classes.title}>Напишите нам</div>
          <div className={classes.mail}>
            <Link href={'mailto: info@tcollection.art'}>
              sales@extensi.one
            </Link>
          </div>
        </div>

        <div className={classes.image_container}>
          <img className={classes.image} src="/images/footer/footer.png" alt="footer" />
        </div>

      </div>
    </footer>
  )
}
