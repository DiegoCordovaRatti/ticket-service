import { Descriptions, Typography, Button } from "antd";

const { Text } = Typography

export default function TicketDescription(props) {
  const {address, assignedDate, assignedTime, clientName, createdBy, createdOn, 
    flatNumber, regionComune, reqType, subject, subjectDetails, techDepartment } = props.ticket
    
  return (
    <div>
      <Descriptions title={`Requerimiento`} bordered column={{xs: 1, sm: 1, md: 1, lg:2}} size='small'>
        <Descriptions.Item label={<Text strong>Creado por:</Text>}>{ createdBy } </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Creación:</Text>}>{ createdOn }</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Cliente:</Text>}>{ clientName }</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Tipo de requerimiento</Text>}>{ reqType }</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Dirección & departamento</Text>} >{ address } { flatNumber === '' ? flatNumber : `, ${flatNumber}`}
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Región / Comuna:</Text>}>{ regionComune[0] } | {regionComune[1]}</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Fecha y hora agendada</Text>}>{ assignedDate } <br/>{assignedTime}</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Departamento Tecnico</Text>}>{ techDepartment[0] }
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Técnico Asignado</Text>}>{ techDepartment[1] }</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Asunto</Text>} span={2}>{ subject }</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Detalles</Text>} span={2}>{ subjectDetails }Durante la noche del sabado, el modem estallo
          en llamas</Descriptions.Item>
      </Descriptions>
      <Button type="primary" style={{marginRight: '5px'}}>Marcar como Listo</Button>
      <Button type="danger" style={{marginLeft: '5px'}}>Marcar como no realizado</Button>
    </div>
    )
}