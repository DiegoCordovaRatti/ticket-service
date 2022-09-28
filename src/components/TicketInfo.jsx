import { ExclamationCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import { Row, Col, Avatar, Typography, Skeleton } from "antd";
import { useState, useEffect } from "react";

const {Paragraph, Text} = Typography

export default function TicketInfo(props){
  const {technician, req, subject, date, completed} = props
  const ticketInfoFields = [
    {label: 'Encargado', text: technician}, {label: 'Requerimiento', text: req}, {label: 'Asunto', text: subject}, {label: 'Fecha', text: date},
  ]
  const paragraphs = ticketInfoFields.map(info =>
    <Paragraph style={{margin: '0 5px', fontSize: '12px'}}><Text strong>{info.label}:</Text> {info.text} </Paragraph>
  )
  const icons = completed ? <CheckCircleTwoTone twoToneColor='#45d330' style={{fontSize: '64px'}}/> : <ExclamationCircleTwoTone twoToneColor='#f80000' style={{fontSize: '64px'}}/>

  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  },[])
  
  return(
    <Row align="middle">
      {loading ? <Row><Skeleton active paragraph={{rows: 3, width:300}} /></Row> : <Col><Avatar size={64} icon={icons} /></Col>}
      {loading ? null : <Col>{paragraphs}</Col>}
    </Row>
  )
}