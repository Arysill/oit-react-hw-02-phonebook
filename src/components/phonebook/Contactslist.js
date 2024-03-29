import { ItemButton, List, ListItem, Topic } from './ContactForm.styled';

export const ContactsList = ({ filter, onDeleteContact }) => {
  return (
    <div>
      <List>
        {filter.map(contact => (
          <ListItem key={contact.id}>
            <Topic>
              {contact.name} : {contact.number}
            </Topic>
            <ItemButton
              type="button"
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete
            </ItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
