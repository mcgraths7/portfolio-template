import Head from "next/head";

export default function CustomHead() {
  return (
    <Head>
      <title>Site Title</title>
      <meta name="description" content={"Description"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
