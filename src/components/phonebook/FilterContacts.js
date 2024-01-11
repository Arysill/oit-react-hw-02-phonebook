import { LabelContacts, ContactsWrapper, Search } from './ContactForm.styled';

export const Filter = ({ value, changeFilter }) => {
  return (
    <ContactsWrapper>
      <LabelContacts>
        Find contacts by name
        <Search
          type="text"
          name="filter"
          value={value}
          onChange={changeFilter}
        />
      </LabelContacts>
    </ContactsWrapper>
  );
};
