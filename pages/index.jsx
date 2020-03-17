import React from 'react';

import Layout from '../components/layout';
import { useFetchUser } from '../lib/user';

const Index = () => {
  const { user } = useFetchUser();
  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    showAddPhoto: true,
    showAddGroup: true
  };

  return (
    <Layout user={user} actionBarOptions={actionBarOptions}>
      <div>Index</div>
    </Layout>
  );
}

export default Index;