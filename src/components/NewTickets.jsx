import { Form, Row, Col, Input, Cascader, Divider, Select, DatePicker, TimePicker, Button } from 'antd';
import moment from 'moment'
import { useState } from "react";
import { ticketsCollection } from "../database/authentication";
import { addDoc, updateDoc } from "firebase/firestore";
import RegionesJSON from '../assets/regiones.json';
import techDepartmentJSON from '../assets/techDepartment.json';
const {Option} = Select;
const {TextArea} = Input

const NewTicket = (props) => {
  const {area, user} = props.parentProps
  const date = new Date().toLocaleString()
  
    const [formValues, setFormValues] = useState({
      address: '',
      assignedDate: '',
      assignedTime: '',
      clientName: '',
      createdBy: area + ' - ' + user,
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
        createdBy: [area + ' - ' + user],
      }
    }
    const handleInputChange = e => {
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }
  const onRegionChange = (value) => {
    setFormValues(prevFormValues =>({ ...prevFormValues, regionComune: value,}));
  };
  const onReqChange = (value) => {
    setFormValues(prevFormValues =>({ ...prevFormValues, reqType: value,}));
  };
  const onTechChange = (value) => {
    setFormValues(prevFormValues =>({ ...prevFormValues, techDepartment: value,}));
  };
  const onDateChange = (value) => {
    setFormValues(prevFormValues =>({ ...prevFormValues, assignedDate: value.format('L')}));
  };
  const onTimeChange = (value) => {
    setFormValues(prevFormValues =>({ ...prevFormValues, assignedTime: value.format('LT')}));
  };
  const onSubmit = async() =>{
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
    await updateDoc(docRef,{
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
      
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
  <>
    <Form layout="vertical" initialValues={getInitialValues()} onFinish={onFinish} onFinishFailed={onFinishFailed}>

      <Divider orientation='left'>Información Cliente</Divider>
      <Row gutter={24}>
        <Col span={8} >
          <Form.Item label="Creado por" name='createdBy'>
            <Input readOnly/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Cliente" name='Client' rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}>
            <Input  name='clientName' onChange={handleInputChange}/>
          </Form.Item>
        </Col>
        <Col span={8} >
          <Form.Item label="Fecha de Creación" name='createdOn'>
            <Input readOnly /> 
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Region y comuna" name='Comune' rules={[{ required: true, message: 'ingrese la comuna' }]}>
            <Cascader options={Regiones} name='regionComune' onChange={onRegionChange} placeholder="Región / Comuna"/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Direccion" name='Address' rules={[{ required: true, message: 'ingrese la dirección' }]}>
            <Input name='address' onChange={handleInputChange} />
          </Form.Item>
        </Col>
        <Col span={8}>
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
              <Option value="Problemas técnicos">Problemas técnicos</Option>
              <Option value="Cambio de domicilio">Cambio de domicilio</Option>
              <Option value="Contratación de servicios">Contratación de servicios</Option>
              <Option value="Cancelación de servicios">Cancelación de servicios</Option>
              <Option value="Mejoramiento de plan">Mejoramiento de plan</Option>
              <Option value="Revisión pago">Revisión pago</Option>
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
        <Form.Item label="Departamento Técnico" name='Technician' rules={[{ required: true, message: 'ingrese el departamento técnico' }]}>
          <Cascader options={TechDepartment} name='techDepartment' onChange={onTechChange} placeholder="Departamento / Técnico"/>
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