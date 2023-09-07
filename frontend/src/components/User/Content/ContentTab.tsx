import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import ProfileInfo from "./AccountSettings";
import { userProfileType } from "../../../services/User.service";
import { FunctionComponent } from "react";
import UserAdsList from "./UserAds";

const Content = () => {
  const tabs = ["Profile", "Active Ads", "Pending Ads", "Declined Ads"];
  // console.log(userinfo);

  return (
    <Box
      as="main"
      flex={3}
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      // style={{ transform: "translateY(-100px)" }}
    >
      <Tabs isFitted variant="soft-rounded" colorScheme="teal">
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={3}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              // _selected={{ color: "brand.dark", borderColor: "brand.blue" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <ProfileInfo />
          </TabPanel>
          <TabPanel>
            <UserAdsList />
          </TabPanel>
          <TabPanel>
            <PendingAdsList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Content;
