import React, { useState } from 'react'

import { Button } from 'components/Button/Button'

import classes from './contacts.module.scss'

import { useForm } from 'react-hook-form'

import image from '../../../../public/images/contact_label_pic.png'
import axios from 'axios'
import InputLoader from './InputLoader/InputLoader'

interface userForm {
  email: string 
  message: string 
}

export const ContactsSection: React.FC = () => {
  const { handleSubmit } = useForm<FormData>()
  const [value, setValue] = useState<string>("")
  const [isSend, setIsSend] = useState<boolean>(false)
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false)
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true)
  
  const [userForm, setUserForm] = useState<userForm>({
    email: '',
    message: ''
  })

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = async (e: FormData) => {
    if (!userForm.email) {
      validateEmail(value) ? (setUserForm({email: value, message: ''}), setIsValidEmail(true)) : setIsValidEmail(false)
    } else {
      setIsLoaderVisible(true)
      try {
        const response = await axios.post('https://us-central1-gpt-telegram-8ab7d.cloudfunctions.net/notifications/sendFeedbackFromLanding', {
          email: JSON.stringify(userForm.email),
          message: JSON.stringify(userForm.message),
        });
        setIsSend(true)  
      } catch (error) { }
    }  
    setValue('')
  }
  
  return (
    <section className={classes.contacts}>

      <div className={classes.stroke_wrapper}>
        <div className={classes.stroke_container}>
          Чтобы <span className={classes.stroke_first}>заполнить бриф, оставьте</span>
        </div>
        <div className={classes.stroke_container}>
          вашу <span className={classes.stroke_last}>электронную почту</span>
        </div>
        <div className={classes.image_container}>
          <img className={classes.image} src={image.src} alt="image" />
        </div>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

        <div className={isValidEmail ? classes.email_alert_hidden : classes.email_alert}>Введите корректный email</div>

        <input
          placeholder={!userForm.email ? 'Введите email' : !userForm.message ? 'Введите сообщение' : 'Спасибо, мы вернемся к вам позже'}
          type="text"
          className={classes.input}
          onChange={(e)=>{ setValue(e.target.value), userForm.email && setUserForm({...userForm, message: e.target.value}) }}
          style={{fontSize: '15px'}}
          value={value}
        />
        {
          isLoaderVisible && !isSend ?

          <div className={classes.loader_container}>
            <InputLoader/>
          </div> : isLoaderVisible && isSend ?
          <div className={classes.loader_done}>
            <img src="./images/input-loader/done.svg" alt="done" />
          </div> : null
        }

        <Button
          type='submit'
          classNames={classes.button}
          variant='black'
          withArrowIcon
          decorClassName={classes.decor}
        />
      </form>

    </section>
  )
}
