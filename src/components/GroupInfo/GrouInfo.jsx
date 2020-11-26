import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import Button from '@common/Button';
import { useGroups } from '../../context/groupsContext';
import Events from './Events';

const useStyles = makeStyles((theme) => ({
  root: {
    // color: theme.palette.primary.dark,
  },
  heading: {
    color: theme.palette.primary.dark,
    fontSize: '6rem',
    fontWeight: 700,
    lineHeight: '135%',
    letterSpacing: '0.06em',
    textAlign: 'center',
    margin: '5rem auto',
  },
  subheading: {
    color: theme.palette.primary.dark,
    fontSize: '4rem',
    fontWeight: 700,
    lineHeight: '135%',
    letterSpacing: '0.06em',
    textAlign: 'center',
    margin: '6rem auto 2rem',
  },
  pageWrapper: {
    maxWidth: 740,
    margin: '3rem auto',
  },
  eventsContainer: {
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
    '& > *': {
      marginRight: '2rem',
      flex: '1 0 21rem',
    },
  },
  event: {
    height: '10rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #9a9a9a',
    borderRadius: '.8rem',
    padding: '1.6rem',
  },
  eventName: {
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '0.06em',
  },
  inputsList: {
    maxHeight: '24rem',
    overflowY: 'auto',
  },
  participantFields: {
    display: 'flex',
    alignItems: 'center',
  },
  participantList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  participantItem: {
    width: '34rem',
    border: '1px solid #DADADA',
    borderRadius: '0.8rem',
    padding: '1rem',
    marginTop: '3rem',
    color: '#333',
  },
  partName: {
    fontSize: '2.1rem',
    letterSpacing: '0.06em',
    color: '#666',
  },
  partEmail: {
    width: '3rem',
    height: '3rem',
    fontSize: '1.4rem',
    color: 'inherit',
  },
  buttonWrapper: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  inputContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  textInput: {
    marginBottom: '1rem',
    marginRight: '5px',
  },
}));
const GroupPage = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputData, setInputData] = useState([]);
  const classes = useStyles();
  const { group, participants, addParticipants, isLoading } = useGroups();

  const handleChange = (event, index) => {
    event.persist();
    const newList = [...inputData];
    newList[index][event.target.name] = event.target.value;
    setInputData(newList);
  };

  const addParticipantInput = () => {
    setShowInput(true);
    const newList = [...inputData];
    const newInput = { email: '', name: '', num: newList.length + 1 };
    newList.unshift(newInput);
    setInputData(newList);
  };

  const removeInput = (index) => {
    const newList = inputData.filter((_, i) => i !== index);
    setInputData(newList);
  };

  const cancelEdit = () => {
    setShowInput(false);
    setInputData([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addParticipants(inputData);
  };

  const participantsList = participants.length ? (
    participants.map((participant) => (
      <div key={participant.id} className={classes.participantItem}>
        <Typography className={classes.partEmail}>
          {participant.email}
        </Typography>
        <Typography className={classes.partName}>{participant.name}</Typography>
      </div>
    ))
  ) : (
    <div className="m-auto">
      <Typography>No participants</Typography>
    </div>
  );

  return (
    <Container>
      <header>
        <Typography variant="h2" className={classes.heading}>
          {group?.title || 'Please wait...'}
        </Typography>
      </header>
      <main className={classes.pageWrapper}>
        <Events />
        <div className={classes.buttonWrapper}>
          <div>
            <IconButton disabled={isLoading} onClick={addParticipantInput}>
              <PlusIcon style={{ fontSize: '10rem' }} />
            </IconButton>
          </div>
          <Typography hidden={showInput}>Add participants</Typography>
        </div>
        <form noValidate onSubmit={handleSubmit} hidden={!showInput}>
          <div className={classes.inputsList}>
            {inputData.map((data, index) => (
              <div key={data.num} className={classes.participantFields}>
                <TextField
                  id="name"
                  label="Name"
                  name="name"
                  value={data.name}
                  variant="outlined"
                  placeholder="Olivia Gucci"
                  onChange={(e) => handleChange(e, index)}
                  className={classes.textInput}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={data.email}
                  variant="outlined"
                  placeholder="Oliviagucci@gmail.com"
                  onChange={(e) => handleChange(e, index)}
                  className={classes.textInput}
                  margin="normal"
                  fullWidth
                />
                <span hidden={inputData.length < 3}>
                  <IconButton
                    color="primary"
                    onClick={() => removeInput(index)}
                  >
                    <CancelIcon />
                  </IconButton>
                </span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button color="secondary" variant="contained" type="submit">
              Submit
            </Button>
            <Button color="primary" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        </form>

        <Typography variant="h3" className={classes.subheading}>
          Participants
        </Typography>
        <div className={classes.participantList}>
          {isLoading ? (
            <div className="m-auto">
              <CircularProgress />
            </div>
          ) : (
            participantsList
          )}
        </div>
      </main>
    </Container>
  );
};

export default GroupPage;
