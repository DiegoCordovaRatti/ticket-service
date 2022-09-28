import { Tabs, Breadcrumb } from "antd";
import { useState, useEffect } from "react";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { ticketsCollection, auth, dataBase } from "../database/authentication";
import TicketDescription from '../components/TicketDescription.jsx';
import TicketInfo from '../components/TicketInfo';


export default function ActiveTickets() {
  const [CurrentUser, setCurrrentUser] = useState({
    area: '',
    user: ''
  });
  useEffect(() => {
    if (auth.currentUser !== null) {
      const userDocs = async () => {
        const userRef = doc(dataBase, 'Users', auth.currentUser.email)
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrrentUser(userSnap.data())
        }
      }
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