import { Row, Col, Avatar, Typography } from "antd";

const {Paragraph, Text} = Typography

export default function TicketInfo(){
  return(
    <Row align="middle">
      {/* Avatar centro-izquierda todo el height: DC
      3 lineas de Paragrapho: Encargado, Asunto, Fecha agendada
      */}
      <Col>
        <Avatar size={64} style={{backgroundColor: 'green',fontWeight:'bold'}}> DC </Avatar>
      </Col>
      <Col>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Encargado:</Text> John Doe</Paragraph>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Requerimiento:</Text> Problemas Tecnicos</Paragraph>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Asunto:</Text> Reparacion modem</Paragraph>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Fecha:</Text> 2019-04-28 | 12:00 PM</Paragraph>
      </Col>
    </Row>
  )
}