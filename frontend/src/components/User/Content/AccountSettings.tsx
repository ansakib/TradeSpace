import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { userProfileType, userService } from "../../../services/User.service";
import { useEffect, useState } from "react";

function ProfileInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<userProfileType>();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const userInfo = await userService.getUserInfo();
      setUserInfo(userInfo);
      console.log(userInfo);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const textColor = "teal";
  return (
    <Card p="1rem" my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          Profile Information
        </Text>
      </CardHeader>
      <CardBody p="0px 5px">
        <Flex direction="column">
          <Text fontSize="md" color="gray.500" fontWeight="400" mb="30px">
            Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the answer
            is no. If two equally difficult paths, choose the one more painful
            in the short term (pain avoidance is creating an illusion of
            equality).
          </Text>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Full Name:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              Esthera Jackson
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Mobile:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              (44) 123 1234 123
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Email:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              esthera@simmmple.com
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Location:{" "}
            </Text>
            <Text fontSize="md" color="gray.500" fontWeight="400">
              United States
            </Text>
          </Flex>
          <Flex alignItems="center" mb="18px">
            <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
              Social Media:{" "}
            </Text>
            <Flex>
              <Link
                href="#"
                color="teal.300"
                fontSize="lg"
                me="10px"
                _hover={{ color: "teal.300" }}
              >
                <Icon as={FaFacebook} />
              </Link>
              <Link
                href="#"
                color="teal.300"
                fontSize="lg"
                me="10px"
                _hover={{ color: "teal.300" }}
              >
                <Icon as={FaInstagram} />
              </Link>
              <Link
                href="#"
                color="teal.300"
                fontSize="lg"
                me="10px"
                _hover={{ color: "teal.300" }}
              >
                <Icon as={FaTwitter} />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default ProfileInfo;
