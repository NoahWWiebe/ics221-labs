import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MessageBoard from "@/components/MessageBoard";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export async function getStaticProps() {
  let jsonData;
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/v1/messages`);
    jsonData = data;
  } catch (error) {
    console.log("API Error: " + error);
  }
  return {
    props: {
      jsonData,
    },
  };
}

export default function Home({ jsonData }) {
  return (
    <>
      <Head>
        <title>Lab 2 - ICS-221</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Header />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
            <MessageBoard jsonData={jsonData}/>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
}
