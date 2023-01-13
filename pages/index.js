import { Container} from "@mantine/core";
import Head from "next/head";
import TableListCoffee from "../components/tableListCoffee";
import { getSession } from "next-auth/react";
import Navbar from "../components/navbar";
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
      <Navbar />
        <Container>
          <TableListCoffee />
        </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  } else {
    return {
      props: {}
    }
  }
}

