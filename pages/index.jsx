import React from 'react';
import PropTypes from 'prop-types';

import AppContainer from '../components/AppContainer';

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
    given_name: PropTypes.string,
    family_name: PropTypes.string,
    nickname: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string,
  }),
};

Index.defaultProps = {
  user: undefined,
};


export default Index;
