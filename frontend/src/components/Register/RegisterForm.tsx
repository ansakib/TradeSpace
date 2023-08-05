// @ts-nocheck

'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import React from 'react'

import { Radio, RadioGroup } from '@chakra-ui/react'

import { Step1 } from './RegisterStep1Components'

const RegisterForm = ({ header, formContent }) => {
  return (
    <Flex
      minW={'85vw'}

      align={'center'}
      justify={'center'}
      
      bg={useColorModeValue('teal.50', 'gray.800')}>
      <Stack 
        spacing={8} 
        mx={'auto'} 
        maxW={'lg'} 
        py={12} 
        px={6} 
        minW={'35vw'}
        minH={'100vh'}
      >
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{header}</Heading>
          <Text fontSize={'lg'}>
            Stay with <Text as="span" color={'blue.400'}>TradeSpace</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            {formContent}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default RegisterForm;