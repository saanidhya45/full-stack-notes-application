import { useContext, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const ContextProvider = ({ children }) => {
  const InitialNotes = JSON.parse(localStorage.getItem('notes')) || [];
  const [Title, setTitle] = useState('title');
  const [Description, setDescription] = useState('lorem')
  const [Notes, setNotes] = useState(InitialNotes)
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Name, setName] = useState('')

  return (
    <UserContext.Provider value={{Title,setTitle, Description,setDescription, Notes, setNotes, Email, setEmail,Password, setPassword, Name, setName}}>
      {children}
    </UserContext.Provider>
  );
};