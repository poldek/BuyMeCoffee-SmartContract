import React, { useEffect } from 'react'
import { Accordion, Title, Text, Center, Pagination, Space } from "@mantine/core";
import CONTRACT from "../contract/BuyMeCoffee2.json";
import { ethers } from "ethers";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import LoaderBar from './loaderBar';
import DateToHuman from '../utils/dateToHuman'
import MaticToHuman from '../utils/maticToHuman'

function TableListCoffe() {

  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
  const CONTRACT_ABI = CONTRACT.abi;
  const INFURA_ID = process.env.INFURA_ID;

  const [coffee, setCoffee] = useState([]);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const pagesCount = Math.ceil(coffee.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;

  let details = [];

    const getListCoffee = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                INFURA_ID
            );
            const buyCoffee = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            provider
            );
            details = await buyCoffee.getAllBuyMeCoffee();
            setCoffee(details);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListCoffee();
    },[]);

    const displayDataCoffe = coffee.slice(start, start+ itemsPerPage)
        .map((item, index) => {
                return(
                    <Accordion disableChevronRotation  key={index} >
                        <Accordion.Item value="data">
                            <Accordion.Control>
                                <div style={{ display: 'flex' }}>
                                    <Text>Name:</Text>
                                    <Space w="md" />
                                    <Text>{item['userName']}</Text>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Text>Description:</Text>
                                    <Space w="md" />
                                    <Text>{item['message']}</Text>
                                </div>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <div style={{ display: 'flex' }}>
                                    <Text>Wallet:</Text>
                                    <Space w="md" />
                                    <Link href={`https://mumbai.polygonscan.com/address/${item['sender']}`} target="_blank">
                                        <Text color={'orange'}>{item['sender']}</Text>
                                    </Link>
                                </div>
                            </Accordion.Panel>
                            <Accordion.Panel>    
                                <div style={{ display: 'flex' }}>
                                    <Text>Matic:</Text>
                                    <Space w="md" />
                                    <Text>
                                    {MaticToHuman(item['amount']['_hex'])}
                                    </Text>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Text>Date:</Text>
                                    <Space w="md" />
                                    <Text>
                                    {DateToHuman(item['timeStamp']['_hex'])}
                                    </Text>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                );
        })

  return (    
    <>
    <Center my={5} mx={5}>
    <Title order={1}>Honorable donor list 
        <Text span color="orange" inherit> By </Text> Wallet
    </Title>
    </Center>
    {displayDataCoffe.length > 0 ? displayDataCoffe : <LoaderBar /> }
    <Center mb={30} mt={20}>
        <Pagination page={page} onChange={setPage} total={pagesCount} />
    </Center>
  </>
  )
}

export default TableListCoffe;