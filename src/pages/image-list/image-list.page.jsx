import React, {
  Fragment, useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  LinearProgress, makeStyles, CircularProgress,
} from '@material-ui/core';

import ImageListPageStyles from './image-list.styles';
import ImageService from '../../services/image.service';
import Image from '../../components/image/image.component';
import useInfiniteScroll from '../../hooks/infinite-scroll.hook';

const imageService = new ImageService();
const useStyles = makeStyles(ImageListPageStyles);
const evaluateIsEnd = (total, offset, nextPage) => (total / offset) <= nextPage;

const ImageListPage = (props) => {
  const { openSnackbar } = props;
  const classes = useStyles();
  const limit = 30;

  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPage, setImagesPage] = useState(0);
  const [isEndOfImages, setIsEndOfImages] = useState(false);
  const [hasErrorFetchingImages, setHasErrorFetchingImages] = useState(false);

  const handlePaginateImages = useCallback((isFetching) => {
    const paginateImages = async () => {
      try {
        const next = imagesPage + 1;
        const result = await imageService.getImages(limit, next);
        setImages(prevState => [...prevState, ...result.data]);
        setIsEndOfImages(evaluateIsEnd(result.totalItems, limit, next + 1));
        isFetching(false);
        setImagesPage(next);
      } catch (error) {
        setHasErrorFetchingImages(true);
        isFetching(false);
        openSnackbar('error', `${error.message} Refresh to try again.`);
      }
    };
    paginateImages();
  }, [openSnackbar, imagesPage]);

  const [isFetchingImages] = useInfiniteScroll(handlePaginateImages, isEndOfImages,
    hasErrorFetchingImages);

  useEffect(() => {
    const getInitialImages = async () => {
      try {
        setPageIsLoaded(false);
        const result = await imageService.getImages(limit);
        setIsEndOfImages(evaluateIsEnd(result.totalItems, limit, 1));
        setImages(result.data);
      } catch (error) {
        // TODO: Show error message with retry option
      } finally {
        setPageIsLoaded(true);
      }
    };
    getInitialImages();
  }, []);

  return (
    <Fragment>
      {!pageIsLoaded && (
        <div className={classes.linearProgressContainer}>
          <LinearProgress />
        </div>
      )}
      <div className={classes.imageList}>
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
      {isFetchingImages && (
        <div className={classes.circularProgressContainer}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
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
