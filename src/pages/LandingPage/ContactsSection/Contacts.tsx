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
  
  const [userForm, setUserForm] = useState<userForm>({
    email: '',
    message: ''
  })

  const onSubmit = async (e: FormData) => {
    if (!userForm.email) {
      setUserForm({email: value, message: ''})
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


  const setPlaceholder = () => {
    if (!userForm.email) {
      return 'Введите email'
    } else if (!userForm.message && userForm.email) {
      return 'Введите сообщение'
    } else if (userForm.email && userForm.message) {
      return 'Спасибо, мы вернемся к вам позже'
    }
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
        <input
          placeholder={setPlaceholder()}
          type="text"
          className={classes.input}
          onChange={(e)=>{ setValue(e.target.value), userForm.email && setUserForm({...userForm, message: e.target.value}) }}
          style={{fontSize: '14px'}}
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
