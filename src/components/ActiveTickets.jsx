import { Tabs, Empty, Button } from "antd";
import TicketDescription from './TicketDescription.jsx';
import TicketInfo from './TicketInfo';


export default function ActiveTickets() {
  const Id = 123456
  return (
    <div>
          <Tabs style={{height: '70vh'}} tabPosition="left" items={[
            {
              label: <TicketInfo />,
              key: '1',
              children: <TicketDescription IdNumber='123456'/>
            },
            {
              label: <TicketInfo />,
              key: '2',
              children: <TicketDescription IdNumber='987655'/>
            },
            {
              label: <TicketInfo />,
              key: '3',
              children: <TicketDescription IdNumber='123456'/>
            },
            {
              label: <TicketInfo />,
              key: '4',
              children: <TicketDescription IdNumber='987655'/>
            },
            {
              label: <TicketInfo />,
              key: '5',
              children: <TicketDescription IdNumber='123456'/>
            },
            {
              label: <TicketInfo />,
              key: '6',
              children: <TicketDescription IdNumber='987655'/>
            },
          ]}>
            
          </Tabs>
        {/* <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" 
          imageStyle={{height: 60}} description={ 'No hay ninguna entrada' }>
          <Button type="primary">Crear un nuevo ticket</Button>
        </Empty> */}
    </div>
  )
}