import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core';

import Button from '@common/Button';
import { discoverApi } from '../../utils/api/groups';

const useStyles = makeStyles((theme) => ({
  root: {
    // color: theme.palette.primary.dark,
  },
  heading: {
    fontFamily: 'Mountains of Christmas, cursive',
    color: theme.palette.primary.dark,
    fontSize: '6rem',
    lineHeight: '135%',
    letterSpacing: '0.06em',
    textAlign: 'center',
    margin: '10rem auto',
  },
  desc: {
    fontSize: '2.4rem',
    lineHeight: '135%',
    letterSpacing: '0.06em',
    margin: '2rem auto',
    maxWidth: '50rem',
    textAlign: 'center',
    color: '#333',
  },
  resultContaner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3rem',
  },
  resultWrapper: {
    width: '32rem',
    border: '1px solid #C0C0C0',
    borderRadius: '0.8rem',
    padding: '1rem',
    marginTop: '3rem',
    color: '#333',
  },
  email: {
    fontSize: '12px',
  },
  participant: {
    fontSize: '2.3rem',
  },
}));

const Discover = () => {
  const [anon, setAnon] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const tk = params.get('tk');
    if (tk?.length) {
      discoverApi(tk, setAnon, setIsLoading, setIsError);
    }
  }, []);

  let headingText;

  if (isLoading) {
    headingText = 'Working, Please wait...';
  } else if (!anon?.group?.title) {
    headingText = 'Your Anon';
  } else {
    headingText = anon?.group.title;
  }

  if (isError) {
    headingText = 'Erh... Oops!';
  }

  return (
    <Container>
      <Typography variant="h2" className={classes.heading}>
        {headingText}
      </Typography>
      <Typography className={classes.desc}>
        {' '}
        Hey <b>{anon?.provider.name}</b>, You&apos;re a secret gifter to:
      </Typography>

      <div className={classes.resultContaner}>
        <Button
          color="primary"
          variant="contained"
          disabled={!anon}
          onClick={() => setShow(true)}
        >
          {anon ? 'Show me who!' : 'Please wait...'}
        </Button>

        <Zoom in={show}>
          <div>
            <div className={classes.resultWrapper}>
              <Typography className={classes.email}>
                {anon?.recipient.email}
              </Typography>
              <Typography className={classes.participant}>
                {anon?.recipient.name}
              </Typography>
            </div>
            <Button
              color="primary"
              style={{ display: 'block', marginLeft: 'auto' }}
              onClick={() => setShow(false)}
            >
              Hide
            </Button>
          </div>
        </Zoom>
      </div>
    </Container>
  );
};

export default Discover;
