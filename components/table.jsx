import React from 'react'
import { Accordion, Title, Text, Center, Pagination, Space } from "@mantine/core";
import CONTRACT from "../contract/BuyMeCoffee.json";
import { ethers } from "ethers";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import LoaderBar from './loaderBar';

function Table() {
  const [coffee, setCoffee] = useState([]);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const pagesCount = Math.ceil(coffee.length / itemsPerPage);



  const CONTRACT_ADDRESS = "0xC249FbA613d6F3118Cf1D14BE9B9d7FbD1Afa156";
  const CONTRACT_ABI = CONTRACT.abi;
    
    const getListCoffee = async () => {
        try {
            
            const provider = new ethers.providers.JsonRpcProvider(
            "https://polygon-mumbai.g.alchemy.com/v2/c3ua_ZOnchGKvJIVS6tLcwuWyQ3CDJAm"
            );
            const buyCoffee = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            provider
            );
           
            const details = await buyCoffee.getAllCoffee();
            //console.log(JSON.stringify(details, null, 2))
            setCoffee(details);
        } catch (error) {
           
            console.log(error);
        }
    };
    getListCoffee();
 
    const displayData = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return coffee.slice(start, start + itemsPerPage);
    }, [coffee]);
    

  return (    
    <>
    <Center my={1}>
    <Title order={1}>Honorable donor list 
        <Text span color="orange" inherit> By </Text> Wallet
    </Title>
    </Center>
    {displayData.length > 0 ? 
    displayData.map((item, index) => {        
        return(
            <Accordion disableChevronRotation  key={index} >
                <Accordion.Item value="data">
                    <Accordion.Control>
                        <div style={{ display: 'flex' }}>
                            <Text>Name:</Text>
                            <Space w="md" />
                            <Text>{item[0]}</Text>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Text>Description:</Text>
                            <Space w="md" />
                            <Text>{item[1]}</Text>
                        </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                         <div style={{ display: 'flex' }}>
                            <Text>Wallet:</Text>
                            <Space w="md" />
                            <Link href={`https://mumbai.polygonscan.com/address/${item[2]}`} target="_blank"><Text color={'orange'}>{item[2]}</Text></Link>
                        </div>
                    </Accordion.Panel>
                    <Accordion.Panel>    
                        <div style={{ display: 'flex' }}>
                            <Text>Matic:</Text>
                            <Space w="md" />
                            <Text>{item[2]}</Text>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        );
    })
    : <LoaderBar /> }

    <Center mb={30} mt={20}>
        <Pagination page={page} onChange={setPage} total={pagesCount} />
    </Center>
  </>
  )
}

export default Table;