import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import NavbarAdmin from '../components/NavbarAdmin'
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'
import { UserContext } from '../context/userContext'
import {io} from 'socket.io-client'

// initial variable outside socket
let socket
export default function ComplainAdmin() {
    // const [contact, setContact] = useState(null)
    // const [contacts, setContacts] = useState([])
    // const [state] = useContext(UserContext)
    // const [messages, setMessages] = useState([])

    // const title = "Complains"
    // document.title = 'DumbMerch | ' + title
    
   
    // useEffect(() =>{
    //     socket = io('http://localhost:5005', {
    //         auth: {
    //             token: localStorage.getItem('token')
    //         },
    //     })
    //     // define listener for every updated message
    //     socket.on("new message", () => {
    //         console.log("contact", contact)
    //         socket.emit("load messages", contact?.id)
    //     })

    //     loadContacts()
    //     loadMessages()
        

    //     socket.on('connect_error', (err) => {
    //         console.error(err.message);
    //       });

    //     return () => {
    //         socket.disconnect()
    //     }
    // }, [messages])

    // const loadContacts = () => {
    //     socket.emit("load customer contacts")
    //     socket.on("customer contacts", (data) => {
    //         // filter just customers which have sent a message
    //         let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            
    //         // manipulate customers to add message property with the newest message
    //         dataContacts = dataContacts.map((item) => ({
    //             ...item,
    //             message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length -1].message : "Click here to start message"
    //         // let dataContacts = data.map((item) => ({
    //         //     ...item,
    //         //     message: 'Click here to start message',
    //           }));
    //       setContacts(dataContacts);
    //     })
    // }

    // // used for active style when click contact
    // const onClickContact = (data) => {
    //     setContact(data)
    //     // emit event load messages
    //     socket.emit("load messages", data.id)
    // }

    // const loadMessages = (value) => {
    //     // define listener on event "messages"
    //     socket.on("messages", (data) => {
    //         // get data messages
    //         if (data.length > 0) {
    //             const dataMessages = data.map((item) => ({
    //                 idSender: item.sender.id,
    //                 message: item.message,
    //             }))
    //             setMessages([dataMessages])
    //         } else {
    //             setMessages([]);
    //           }
    //         // loadContacts()
    //         // const chatMessagesElm = document.getElementById("chat-messages");
    //         // chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight;
    //     })
    // }

    // const onSendMessage = (e) => {
    //     // listen only enter key event press
    //     if(e.key === 'Enter') {
    //         const data = {
    //             idRecipient: contact.id,
    //             message: e.target.value
    //         }

    //         //emit event send message
    //         socket.emit("send message", data)
    //         e.target.value = ""
    //     }
    // }

    // const [contact, setContact] = useState(null)
    // const [contacts, setContacts] = useState([])
    // // create messages state
    // const [messages, setMessages] = useState([])

    // const title = "Complain admin"
    // document.title = 'DumbMerch | ' + title

    // // consume user context
    // const [state] = useContext(UserContext)

    // useEffect(() =>{
    //     socket = io('http://localhost:5005', {
    //         auth: {
    //             token: localStorage.getItem('token')
    //         },
    //         // query: {
    //         //     id: state.user.id
    //         // }
    //     })

    //     // define listener for every updated message
    //     socket.on("new message", () => {
    //         console.log("contact", contact)
    //         socket.emit("load messages", contact?.id)
    //     })

    //     loadContacts()
    //     loadMessages()

    //     return () => {
    //         socket.disconnect()
    //     }
    // }, [messages])

    // const loadContacts = () => {
    //     socket.emit("load customer contacts")
    //     socket.on("customer contacts", (data) => {
    //         // filter just customers which have sent a message
    //         let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            
    //         // manipulate customers to add message property with the newest message
    //         dataContacts = dataContacts.map((item) => ({
    //             ...item,
    //             message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length -1].message : "Click here to start message"
    //         }))
    //         setContacts(dataContacts)
    //     })
    // }

    // // used for active style when click contact
    // const onClickContact = (data) => {
    //     setContact(data)
    //     // emit event load messages
    //     socket.emit("load messages", data.id)
    // }

    // const loadMessages = (value) => {
    //     // define listener on event "messages"
    //     socket.on("messages", (data) => {
    //         // get data messages
    //         if (data.length > 0) {
    //             const dataMessages = data.map((item) => ({
    //                 idSender: item.sender.id,
    //                 message: item.message,
    //             }))
    //             setMessages(dataMessages)
    //         }
    //         loadContacts()
    //         const chatMessagesElm = document.getElementById("chat-messages");
    //         chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight;
    //     })
    // }

    // const onSendMessage = (e) => {
    //     // listen only enter key event press
    //     if(e.key === 'Enter') {
    //         const data = {
    //             idRecipient: contact.id,
    //             message: e.target.value
    //         }

    //         //emit event send message
    //         socket.emit("send message", data)
    //         e.target.value = ""
    //     }
    // }

    let title = 'Complain Page'
    document.title = 'Dumbmerch | ' + title

    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [state] = useContext(UserContext);


    useEffect(() => {
            socket = io(process.env.reactserver||'http://localhost:5005/', {
                auth: {
                    token: localStorage.getItem('token'),
                },
            });
        
        socket.on('new message', () => {
            socket.emit('load messages', contact?.id);
          });

        loadContact();
        loadMessages();


        socket.on('connect_error', (err) => {
            console.error(err.message);
          });

        return () => {
            socket.disconnect();
        };
    }, [messages])

    const loadContact = () => {
        socket.emit('load customer contact');
    
        socket.on('customer contact', (data) => {
            let dataContacts = data.map((item) => ({
                ...item,
                message: 'Click here to start message',
              }));
          setContacts(dataContacts);
        });
      };
    
      const onClickContact = (data) => {
        setContact(data);
        socket.emit('load messages', data.id);
      };

      const loadMessages = () => {
        socket.on('messages', (data) => {
            console.log(data)
          if (data.length > 0) {
            const dataMessages = data.map((item) => ({
              idSender: item.sender.id,
              message: item.message,
            }));
            console.log(dataMessages);
            setMessages(dataMessages);
          } else {
            setMessages([]);
          }
        });
      };
    
      const onSendMessage = (e) => {
        if (e.key === 'Enter') {
          const data = {
            idRecipient: contact.id,
            message: e.target.value,
          };
    
          socket.emit('send message', data);
          e.target.value = '';
        }
      };

    return (
        <>
            <NavbarAdmin title={title} />
            <Container fluid style={{height: '89.5vh'}}>
                <Row>
                    <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={{maxHeight: '89.5vh'}} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
