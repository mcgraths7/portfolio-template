import Head from "next/head";

export default function CustomHead() {
  return (
    <Head>
      <title>{process.env.NEXT_PUBLIC_SANITY_TITLE}</title>
      <meta name="description" content={process.env.NEXT_PUBLIC_SANITY_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
