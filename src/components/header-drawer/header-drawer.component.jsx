import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PhotoIcon from '@material-ui/icons/Photo';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import HeaderDrawerStyles from './header-drawer.styles';

const useStyles = makeStyles(HeaderDrawerStyles);

const HeaderDrawer = (props) => {
  const classes = useStyles();
  const { isOpen, handleClose } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isOpen}
      classes={{
        paper: classes.drawerPaper,
      }} >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link
          to={'/dashboard/images'}
          className={classes.Link} >
          <ListItem
            button
            key={'Images'}
             >
              <ListItemIcon>
                <PhotoIcon />
              </ListItemIcon>
              <ListItemText primary={'Images'} />
          </ListItem>
        </Link>
        <Link
          to={'/dashboard/image'}
          className={classes.Link} >
          <ListItem
            button
            key={'Add Image'}
             >
              <ListItemIcon>
                <AddPhotoIcon />
              </ListItemIcon>
              <ListItemText primary={'Add Image'} />
          </ListItem>        
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key={'Groups'}
           >
            <ListItemIcon>
              <PhotoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary={'Groups'} />
        </ListItem>
        <ListItem
          button 
          key={'Add Group'}
           >
            <ListItemIcon>
              <AddToPhotosIcon />
            </ListItemIcon>
            <ListItemText primary={'Add Group'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key={'Tags'}
           >
            <ListItemIcon>
              <InsertDriveFileIcon />
            </ListItemIcon>
            <ListItemText primary={'Tags'} />
        </ListItem>
        <ListItem
          button
          key={'Add Tag'}
           >
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary={'Add Tag'} />
        </ListItem>
      </List>
    </Drawer>
  );
};

HeaderDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default HeaderDrawer;
