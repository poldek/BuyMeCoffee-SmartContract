import React from 'react'
import { Accordion, Title, Text, Center, Group, Space } from "@mantine/core";
import CONTRACT from "../contract/BuyMeCoffee.json";
import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Table() {
  const [coffee, setCoffee] = useState([]);
  const CONTRACT_ADDRESS = "0xC249FbA613d6F3118Cf1D14BE9B9d7FbD1Afa156";
  const CONTRACT_ABI = CONTRACT.abi;
    
    const getListCoffee = async () => {
        try {
        const { ethereum } = window;

        if (ethereum) {
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
        } else {
            console.log("Ethereum object doesn't exist!");
        }
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getListCoffee();
    }, []);
    

  return (    
    <>
    <Center my={40}>
    <Title order={1}>Honorable donor list 
        <Text span color="orange" inherit> By </Text> Wallet
    </Title>
    </Center>
      
    {coffee.map((item, index) => {        
        return(
            <Accordion disableChevronRotation  key={index}>
                <Accordion.Item value="data">
                    <Accordion.Control>
                        <div style={{ display: 'flex' }}>
                            <Text>Title:</Text>
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
    })}
  </>
  )
}

export default Table;