import React, { useState } from 'react';
import { Form, Row, Col, Input, Cascader, Divider, Select, DatePicker, TimePicker } from 'antd';
import moment from 'moment'
import RegionesJSON from '../assets/regiones.json';
import techDepartmentJSON from '../assets/techDepartment.json';
const {Option} = Select;
const {TextArea} = Input

const NewTicket = (props) => {
    const date = new Date().toLocaleString()
    const getInitialValues = () => {
      return {
        dateTime: date,
        employee: [props.parentProps.area + ' - ' + props.parentProps.user],
        requirementType: 'Problemas técnicos',
        technicalDepartment: 'Programación',
      }
    }
    const Regiones = RegionesJSON
    const TechDepartment = techDepartmentJSON
    const onValueChange = (value) => {
      console.log(value);
    };
    return (
  <>
    <Form layout="vertical" initialValues={getInitialValues()}>

      <Divider orientation='left'>Información Cliente</Divider>
      <Row gutter={24}>
        <Col span={8} >
          <Form.Item label="Creado por" name='employee'>
            <Input readOnly/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Cliente" rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8} >
          <Form.Item label="Fecha de Creación" name="dateTime">
            <Input readOnly/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Region y comuna" rules={[{ required: true, message: 'ingrese la comuna' }]}>
            <Cascader options={Regiones} onChange={onValueChange} placeholder="Región / Comuna"/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Direccion" rules={[{ required: true, message: 'ingrese la dirección' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Departamento">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation='left'>Detalles del caso</Divider>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Asunto" rules={[{ required: true, message: 'ingrese el asunto' }]}>
          <TextArea rows={2} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Detalles" rules={[{ required: true, message: 'ingrese los detalles del requerimiento' }]}>
            <TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Tipo de requerimiento" name='requirementType' rules={[{ required: true, message: 'ingrese el requerimiento' }]}>
            <Select onChange={onValueChange}>
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
      <Col span={12}>
        <Form.Item label="Departamento Técnico" rules={[{ required: true, message: 'ingrese el departamento técnico' }]}>
          <Cascader options={TechDepartment} onChange={onValueChange} placeholder="Departamento / Técnico"/>
        </Form.Item>
      </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Fecha Agendada" rules={[{ required: true, message: 'ingrese la fecha a agendar' }]}>
            <DatePicker style={{ width: '100%' }} onChange={onValueChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Hora" rules={[{ required: true, message: 'ingrese la hora a agendar' }]}>
            <TimePicker style={{ width: '100%' }} onChange={onValueChange} use12Hours format="h:mm a" minuteStep={15} defaultOpenValue={moment('12:00 AM', 'h:mm a')}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </>
  );
};

export default NewTicket;