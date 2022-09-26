import { Tabs, Empty, Button } from "antd";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { ticketsCollection } from "../database/authentication";
import TicketDescription from './TicketDescription.jsx';
import TicketInfo from './TicketInfo';


export default function ActiveTickets() {
  const Id = 123456

  const [ticketsArray, setTicketsArray] = useState([])
  useEffect(
    () =>
    onSnapshot(ticketsCollection, (ticketsSnapshot) =>
      setTicketsArray(
        ticketsSnapshot.docs.map((ticket) => ticket.data())
      )
    ), []
  );
  // address
  // assignedDate
  // assignedTime
  // clientName
  // createdBy
  // createdOn
  // flatNumber
  // regionComune
  // reqType
  // subject
  // subjectDetails
  // techDepartment



  const tabsItems = ticketsArray.map((ticket, index) => {
    return {
      label: <TicketInfo 
        technician={ticket.techDepartment[1]} 
        req={ticket.reqType} 
        subject={ticket.subject} 
        date={ticket.assignedDate + ', '+ ticket.assignedTime}
      />,
      key: index+1,
      children: <TicketDescription ticket={ticket}/>
    }
  })
  console.log(tabsItems)
  
  return (
    <div>
          <Tabs style={{height: '70vh'}} tabPosition="left" items={tabsItems}>
            
          </Tabs>
        {/* <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" 
          imageStyle={{height: 60}} description={ 'No hay ninguna entrada' }>
          <Button type="primary">Crear un nuevo ticket</Button>
        </Empty> */}
    </div>
  )
}