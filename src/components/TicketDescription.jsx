import { Descriptions, Typography, Button } from "antd";
import { doc, updateDoc } from "firebase/firestore";
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
  const DescriptionItems = descriptionFields.map(item => 
  <Descriptions.Item label={item.label} span={item.span}>{ item.description }</Descriptions.Item>)

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
  return (
    <div>
      <Descriptions title={`Requerimiento`} bordered column={{xs: 1, sm: 1, md: 1, lg:2}} size='small'>
        {DescriptionItems}
      </Descriptions>
      <Button type="primary" style={{marginRight: '5px'}} onClick={updateStatusTrue}>Marcar como Listo</Button>
      <Button type="danger" style={{marginLeft: '5px'}} onClick={updateStatusFalse}>Marcar como no realizado</Button>
    </div>
    )
} 