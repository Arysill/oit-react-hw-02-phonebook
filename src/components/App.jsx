import {Component} from "react";
import { nanoid } from 'nanoid'
import {  FormUser } from "./phonebook/ContactForm";
import { Filter } from "./phonebook/FilterContacts";
import { ContactsList } from "./phonebook/Contactslist";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GlobalStyle } from "./GlobalStyle";
import { Layout } from "./Layout";

const initialValue = {
  contacts: [    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
  name: '',
  number: '',
  filter: '',
}



export class App extends Component {
  state = { ...initialValue };
  


  handleSubmit = (values, { resetForm }) => { 

   const {contacts,name,number}  = values

    const isContactInPhoneBook = contacts.find((contact) => 
        contact.name === name && contact.number === number)

    
    if (isContactInPhoneBook) {
      Notify.failure(`${name} already exists.`)
      resetForm()
      return
    }

    console.log(values)
     const newContact = {
       name: values.name,
        number: values.number,
       id: nanoid(),
      
     }  

     this.setState(prevState => ({
       contacts: [...prevState.contacts, newContact],
       name: '',
      number: '',
     }))
     resetForm()
  }


  changeFilter = (e) => {
    this.setState({
      filter: e.currentTarget.value
    })
  }



  filteredContacts = () => {
    const { filter,contacts } = this.state
    const normalizedFilter = filter.toLowerCase()
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  }
  

  onDeleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  render() {
    const { filter } = this.state

    return (    
      <div>
        <Layout>

        <h1>Phone book</h1>

        <FormUser initialValue={ this.state} handleSubmit={this.handleSubmit}/>
       
         <h2>Contacts</h2>
        
        <Filter value={filter} changeFilter={this.changeFilter} onChange={this.changeFilter } />
  
        <ContactsList filter={this.filteredContacts()} onDeleteContact={this.onDeleteContact} />

        <GlobalStyle/>
   </Layout>
          
    </div>)
  };
};