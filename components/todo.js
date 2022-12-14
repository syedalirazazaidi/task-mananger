import {
  FormControl,
  Heading,
  Input,
  Button,
  HStack,
  Box,
  Divider,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'

import GetAllTodos from './getTodos'
const Todo = () => {
  const dbInstance = collection(db, 'todos')
  const [text, setInput] = React.useState('')
  const [newId, setNewID] = React.useState(1)
  const [textArray, setTextArray] = useState([])
  const handleInputChange = (e) => setInput(e.target.value)
  const handleEdit = async (task) => {
    const { id, createdAt, text } = task

    setInput(text)
    setNewID(id)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (newId === 1) {
      addDoc(dbInstance, {
        text,
        createdAt: new Date().toISOString(),
      }).then(() => {
        setInput('')
      })
    } else {
      updateDoc(doc(db, 'todos', newId), { text })
      setInput('')
    }
  }

  return (
    <Box>
      <Heading
        py={['40px', '10px', '10px']}
        textAlign={['center', 'center', 'center']}
        ml={['72px', '10px', '10px']}
      >
        Todo App
      </Heading>
      <Divider></Divider>
      <form onSubmit={handleSubmit}>
        <HStack>
          <FormControl isRequired>
            <Input
              value={text}
              onChange={handleInputChange}
              type="text"
              w={['320px', '590px', '590px']}
              py="10px"
              ml={['172px', '10px', '10px']}
              border="none"
              bg="#EDEDED"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            py="10px"
            border="none"
            px={['48px', '15px', '15px']}
          >
            Add Todo
          </Button>
        </HStack>
      </form>

      <GetAllTodos
        handleEdit={handleEdit}
        setTextArray={setTextArray}
        textArray={textArray}
      />
    </Box>
  )
}

export default Todo
