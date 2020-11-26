import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import FlowStepper from './FlowStepper/FlowStepper';

const useStyles = makeStyles((theme) => ({
  root: {
    // color: theme.palette.primary.dark,
  },
  heading: {
    fontFamily: 'Mountains of Christmas, cursive',
    color: theme.palette.primary.dark,
    maxWidth: '65rem',
    fontSize: '8.5rem',
    lineHeight: '135%',
    letterSpacing: '0.06em',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '10vh',
  },
  flowContainer: {
    margin: '4rem auto',
    maxWidth: '50rem',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h1" className={classes.heading}>
        Organize a secret gifting event!
      </Typography>
      <div className={classes.flowContainer}>
        <FlowStepper />
      </div>
    </Container>
  );
};

// Home.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Home;
