import { Button, Form, Input } from 'antd';
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth  } from "../database/authentication";

const SignIn = () => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    Email: '',
    Password: '',
  })

  const handleInputChange = e => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }
  const onFinish = (values) => {
    try {
      signInWithEmailAndPassword(auth, formValues.Email, formValues.Password)
      .then((userCredential) =>{
        const user = userCredential.user
        console.log(user)
        alert('Bienvenido ' + user.email)
      })
      navigate('/tickets-activos')
    } catch (error) {
      console.log(error.message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form name="basic" 
      labelCol={{ span: 8, }} 
      wrapperCol={{ span: 16, }}
      initialValues={{ remember: true, }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{required: true,message: 'Ingresa tu email',},]}
      >
        <Input name='Email' onChange={handleInputChange}/>
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="contraseña"
        rules={[{required: true,message: 'Ingresa tu contraseña',}]}
      >
        <Input.Password name='Password' onChange={handleInputChange}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16,}}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;