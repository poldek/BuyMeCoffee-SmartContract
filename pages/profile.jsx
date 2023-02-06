import { getSession, signOut } from "next-auth/react";
import { Container} from "@mantine/core";
import Navbar from "../components/navbar";
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import isLoadingBrowser from "./hooks/isLoading";


const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

function Profile({ user }) {
  const { classes } = useStyles();
  const { address, isConnected, disconnect } = useAccount()
  const { data, isError, isLoading } = useBalance({
    address: address,
  })

  const loadingBrowser = isLoadingBrowser(); 
 
    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>
 
  return (
      <>
        <Container my={50}>
            <Group noWrap>
            <Avatar src="" size={94} radius="md" />
            <div>
              <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                 { loadingBrowser ? isConnected  ? address : signOut() : null}
              </Text>
              <Text size="lg" weight={500} className={classes.name}>
                {user.id}
              </Text>

              <Group noWrap spacing={10} mt={3}>
                <IconAt stroke={1.5} size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  { loadingBrowser ? isConnected ? data?.formatted - data?.symbol: "" : null}
                </Text>
              </Group>

              <Group noWrap spacing={10} mt={5}>
                <IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {user.id}
                </Text>
              </Group>
            </div>
          </Group>
        </Container>
      </>
   
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default Profile;
