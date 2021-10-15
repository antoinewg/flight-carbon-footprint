import React from "react";
import Head from "next/head";

export default function Layout({
  children,
}: React.PropsWithChildren<{ children: unknown }>) {
  return (
    <>
      <Head>
        <title>Flight Carbon Footprint</title>
        <meta
          name="description"
          content="Estimate the carbon footprint of flights"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}
