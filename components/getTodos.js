import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Tooltip,
  Text,
  VStack,
  Stack,
  Container,
  HStack,
} from '@chakra-ui/react'

const GetAllTodos = ({ setTextArray, textArray }) => {
  const deleteTodo = (id) => {
    console.log(id, 'ID')
    // const collectionById = collection(db, 'todos', id)
    // console.log(collectionById)

    // deleteDoc(collectionById).then(() => {
    //   window.location.reload()
    // })
  }
  const getNotes = async () => {
    const gettodos = collection(db, 'todos')
    const todoSnapshot = await getDocs(gettodos)
    const todoList = todoSnapshot.docs.map((doc) => doc.data())
    console.log(todoList)
    return setTextArray(todoList)
  }
  useEffect(() => {
    getNotes()
  }, [])

  if (!textArray.length) {
    return <p>Loading...</p>
  }
  return (
    <Box>
      {textArray.map((text) => (
        <HStack spacing={140}>
          <Text w="270px" my={3} mx={10} textAlign="left" ml="40px">
            {text.text}
          </Text>
          <Box>
            <Tooltip label="delete" placement="bottom">
              <DeleteIcon
                _hover={{ color: 'red.300', cursor: 'pointer' }}
                marginLeft="20px"
                w={6}
                h={6}
                color="grey"
                mx="10px"
                onClick={deleteTodo(text._Id)}
              />
            </Tooltip>
            <Tooltip label="Edit" placement="bottom">
              <EditIcon
                _hover={{ color: 'green.400', cursor: 'pointer' }}
                w={6}
                h={6}
                color="grey"
                mx="10px"
              />
            </Tooltip>
          </Box>
        </HStack>
      ))}
    </Box>
  )
}
export default GetAllTodos
