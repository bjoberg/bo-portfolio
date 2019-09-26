import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinearProgress, makeStyles } from '@material-ui/core';

import ImageListPageStyles from './image-list.styles';
import ImageService from '../../services/image.service';
import Image from '../../components/image/image.component';

const imageService = new ImageService();
const useStyles = makeStyles(ImageListPageStyles);

const ImageListPage = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [images, setImages] = useState([{}]);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);

  useEffect(() => {
    async function getImagesAsync() {
      try {
        setPageIsLoaded(false);
        setImages(await imageService.getImages());
      } catch (error) {
        history.push('/error');
      } finally {
        setPageIsLoaded(true);
      }
    }
    getImagesAsync();
  }, [history]);

  if (!pageIsLoaded) {
    return (
      <div className={classes.progressBarContainer}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {images.map(item => (
        <Link key={item.id} to={`/image/${item.id}`} className={classes.link}>
          <Image
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
          />
        </Link>
      ))}
    </div>
  );
};

ImageListPage.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.string,
      key: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default ImageListPage;
