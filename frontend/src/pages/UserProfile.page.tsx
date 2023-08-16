import { 
    Box,
    Flex,
    Grid,
    GridItem,
    useColorModeValue,
    Text,
    Button
  } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import Layout from '../layout/Layout';

import logo from '../../../logos/tradespace-lettermark-white-navbar.png';

interface UserProfileProps {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    gender: string; 
}

const UserProfile = () => {
const [isLoading, setIsLoading] = useState(false);
const [userInfo, setUserInfo] = useState<UserProfileProps>();

// fetch the user's information from the backend
useEffect(() => {
    async function getUserInfo(){
        setIsLoading(true);
        // fetch and set to the user
        const user = {
            name: "John Doe",
            email: "johndoe@gmail.com",
            phone: "123-456-7890",
            birthDate: "01/01/2000",
            gender: "Male",
        }
        setUserInfo(user);
        setIsLoading(false);
    }
    getUserInfo();
}, []);

return(
   <Layout title="Hello" loading={isLoading}>
        <Flex
          minW={"85vw"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("teal.50", "gray.800")}
          border={"4px"}
          borderColor={useColorModeValue("blue.100", "blue.700")}
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
                    left="12%"
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
                    <Box
                        position="absolute"
                        bottom="20px" // Adjust this value to position the circle
                        right="15px" // Adjust this value to position the circle
                        width="20px" // Adjust this value to control the circle size
                        height="20px" // Adjust this value to control the circle size
                        borderRadius="50%"
                        bg="green.600"
                        />
                </Box>
            </Box>
        </Flex>

        <Grid templateColumns='repeat(5, 1fr)' gap={4}>
            {/* center the elements in grid item */}
            <GridItem colSpan={2} 
                      bg={useColorModeValue("red.100", "gray.800")} 
                      textAlign="center" 
                      pb={"5%"}
            >
                    <Text as="h2" 
                          fontSize="xl" 
                          mt={"100px"}
                          mb={"20px"}
                    >
                        <Text as="span" fontWeight="bold">Name:</Text> {userInfo?.name}
                        <br />
                        <Text as="span" fontWeight="bold">Email:</Text> {userInfo?.email}
                        <br />
                        <Text as="span" fontWeight="bold">Phone:</Text> {userInfo?.phone}
                        <br />
                        <Text as="span" fontWeight="bold">Birth-Date:</Text> {userInfo?.birthDate}
                        <br />
                        <Text as="span" fontWeight="bold">Gender:</Text> {userInfo?.gender}
                    </Text>
                    <Button
                        as={Link}
                        to="/profile/update"
                        variant="outline"
                        colorScheme={"green"}
                        size={"sm"}
                        color={useColorModeValue("black", "white")}
                        _hover={{ 
                        color: useColorModeValue("black", "white"),
                        bg: "teal.500"
                        }}
                    >
                        Update Profile
                    </Button>
            </GridItem>
        </Grid>
   </Layout>
);
}

export default UserProfile;

