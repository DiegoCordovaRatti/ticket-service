import { Tabs, } from "antd";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { ticketsCollection } from "../database/authentication";
import TicketDescription from './TicketDescription.jsx';
import TicketInfo from './TicketInfo';


export default function ActiveTickets() {
  const [ticketsArray, setTicketsArray] = useState([])
  
  useEffect(
    () =>
    onSnapshot(ticketsCollection, (ticketsSnapshot) =>{
      setTicketsArray(
        ticketsSnapshot.docs.map((ticket) => ticket.data()) //el estado es actualizado con los tickets de Cloud Firebase
      )
    }
    ), [] // No retorna eternamente el arreglo (component didMounted & unMounted)
  );
  
  const tabsItems = ticketsArray.map((ticket, index) => {
    return {
      label: <TicketInfo 
        technician={ticket.techDepartment[1]} 
        req={ticket.reqType} 
        subject={ticket.subject} 
        date={ticket.assignedDate + ', '+ ticket.assignedTime}
        completed={ticket.completed}
      />,
      key: index+1,
      children: <TicketDescription ticket={ticket}/>
    }
  })
  
  return (
    <div>
      <Tabs style={{height: '70vh'}} tabPosition="left" items={tabsItems} />
    </div>
  )
}