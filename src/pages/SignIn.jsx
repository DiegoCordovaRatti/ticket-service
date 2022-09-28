import { Button, Form, Input, Row, Divider } from 'antd';
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
  const onFinish = () => {
    
      signInWithEmailAndPassword(auth, formValues.Email, formValues.Password)
      .then((userCredential) =>{
        const user = userCredential.user
        alert('Bienvenido ' + user.email)
        setInterval(navigate('/tickets-activos'), 1000)
      })
      .catch (function(error) {
        if (error.code === "auth/user-not-found") {
          alert(`Usuario no encontrado, intente con otro.`)
        } else if (error.code === "auth/invalid-email") {
          alert(`Cuenta inválida, intente con otra.`)
        } else if (error.code === "auth/wrong-password") {
          alert(`Contraseña invalida, intente con otra.`)
        } else {
          alert(`Un error ha ocurrido, intente de nuevo`)
        }
      })
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Row>    
        <Divider orientation='center'>Ingrese a su cuenta</Divider>
      </Row>
      <Row justify='center'>
        <img style={{width: '300px', objectFit: 'cover'}} src="https://img.freepik.com/free-vector/spreadsheets-concept-illustration_114360-945.jpg?w=740&t=st=1664390528~exp=1664391128~hmac=7e90aff21954b17a65039e32e22255ea0c1b3f89f029cd09c12541092082d054" alt="" />
      </Row>
      <Row justify='center'>
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
      </Row>
    </div>
  );
};

export default SignIn;