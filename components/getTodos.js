import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore'
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
  Button,
} from '@chakra-ui/react'

const GetAllTodos = ({ setTextArray, textArray, handleEdit }) => {
  // useEffect(() => {
  //   db.collection('todos')
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot((snapshot) => {
  //       setTextArray(snapshot.docs.map((doc) => console.log(doc)))
  //     })
  // }, [])
  useEffect(() => {
    getNotes()
  }, [textArray])

  const getNotes = async () => {
    const gettodos = collection(db, 'todos')
    const todoSnapshot = await getDocs(gettodos)

    setTextArray(
      todoSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt,
        }
      }),
    )
  }

  //DELETE FUNCTION
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  // EDIT FUNCTION

  if (!textArray.length) {
    return <p>{`there are ${textArray.length} todos`}</p>
  }

  return (
    <Box>
      <p>{`there are ${textArray.length} todos`}</p>
      {textArray &&
        textArray.map((text) => (
          <HStack spacing={40} key={text.id}>
            <Text
              w="270px"
              my={3}
              mx={['36px', '10px', '32px']}
              textAlign={['center', 'left', 'left']}
              ml={['92px', '40px', '40px']}
            >
              {text.text}
            </Text>
            <Box display="flex" mt="4px" alignItems="center">
              <Tooltip label="delete" placement="bottom">
                <DeleteIcon
                  _hover={{ color: 'red.300', cursor: 'pointer' }}
                  marginLeft="20px"
                  w={6}
                  h={6}
                  color="grey"
                  mx="10px"
                  onClick={() => handleDelete(text.id)}
                />
              </Tooltip>
              <Tooltip label="Edit" placement="bottom">
                <EditIcon
                  _hover={{ color: 'green.400', cursor: 'pointer' }}
                  w={6}
                  h={6}
                  color="grey"
                  mx="10px"
                  onClick={() => handleEdit(text)}
                />
              </Tooltip>
            </Box>
          </HStack>
        ))}
    </Box>
  )
}
export default GetAllTodos
