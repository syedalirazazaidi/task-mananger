import {
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  HStack,
  Text,
  Box,
  Divider,
  Tooltip,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import GetAllTodos from './getTodos'
const Todo = () => {
  const [text, setInput] = React.useState('')
  const [textArray, setTextArray] = useState([])
  const _Id = uuid()
  const handleInputChange = (e) => setInput(e.target.value)
  const dbInstance = collection(db, 'todos')
  const handleSubmit = (e) => {
    e.preventDefault()
    addDoc(dbInstance, {
      text,
      _Id,
    }).then(() => {
      setInput('')
    })
  }

  return (
    <Box>
      <Heading py="10px" textAlign="center">
        Todo App
      </Heading>
      <Divider></Divider>
      <Text py="10px">Wellcome ali</Text>
      <form onSubmit={handleSubmit}>
        <HStack spacing={[-1, 4, 4]}>
          <FormControl>
            <Input
              value={text}
              onChange={handleInputChange}
              type="text"
              w={['220px', '590px', '590px']}
              py="10px"
              border="none"
              bg="#EDEDED"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            py="10px"
            border="none"
            px="15px"
          >
            Add Todo
          </Button>
        </HStack>
      </form>

      <GetAllTodos setTextArray={setTextArray} textArray={textArray} />
    </Box>
  )
}

export default Todo
