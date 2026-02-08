import { NextPageWithLayout } from "../types/app-layout.type";
import AppLayout from "../components/AppLayout";
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Image,
  List,
  Loader,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { IconTargetArrow, IconVideo } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useVideoQuery } from "../hooks/video-query.hook";
import { useJobListQuery } from "../hooks/job-query.hook";

const elements: { kelas_kematangan: string; nama: string }[] = [
  { kelas_kematangan: "0", nama: "Abnormal" },
  { kelas_kematangan: "1", nama: "Empty Bunch" },
  { kelas_kematangan: "2", nama: "Ripe" },
  { kelas_kematangan: "3", nama: "Overripe" },
  { kelas_kematangan: "4", nama: "Underripe" },
  { kelas_kematangan: "5", nama: "Unripe" },
];

const Home: NextPageWithLayout = () => {
  const { data } = useSession();
  const router = useRouter();

  const { query: videoQuery } = useVideoQuery();
  const { query: jobQuery } = useJobListQuery({});

  const rows = elements.map((element) => (
    <Table.Tr key={element.kelas_kematangan}>
      <Table.Td>{element.kelas_kematangan}</Table.Td>
      <Table.Td>{element.nama}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack mb="xl">
      <Title order={3}>Selamat Datang {data?.user.name}</Title>

      <SimpleGrid cols={{ sm: 3 }} mt="md">
        <Card withBorder py="md" px="xl">
          <Stack>
            <Group justify="space-between" align="center">
              <Text size="lg" style={{ fontWeight: "bold" }}>
                Jumlah Video
              </Text>
              <Avatar size="md" color="blue">
                <IconVideo size="1.5rem" />
              </Avatar>
            </Group>

            <Text size="xl" mb="lg">
              {videoQuery.isLoading || !videoQuery.data ? (
                <Loader size="xs" />
              ) : (
                videoQuery.data.data.length
              )}{" "}
              Video
            </Text>

            <Group justify="flex-start">
              <Button
                size="xs"
                variant="subtle"
                onClick={() => router.replace("/video")}
              >
                Selengkapnya
              </Button>
            </Group>
          </Stack>
        </Card>

        <Card withBorder py="md" px="xl">
          <Stack>
            <Group justify="space-between">
              <Text size="lg" style={{ fontWeight: "bold" }}>
                Jumlah Deteksi
              </Text>
              <Avatar size="md" color="orange">
                <IconTargetArrow size="1.5rem" />
              </Avatar>
            </Group>

            <Text size="xl" mb="lg">
              {jobQuery.isLoading || !jobQuery.data ? (
                <Loader size="xs" />
              ) : (
                jobQuery.data.data.length
              )}{" "}
              Deteksi
            </Text>

            <Group justify="flex-start">
              <Button
                size="xs"
                variant="subtle"
                onClick={() => router.replace("/detection")}
              >
                Selengkapnya
              </Button>
            </Group>
          </Stack>
        </Card>
      </SimpleGrid>

      <Divider
        my="xs"
        label={<Title order={2}>Tentang MPL-PORD</Title>}
        labelPosition="left"
        color="dark"
      />

      <Text>
        Kami hadirkan MPL-PORD, sebuah sistem pendeteksian untuk menentukan 
        tingkat kematangan dari buah kelapa sawit, dilihat dari warna dan 
        jumlah brondol dengan memanfaatkan teknologi <i>Artificial Intelligence </i> 
        MPL-PORD didesain sebagai penunjang untuk melakukan penyortiran kelapa sawit
        dengan kualitas yang baik dan tingkat kematangan yang tepat secara otomatis,
        sehingga menjadi aplikasi yang <i>cost effective</i>, dapat menghemat waktu
        penyortiran yang biasanya dilakukan melalui pengamatan mata yang cenderung
        menyita banyak waktu dan tenaga. MPL-PORD dapat mendeteksi 6 jenis tingkat 
        kematangan dari buah kelapa sawit secara otomatis
      </Text>

      <Table highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Kode Kelas</Table.Th>
            <Table.Th>Nama Kelas</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Image src="/penjelasan_mpl-pord.png" alt="Penjelasan" />

      <Title order={4}>Bagaimana model dapat mendeteksi tingkat kematangan?</Title>

      <Text>
        MPL-PORD dibangun menggunakan model Artificial Intelligence yaitu You
        Only Look Once (YOLO). YOLO merupakan sebuah model Object Detection yang
        dikembangkan oleh Joseph Redmon and Ali Farhadi. Pada proses pemrosesan,
        algoritma YOLO melakukan ekstraksi fitur dan training klasifikasi
        terlebih dahulu sehingga dapat mengenali dan membedakan jenis kerusakan
        jalan. Output yang dihasilkan YOLO berupa Bounding Box (Kotak Pembatas)
        dari kerusakan jalan yang dideteksi. Dengan adanya algoritma YOLO,
        aplikasi MPL-PORD ini dapat mendeteksi tingkat kematangan dan brondol
        dari buah kelapa sawit.
      </Text>

      <Text>
        Model pendeteksian yang dikembangkan dalam aplikasi MPL-PORD menggunakan
        beberapa model pengembangan dari YOLO, yaitu YOLOv8, YOLOv9, dan YOLOv11.
        YOLOv11 merupakan model terbaru dari pengembangan model YOLO yang dikembangkan
        oleh Ultralytics. Penggunaan beberapa model dimaksudkan sebagai bahan perbandingan
        dan opsi pemilihan model dalam melakukan pendeteksian tingkat kematangan
        kelapa sawit.
      </Text>

      <Title order={4}>Seberapa akurat model yang kami kembangkan?</Title>

      {/* <Image src="/proses.png" alt="Proses Pengembangan" /> */}

      <Text>
        Terdapat tiga model yang kami bangun yaitu YOLOv8, YOLOv9, dan YOLOv11
      </Text>

      {/* <List withPadding>
        <List.Item>
          Model RDD Jepang: model yang dilatih dengan pretrained model COCO
          (YOLOv8) pada Japan Road Damage Dataset 2018. Model yang dibangun
          telah dapat digunakan untuk deteksi 10 jenis kerusakan jalan di Jepang
          dengan nilai akurasi mAP mencapai 0,686 dan F1-Score 0,62.
        </List.Item>
        <List.Item>
          Model RDD Indonesia: model yang dilatih dengan pretrained model RDD
          Jepang pada dataset Indonesia yang sudah terlebih dahulu dilabeli
          secara manual. Model yang dibangun telah dapat digunakan untuk deteksi
          7 jenis kerusakan jalan di Indonesia dengan nilai akurasi mAP mencapai
          0,696 dan F1-Score 0,650.
        </List.Item>
      </List> */}

      <Table highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nama Model</Table.Th>
            <Table.Th>mAP</Table.Th>
            <Table.Th>F1 Score</Table.Th>
            <Table.Th>Keterangan</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr key="model-yolov8">
            <Table.Td>Model YOLOv8</Table.Td>
            <Table.Td>0.688</Table.Td>
            <Table.Td>0.620</Table.Td>
            <Table.Td>
              Dilatih menggunakan data confidential buah kelapa sawit
            </Table.Td>
          </Table.Tr>
          <Table.Tr key="model-yolov9c">
            <Table.Td>Model YOLOv9C</Table.Td>
            <Table.Td>0.696</Table.Td>
            <Table.Td>0.650</Table.Td>
            <Table.Td>
            Dilatih menggunakan data confidential buah kelapa sawit
            </Table.Td>
          </Table.Tr>
          <Table.Tr key="model-yolov11">
            <Table.Td>Model YOLOv11</Table.Td>
            <Table.Td>0.696</Table.Td>
            <Table.Td>0.650</Table.Td>
            <Table.Td>
            Dilatih menggunakan data confidential buah kelapa sawit
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      <List withPadding mt="lg">
        <List.Item>
          Link Github Aplikasi:{" "}
          <Anchor href="https://gitlab.com/billsar1912/palm-oil-detector" target="_blank">
            https://gitlab.com/billsar1912/palm-oil-detector
          </Anchor>
        </List.Item>
        <List.Item>
          Link Pengembangan Model:{" "}
          {/* <Anchor
            href="https://s.stis.ac.id/PemodelanRDDJepang"
            target="_blank"
          >
            https://s.stis.ac.id/PemodelanRDDJepang
          </Anchor> */}
          COMING SOON!
          {/* ,{" "}
          <Anchor
            href="https://s.stis.ac.id/PemodelanRDDIndonesia"
            target="_blank"
          >
            https://s.stis.ac.id/PemodelanRDDIndonesia
          </Anchor> */}
        </List.Item>
        {/* <List.Item>
          Link PPT:{" "}
          <Anchor href="https://s.stis.ac.id/PPTRadactor" target="_blank">
            https://s.stis.ac.id/PPTRadactor
          </Anchor>
        </List.Item> */}
      </List>
    </Stack>
  );
};

Home.getLayout = (page) => {
  return <AppLayout breadcrumbs={[{ title: "Home" }]}>{page}</AppLayout>;
};

export default Home;
