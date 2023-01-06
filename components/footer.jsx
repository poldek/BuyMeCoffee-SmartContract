import React from "react";
import { createStyles, Container, Group, Anchor } from "@mantine/core";
import Image from "next/image";
import logoPic from "../public/pgmsoft_color.png";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
      borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const mockdata = [
  {
    icon: IconCode,
    label: "Open source",
    link: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    label: "Free for everyone",
    link: "The fluid of Smeargle’s tail secretions changes",
  },
];

function Footer() {
  const { classes } = useStyles();
  const items = mockdata.map((link) => (
    <Anchor
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image
          src={logoPic}
          alt="PGMSOFT LTD"
          priority
          width={250}
          height={50}
        />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}

export default Footer;
