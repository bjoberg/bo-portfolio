import React from 'react';
import PropTypes from 'prop-types';

import AppContainer from '../components/AppContainer';
import User from '../models/user';

const Index = (props) => {
  const { user } = props;

  const actionBarOptions = {
    elevateOnScroll: true,
    showAvatar: true,
    showAddPhoto: true,
    showAddGroup: true,
  };

  return (
    <AppContainer user={user} actionBarOptions={actionBarOptions}>
      <div>Index</div>
    </AppContainer>
  );
};

Index.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.instanceOf(User),
    isFetchingUser: PropTypes.bool,
  }),
};

Index.defaultProps = {
  user: undefined,
};


export default Index;
