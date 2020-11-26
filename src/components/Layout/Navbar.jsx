import React from 'react';
import { Link } from 'react-router-dom';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import Button from '@common/Button';

import logo from '@assets/images/secret-gifter.png';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '8rem',
    maxWidth: '1280px',
    padding: '0 3rem',
    margin: 'auto',
  },
  imageContainer: {
    width: '8rem',
  },
  img: {
    width: '100%',
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      marginLeft: '2rem',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <div className={classes.imageContainer}>
        <Link to="/">
          <img src={logo} alt="logo" className={classes.img} />
        </Link>
      </div>
      <div className={classes.navActions}>
        <Button color="secondary" variant="contained">
          Create Group
        </Button>
        <IconButton>
          <PersonOutlineIcon fontSize="large" />
        </IconButton>
      </div>
    </nav>
  );
};

export default Navbar;
