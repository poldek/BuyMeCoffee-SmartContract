import { getSession, signOut } from "next-auth/react";
import { Container} from "@mantine/core";
import Navbar from "../components/navbar";
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';

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
  return (
      <>
        <Navbar user={user}/>
        <Container my={50}>
            <Group noWrap>
            <Avatar src="" size={94} radius="md" />
            <div>
              <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                {user.id}
              </Text>

              <Text size="lg" weight={500} className={classes.name}>
                {user.id}
              </Text>

              <Group noWrap spacing={10} mt={3}>
                <IconAt stroke={1.5} size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {user.id}
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
