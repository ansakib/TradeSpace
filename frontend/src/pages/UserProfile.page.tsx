import { 
    Box,
    Flex,
    useColorModeValue
  } from '@chakra-ui/react';

import { useState } from 'react';

import Layout from '../layout/Layout';

import logo from '../../../logos/tradespace-lettermark-white-navbar.png';

const UserProfile = () => {
const [isLoading, setIsLoading] = useState(false);

return(
   <Layout title="Hello" loading={isLoading}>
        <Flex
          minW={"85vw"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("teal.50", "gray.800")}
        >
            <Box position="relative" 
                 width="80%" 
                 height="300px" 
                 borderRadius="lg" 
            >
            {/* Cover Image */}
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage={logo}
                backgroundSize="contain"
                backgroundPosition="center" 
                backgroundRepeat={"no-repeat"}
                opacity="0.8"
            />
            {/* Profile Image */}
            <Box
                position="absolute"
                bottom="-30%"
                left="0%"
                transform="translateX(-50%)"
                borderRadius="full"
                borderWidth="4px"
                borderColor="white"
                bg="white"
            >
                <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="Profile"
                width="200px"
                height="200px"
                style={{ borderRadius: "50%", objectFit: "cover" }}
                />
            </Box>
        </Box>
        </Flex>
   </Layout>
);
}

export default UserProfile;

