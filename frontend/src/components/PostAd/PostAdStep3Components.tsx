"use client";

import { AddIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Checkbox,
  FormErrorMessage,
  Box,
  Flex,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
} from "@chakra-ui/react";

import { FunctionComponent, 
         useEffect, 
         useState 
} from "react";

import { MapContainer, 
         TileLayer, 
         Marker, 
         Popup, 
         useMapEvents
} from "react-leaflet";

// this particular import is important
// it is the only way to make leaflet work with react
// without it, the map will show up with different tiles popping up
// at different positions like there's no tomorrow
// Also a height is required for the map to show up
// I set the height at 500px in the PopoverContent 
import "leaflet/dist/leaflet.css"
import { LatLng } from "leaflet";


// This function is necessary for the map to show current location
function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  useEffect(() => {
    map.locate();
  }, []);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}




interface Step3Props {
  onPrev: () => void;
  onNext: () => void;
  images: string[];
  is_phone_public: boolean;
  address?: string;
  setImages: (images: string[]) => void;
  setIsPhonePublic: (is_phone_public: boolean) => void;
  setAddress: (address: string) => void;
}


const Step3: FunctionComponent<Step3Props> = ({
  onPrev,
  onNext,
  images,
  is_phone_public,
  address,
  setImages,
  setIsPhonePublic,
  setAddress,
}) => {

  // Map related states
  const position = { lat: 23.7266, lng: 90.3927 }
  const [showMap, setShowMap] = useState(false);
  const [mapKey, setMapKey] = useState(0);


  // map related functions
  const handleShowMap = () => {
    setShowMap(true);
    // set a random number as key to force re-render
    setMapKey(Math.random());
  };







  // declaration of error states
  const [addressError, setAddressError] = useState<boolean>(false)



  // declaration of touched states and action
  const [addressTouched, setAddressTouched] = useState<boolean>(false)
  const handleAddressTouched = () => {
    setAddressTouched(true)
  }




  // change events definition
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.value.split(","))
  }

  const handleIs_phone_publicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhonePublic(e.target.checked)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }





  // error checking hooks for constant supervision
  useEffect(() => {
    if (addressTouched && (address == undefined || address.length < 5 || address.length > 50)) {
      setAddressError(true)
    } else {
      setAddressError(false)
    }
  }, [address, addressTouched])




  // validation function
  const isUserInputValid = () => {
    if (addressError || 
        address == undefined || 
        address.length < 5 || 
        address.length > 50
       ) 
      return false;

    return true;
  }

  const toast = useToast();


  const handleNextRequest = (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(isUserInputValid()){
      console.log(is_phone_public)
      console.log(address)
      console.log(images)
      onNext();
    }
    else {
      console.log("Invalid Inputs")
      toast({
        title: "Invalid Inputs",
        description: "Please check your inputs and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }


  return (
    <>
      <FormControl>

        <FormLabel>Upload images</FormLabel>

          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            style={{ display: "none" }}
            id="imageInput"
          />

          <label htmlFor="imageInput">
        
            <Input  as={Box}
                    display="flex" 
                    width="100px"
                    height="100px"
                    alignItems="center"
                    justifyContent="center"
                    border="1px dashed gray"
                    borderRadius="md"
                    cursor="pointer"
            >
              <AddIcon boxSize={8}/>
            </Input>
          </label>

        {/* why not <Input .../> here? */}
        {/* Well it's just ugly for file imput. */}
        {/* Such is frontend */}
        <FormHelperText>Upload upto 5 images</FormHelperText>
      </FormControl>

      <FormControl>
        <Checkbox isChecked={is_phone_public} onChange={handleIs_phone_publicChange}>
          Make my phone number public for this Ad
        </Checkbox>
      </FormControl>

      <FormControl isRequired isInvalid={addressError} onBlur={handleAddressTouched}>
        <FormLabel>Address</FormLabel>
        <Input type="text" placeholder="Address" value={address} onChange={handleAddressChange} />

        {/* map */}
        <br/>
        <br/>

        <Popover placement="bottom" closeOnBlur={false} isOpen={showMap} key={mapKey}> 
          <PopoverTrigger>
            <Button onClick={handleShowMap}>
              Show Map
            </Button>
          </PopoverTrigger>
          <PopoverContent style={{ width: '500px', height: '500px', overflow: 'hidden'}}>
            <PopoverArrow />
            <PopoverCloseButton onClick={() => setShowMap(false)}/>
            <PopoverHeader>Choose your address on map</PopoverHeader>
            <PopoverBody style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
            <div style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
              <MapContainer
                center={position}
                zoom={17}
                scrollWheelZoom={false}
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* <Marker position={position}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker> */}
                <LocationMarker />
              </MapContainer>
            </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {addressError && 
        <FormErrorMessage>Address should be at the range of 5-50 characters</FormErrorMessage>}
      </FormControl>


      <Flex justifyContent={"space-between"}>
        <Button
          onClick={onPrev}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Previous
        </Button>
        <Button
          // isDisabled={isCurrentInputInValid()}
          onClick={handleNextRequest}
          bg={"teal.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Next
        </Button>
      </Flex>
    </>
  );
}

export default Step3;