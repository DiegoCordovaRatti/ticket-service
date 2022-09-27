import { Tabs, Breadcrumb } from "antd";
import { useState, useEffect } from "react";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { ticketsCollection, auth, dataBase } from "../database/authentication";
import TicketDescription from './TicketDescription.jsx';
import TicketInfo from './TicketInfo';


export default function ActiveTickets() {
  const [CurrentUser, setCurrrentUser] = useState({
    area: '',
    user: ''
  });
  useEffect(() => {
    const current = auth.currentUser.email
    const userDocs = async() =>{
      const current = auth.currentUser.email
      const userRef = doc(dataBase, 'Users', current)
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setCurrrentUser (userSnap.data())
      }
    }
    if (current != null) {
      userDocs()
    }
  }, []);

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
      <Breadcrumb style={{margin: '16px 0',}}>
        <Breadcrumb.Item>{CurrentUser.area}</Breadcrumb.Item>
        <Breadcrumb.Item>{CurrentUser.user}</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs style={{minHeight: '70vh'}} tabPosition="left" items={tabsItems} />
    </div>
  )
}