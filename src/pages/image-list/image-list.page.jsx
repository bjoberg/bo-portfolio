import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinearProgress, makeStyles, Button } from '@material-ui/core';

import ImageListPageStyles from './image-list.styles';
import ImageService from '../../services/image.service';
import Image from '../../components/image/image.component';

const imageService = new ImageService();
const useStyles = makeStyles(ImageListPageStyles);

const ImageListPage = (props) => {
  const { openSnackbar } = props;
  const classes = useStyles();
  const limit = 30;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const evaluateIsEnd = (total, offset, nextPage) => (total / offset) <= nextPage;

  useEffect(() => {
    const getInitialImages = async () => {
      try {
        setPageIsLoaded(false);
        const result = await imageService.getImages(limit);
        setIsEnd(evaluateIsEnd(result.totalItems, limit, 1));
        setImages(result.data);
      } catch (error) {
        // TODO: Show error message with retry option
      } finally {
        setPageIsLoaded(true);
      }
    };
    getInitialImages();
  }, []);

  const handlePaginateImages = async () => {
    try {
      const next = page + 1;
      const result = await imageService.getImages(limit);
      setIsEnd(evaluateIsEnd(result.totalItems, limit, next + 1));
      setPage(next);
      setImages([...images, ...result.data]);
    } catch (error) {
      openSnackbar('error', error.message);
    }
  };

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
        <Link to={`/image/${item.id}`} className={classes.link}>
          <Image
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
          />
        </Link>
      ))}
      {!isEnd && (
        <Button variant="contained" onClick={() => handlePaginateImages()}>
          Default
        </Button>
      )}
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
  }),
  openSnackbar: PropTypes.func,
};

ImageListPage.defaultProps = {
  history: undefined,
  openSnackbar: () => { },
};

export default ImageListPage;
