import { Row, Col, Avatar, Typography } from "antd";

const {Paragraph, Text} = Typography

export default function TicketInfo(props){
  const {technician, req, subject, date, completed} = props
  return(
    <Row align="middle">
      
      <Col>
        <Avatar size={64} style={{backgroundColor: (completed ? 'green' : 'red' ),fontWeight:'bold'}}> DC </Avatar>
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