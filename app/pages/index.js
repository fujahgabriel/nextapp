import React from 'react';
import { Text } from '@chakra-ui/core';
import Layout from '../components/Layout';
function Index({ me }) {
  return (
    <Layout me={me}>
      <Text fontSize="40px" color="brand.500" as="h1">
        Hello, {me.name}!
      </Text>
    </Layout>
  );
}
Index.getInitialProps = async function (context) {
  const res = await fetch("http://localhost:4000/api/me", {
    headers: {
      cookie: context.req.headers.cookie,
    },
  });
  const me = await res.json();
  if (me.error) {
    console.log(me);
    context.res.writeHead(302, {
      Location: "/api/login",
    });
    context.res.end();
    return;
  }
  return { me };
};
export default Index;