import { Descriptions, Typography, Button, Row, Col, Skeleton } from "antd";
import { useState,useEffect } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { dataBase } from "../database/authentication";


const { Text } = Typography

export default function TicketDescription(props) {
  const {address, assignedDate, assignedTime, clientName, createdBy, createdOn, 
    flatNumber, regionComune, reqType, subject, subjectDetails, techDepartment, id, completed } = props.ticket
    const descriptionFields = [
    {label: <Text strong>Status:</Text>, description: (completed ? 'Requerimiento Resuelto' : 'Requerimiento Pendiente'), span: '2'},
    {label: <Text strong>ID:</Text>, description: id, span: '1'},
    {label: <Text strong>Creado por:</Text>, description: createdBy, span: '1'},
    {label: <Text strong>Creación:</Text>, description: createdOn, span: '1'},
    {label: <Text strong>Cliente:</Text>, description: clientName, span: '1'},
    {label: <Text strong>Tipo de requerimiento</Text>, description: reqType, span: '1'},
    {label: <Text strong>Dirección & departamento</Text>, description: address + ' ' +  (flatNumber === '' ? flatNumber : `, ${flatNumber}`), span: '1'},
    {label: <Text strong>Región / Comuna:</Text>, description: regionComune[0]  + ' | ' + regionComune[1], span: '1'},
    {label: <Text strong>Fecha y hora agendada</Text>, description: assignedDate + ' | ' + assignedTime, span: '1'},
    {label: <Text strong>Departamento Tecnico</Text>, description: techDepartment[0], span: '1'},
    {label: <Text strong>Técnico Asignado</Text>, description: techDepartment[1], span: '1'},
    {label: <Text strong>Asunto</Text>, description: subject, span: '2'},
    {label: <Text strong>Detalles</Text>, description: subjectDetails, span: '2'},
  ] 
  const completedColors = completed ? '#46d33010' : '#f8000010'
  const DescriptionItems = descriptionFields.map(item => 
  <Descriptions.Item label={item.label} span={item.span} style={{backgroundColor: completedColors}}>{ item.description }</Descriptions.Item>)

  const updateStatusTrue = async() =>{
    const ticketRef = doc(dataBase, "Tickets", id);
    try {
      await updateDoc(ticketRef,{
      completed: true
    })
    } catch (error) {
      console.log(error)
    }
  }
  const updateStatusFalse = async() =>{
    const ticketRef = doc(dataBase, "Tickets", id);
    try {
      await updateDoc(ticketRef,{
      completed: false
    })
    } catch (error) {
      console.log(error)
    }
  }
  const removeTicket = async() =>{
    const ticketRef = doc(dataBase, "Tickets", id);
    try {
      await deleteDoc(ticketRef)
    } catch (error) {
      console.log(error)
    }
  }
  const buttonsFeatures = [
    {type: 'primary', color: 'primary', handleClick: updateStatusTrue, text: 'Marcar como Listo'},
    {type: 'danger', color: 'danger', handleClick: updateStatusFalse, text: 'Marcar como no realizado'},
    {type: 'Outlined', color: 'danger', handleClick: removeTicket, text: 'Eliminar ticket'}
  ]
  const Buttons = buttonsFeatures.map(button =>
    <Col span={{xs:'24', sm:'24'}}><Button type={button.type}  style={{margin: '5px'}} onClick={button.handleClick}>{button.text}</Button></Col>
    )
    const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  },[])
  return (
    <div>
      {loading ? <Skeleton active paragraph={{rows: 10}}/> : <Descriptions title={`Requerimiento`} bordered column={{xs: 1, sm: 1, md: 1, lg:2}} size='small'>
        {DescriptionItems}
      </Descriptions>
      }
      <Row justify="center" gutter={10}>
        {loading ? <Skeleton active paragraph={{rows: 2}}/> : Buttons}
      </Row>
    </div>
    )
} 