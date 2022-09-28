import { Card, Row, Col } from 'antd';
const { Meta } = Card;


export default function Home(){
  
  const cardFeatures = [
    {alt: 'problemas-tecnologicos', src: 'https://img.freepik.com/free-vector/stress-concept-illustration_114360-2031.jpg?w=740&t=st=1664247948~exp=1664248548~hmac=3e59946fed2867aaa59f1f23cfede9f190db6b0ed0c0d1d9264ac8c822a9a35d', title: 'Ayuda a tus Clientes', description: 'Con ServiceTickets agiliza los procesos tediosos de tus clientes de manera óptima'},
    {alt: 'atender-al-cliente', src: 'https://img.freepik.com/free-vector/back-back-concept-illustration_114360-5999.jpg?w=740&t=st=1664248809~exp=1664249409~hmac=c685f798fc70904f3ea4b723f144ef9ead49120b662b42fdb61fddd0eeaae89a', title: 'Recibe, designa y agiliza', description: 'Recibe las solicitudes de tus clientes y derívalos al departamento pertinente rápidamente.'},
    {alt: 'analizar-datos', src: 'https://img.freepik.com/free-vector/site-stats-concept-illustration_114360-1434.jpg?w=740&t=st=1664248273~exp=1664248873~hmac=eb9ef7a456e29d0f05e025867280762250b7bf2f0bbe259e5c089837239332ad', title: 'Actuliza velozmente', description: 'Todos los procesos en una simple plataforma. Revisa, actualiza y elimina los requerimientos cumplidos.'},
  ]
  const Cards = cardFeatures.map(card => 
    <Col>
      <Card hoverable style={{width: 240,}} cover={<img style={{objectFit: 'cover', heigth: '200px'}} alt={card.alt} src={card.src} />}>
        <Meta title={card.title} description={card.description} />
      </Card>
    </Col>
    )
  return(
    <div>
      <Row justify='center'>
        {Cards}
      </Row>
    </div>
  )
}