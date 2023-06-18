import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  // phle empty array kr denge exchanges me agar kuch na ho to empty array aaye
  const [exchanges, setExchanges] = useState([]);
  // component jaise hi mount hua means refresh kiya tabhi loading true kr denge
  const [loading, setLoading] = useState(true);
  // phle error ko false rkhenge kyuki abhi error aayi thodi h jab aayegi tab krenge true
  const [error, setError] = useState(false);

  useEffect(() => {
    // fetchExchanges ek async await function and return a promise and isme hm get request kr rhe server/exchanges pr to get the data and then data ko set kr rhe
    // axios ek promise based http library h jo developer ko request krne deti h for fetching data or isme hi h ye get post put patch delete request  //Why Do We Need Axios in React? Axios allows us to communicate with APIs easily in our React apps. Though this can also be achieved by other methods like fetch or AJAX, Axios can provide a little more functionality that goes a long way with applications that use React. Axios is a promise-based library used with Node. //हम axios का उपयोग क्यों करते हैं? // लेकिन Axios बेहतर पठनीयता के लिए डेटा को json फॉर्मेट में कनवर्ट करता है । Axios में अंतर्निहित XSRF (क्रॉस-साइट अनुरोध जालसाजी) सुरक्षा है, जबकि Fetch में नहीं है। Axios में HTTP रिक्वेस्ट को इंटरसेप्ट करने की क्षमता है, लेकिन Fetch डिफ़ॉल्ट रूप से नहीं है। Axios अनुरोधों को रद्द करने की अनुमति देता है और टाइमआउट का अनुरोध करता है लेकिन प्राप्त नहीं करता है।
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        // data fetch krke set kr rhe and after that jaise hi data render hua loading stop krni h
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        // error aaya to erroe set kiya means dikhaya and loading rok di
        setError(true); // niche bta rkha h ki error aane pr kya de
        setLoading(false);
      }
    };
    // calling the fetch function
    fetchExchanges();
  }, []);

  if (error)   // error component render kr rhe
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;

  return (
    <Container maxW={"container.xl"}>
      {/* agar loading true h to Loader ko render kr denge otherwise : ke baad ka execurte krenge */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {/* exchanges array ko map kr rhe means traverse rhe and us arr[i] pr jo present h attribute usko access kr rhe */}
            {exchanges.map((i) => (
              // ab hm yha se name key etc ye sb leke ExchangeCard me ja rhe h means hm use kr skte isko khi or 
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
// ExchangeCard me hm basic destructuring se name img rank url ko use kr rhe that's it
// ab isme hm ye kr rhe h 
const ExchangeCard = ({ name, img, rank, url }) => (
//  external website pr bhej rhe h isliye anchor tag ka use kiya
 <a href={url} target={"blank"}>   {/* blank targets an existing frame or window called "blank". A new window is created only if "blank" doesn't already exist._blank is a reserved name which targets a new, unnamed window.*/}
    <VStack
      w={"52"}
      shadow={"lg"} 
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}  // transition show hogi on hovering
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)", // on hovering size of box increase ho jayega
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}> {/* no of lines 1 ka mtlb h agar text overflow hoga tb usko ....krke dikha denge but line 1 hi rhegi */}
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;