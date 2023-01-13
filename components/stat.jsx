import { Text, Progress, Card } from '@mantine/core';

export default function ProgressCard({value}) {
  return (
    <Card
      withBorder
      radius="md"
      my={40}
      p="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
        The amount collected on the computer
      </Text>
      <Text size="lg" weight={500}>
        ${value} / $10.000
      </Text>
      <Progress value={value} mt="md" color="orange" size="lg" radius="xl" />
    </Card>
  );
}