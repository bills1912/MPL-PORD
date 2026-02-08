import Yolo from "../../components/Models/Yolo";
import { IconVideo } from "@tabler/icons-react";
import AppLayout from "../../components/AppLayout";
import { NextPageWithLayout } from "../../types/app-layout.type";
import LoadingChip from "../../components/LoadingChip";
import { Stack, Text, Center, Button, Group, Card } from "@mantine/core";
import { useVideoQuery } from "../../hooks/video-query.hook";
import { signOut, useSession } from "next-auth/react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { Avatar } from "@mantine/core";
let interval: any = null;
const ListVideoPage: NextPageWithLayout = () => {
  const { query: videoQuery } = useVideoQuery();
  const { data: session } = useSession();

  if (videoQuery.isLoading) {
    return <LoadingChip />;
  }

  return (
    <Stack>
      <Group gap="xs">
        <Avatar color="blue" radius="sm" size="sm" />
        <Group gap={0}>
          <Text size="xs" c="gray">
            Pengguna: {session?.user.name}
          </Text>
        </Group>
      </Group>
      <Stack align="center" justify="center">
        <>
          <main className="font-mono flex flex-col justify-center items-center  w-screen">
            <h1 className="m-5 text-xl font-bold">
              Real-Time Object Detection
            </h1>
            <Yolo />
          </main>
        </>
      </Stack>
    </Stack>
  );
};

ListVideoPage.getLayout = (page) => {
  return (
    <AppLayout
      titleIcon={<IconVideo size={28} />}
      title="Streaming Detection"
      breadcrumbs={[{ title: "Home", href: "/" }, { title: "Stream" }]}
    >
      {page}
    </AppLayout>
  );
};

export default ListVideoPage;
