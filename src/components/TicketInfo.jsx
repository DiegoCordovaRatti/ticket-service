import { Row, Col, Avatar, Typography } from "antd";

const {Paragraph, Text} = Typography

export default function TicketInfo(props){
  const {technician, req, subject, date} = props
  return(
    <Row align="middle">
      {/* Avatar centro-izquierda todo el height: DC
      3 lineas de Paragrapho: Encargado, Asunto, Fecha agendada
      */}
      <Col>
        <Avatar size={64} style={{backgroundColor: 'green',fontWeight:'bold'}}> DC </Avatar>
      </Col>
      <Col>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Encargado:</Text> {technician} </Paragraph>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Requerimiento:</Text> {req} </Paragraph>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Asunto:</Text> {subject} </Paragraph>
        <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>Fecha:</Text> {date} </Paragraph>
      </Col>
    </Row>
  )
}