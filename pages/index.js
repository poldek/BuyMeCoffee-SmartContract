import { Center, Container, ScrollArea } from "@mantine/core";
import Head from "next/head";
import TableListCoffee from "../components/tableListCoffee";
export default function Home() {

  return (
    <>
      <Head>
        <title>BuyMeCoffee</title>
        <meta
          name="description"
          content="BuyMeaCoffee SmartContract"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Container> 
          <TableListCoffee />
        </Container>
    </>
  );
}
