import { Descriptions, Typography, Button } from "antd";

const { Text } = Typography

export default function TicketDescription(props) {

  return (
    <div>
      <Descriptions title={`Requerimiento #${props.IdNumber}`} bordered column={{xs: 1, sm: 1, md: 1, lg:2}} size='small'>
        <Descriptions.Item label={<Text strong>Creado por:</Text>}>Call Center <br />Diego </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Creación:</Text>}>2019-04-24 <br/> 18:00:00</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Cliente:</Text>}>Francisca Galaz</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Tipo de requerimiento</Text>}>Problemas tecnicos</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Dirección & departamento</Text>} >Santa Elena 1631, 1814
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Región / Comuna:</Text>}>Santiago | Santiago Centro</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Fecha y hora agendada</Text>}>2019-04-28 <br/>12:00 PM</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Departamento Tecnico</Text>}>Equipo de telecomunicaciones
        </Descriptions.Item>
        <Descriptions.Item label={<Text strong>Técnico Asignado</Text>}>John Doe</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Asunto</Text>} span={2}>Reparacion de modem</Descriptions.Item>
        <Descriptions.Item label={<Text strong>Detalles</Text>} span={2}>Durante la noche del sabado, el modem estallo
          en llamas</Descriptions.Item>
      </Descriptions>
      <Button type="primary" style={{marginRight: '5px'}}>Marcar como Listo</Button>
      <Button type="danger" style={{marginLeft: '5px'}}>Marcar como no realizado</Button>
    </div>
    )
}