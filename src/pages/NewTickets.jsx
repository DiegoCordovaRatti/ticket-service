import { Form, Row, Col, Input, Cascader, Divider, Select, DatePicker, TimePicker, Button, Breadcrumb } from 'antd';
import moment from 'moment'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ticketsCollection, auth, dataBase } from "../database/authentication";
import { addDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import RegionesJSON from '../assets/regiones.json';
import techDepartmentJSON from '../assets/techDepartment.json';
const {Option} = Select;
const {TextArea} = Input

const NewTicket = () => {
  
  const [CurrentUser, setCurrrentUser] = useState({
    area: '',
    user: ''
  });
  useEffect(() => {
    if (auth.currentUser !== null) {
      const userDocs = async () => {
        const userRef = doc(dataBase, 'Users', auth.currentUser.email)
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrrentUser(userSnap.data())
        }
      }
      userDocs()
    }
  }, []);

  let navigate = useNavigate()
  const date = new Date().toLocaleString()

  const [formValues, setFormValues] = useState({
    address: '',
    assignedDate: '',
    assignedTime: '',
    clientName: '',
    createdBy: [],
    createdOn: date,
    flatNumber: '',
    regionComune: [],
    reqType: '',
    subject: '',
    subjectDetails: '',
    techDepartment: []
  })
  const getInitialValues = () => {
    return {
      createdOn: date,
    }
  }
  const handleInputChange = e => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
      createdBy: CurrentUser.area + ' - ' + CurrentUser.user
    }))
  }
  const onRegionChange = (value) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      regionComune: value,
    }));
  };
  const onReqChange = (value) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      reqType: value,
    }));
  };
  const onTechChange = (value) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      techDepartment: value,
    }));
  };
  const onDateChange = (value) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      assignedDate: value.format('L')
    }));
  };
  const onTimeChange = (value) => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      assignedTime: value.format('LT')
    }));
  };
  const onSubmit = async () => {
    const docRef = await addDoc(ticketsCollection, {
      address: formValues.address,
      assignedDate: formValues.assignedDate,
      assignedTime: formValues.assignedTime,
      clientName: formValues.clientName,
      createdBy: formValues.createdBy,
      createdOn: formValues.createdOn,
      flatNumber: formValues.flatNumber,
      regionComune: formValues.regionComune,
      reqType: formValues.reqType,
      subject: formValues.subject,
      subjectDetails: formValues.subjectDetails,
      techDepartment: formValues.techDepartment
    })
    await updateDoc(docRef, {
      id: docRef.id,
      completed: false
    })

  }
  const Regiones = RegionesJSON
  const TechDepartment = techDepartmentJSON

  const onFinish = (values) => {
    console.log('Success:', values);
    alert('Ticket creado correctamente')
    onSubmit()
    navigate('/tickets-activos')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    return (
  <>
    <Breadcrumb style={{margin: '16px 0',}}>
      <Breadcrumb.Item>{CurrentUser.area}</Breadcrumb.Item>
      <Breadcrumb.Item>{CurrentUser.user}</Breadcrumb.Item>
    </Breadcrumb>
    <Form layout="vertical" initialValues={getInitialValues()} onFinish={onFinish} onFinishFailed={onFinishFailed}>

      <Divider orientation='left'>Informaci??n Cliente</Divider>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Cliente" name='Client' rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}>
            <Input  name='clientName' onChange={handleInputChange}/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Region y comuna" name='Comune' rules={[{ required: true, message: 'ingrese la comuna' }]}>
            <Cascader options={Regiones} name='regionComune' onChange={onRegionChange} placeholder="Regi??n / Comuna"/>
          </Form.Item>
        </Col>
        <Col span={8} >
          <Form.Item label="Fecha de Creaci??n" name='createdOn'>
            <Input readOnly /> 
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Direccion" name='Address' rules={[{ required: true, message: 'ingrese la direcci??n' }]}>
            <Input name='address' onChange={handleInputChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Detalle domicilio (casa, local, deparmento, etc):">
            <Input name='flatNumber' onChange={handleInputChange}/>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation='left'>Detalles del caso</Divider>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Tipo de requerimiento" name='Requirement' rules={[{ required: true, message: 'ingrese el requerimiento' }]}>
            <Select name='reqType' onChange={onReqChange}>
              <Option value="Problemas t??cnicos">Problemas t??cnicos</Option>
              <Option value="Cambio de domicilio">Cambio de domicilio</Option>
              <Option value="Contrataci??n de servicios">Contrataci??n de servicios</Option>
              <Option value="Cancelaci??n de servicios">Cancelaci??n de servicios</Option>
              <Option value="Mejoramiento de plan">Mejoramiento de plan</Option>
              <Option value="Revisi??n pago">Revisi??n pago</Option>
              <Option value="Quejas">Quejas</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Asunto" name='Subject' rules={[{ required: true, message: 'ingrese el asunto' }]}>
            <TextArea rows={1} name='subject' onChange={handleInputChange} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Detalles" name='Details' rules={[{ required: true, message: 'ingrese los detalles del requerimiento' }]}>
            <TextArea rows={1} name='subjectDetails' onChange={handleInputChange}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
      <Col span={8}>
        <Form.Item label="Departamento T??cnico" name='Technician' rules={[{ required: true, message: 'ingrese el departamento t??cnico' }]}>
          <Cascader options={TechDepartment} name='techDepartment' onChange={onTechChange} placeholder="Departamento / T??cnico"/>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Fecha Agendada" name='AssignedDate' rules={[{ required: true, message: 'ingrese la fecha a agendar' }]}>
          <DatePicker style={{ width: '100%' }} name='assignedDate' onChange={onDateChange} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Hora" name='AssignedTime' rules={[{ required: true, message: 'ingrese la hora a agendar' }]}>
          <TimePicker style={{ width: '100%' }} name='assignedTime' onChange={onTimeChange} use12Hours format="h:mm a" minuteStep={15} defaultOpenValue={moment('12:00 AM', 'h:mm a')}/>
        </Form.Item>
      </Col>
      </Row>
      <Row justify='center'>
        <Button htmlType="submit" type='primary'  style={{backgroundColor: 'green', fontWeight: 'bold'}}>Crear Ticket</Button>
      </Row>
    </Form>
  </>
  );
};

export default NewTicket;