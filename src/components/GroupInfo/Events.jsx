import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PlusIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@common/Button';
import { useGroups } from '../../context/groupsContext';

const useStyles = makeStyles(() => ({
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

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const [inputData, setInputData] = React.useState({
    title: '',
    description: '',
  });

  const classes = useStyles();
  const { events, addEvent, isLoading } = useGroups();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.persist();
    setInputData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSend = () => {
    addEvent(inputData);
  };

  return isLoading ? (
    <div className="txt-c">
      <CircularProgress />
    </div>
  ) : (
    <div className={classes.eventsContainer}>
      <div style={{ textAlign: 'center' }}>
        <IconButton color="secondary" onClick={handleClickOpen}>
          <PlusIcon style={{ fontSize: '5rem' }} />
        </IconButton>
        <Typography color="secondary">Create event</Typography>
      </div>
      {events.length ? (
        events.map((event) => (
          <Button key={event.id} className={classes.event}>
            <div>
              <Typography className={classes.eventName}>
                {event.title || 'Event'}
              </Typography>
            </div>
          </Button>
        ))
      ) : (
        <Typography>No events</Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Create your Secret Gifting event
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of your event below. We will send an email
            to all participants.
          </DialogContentText>
          <TextField
            autoFocus
            id="title"
            name="title"
            margin="dense"
            label="Event name"
            placeholder="End of year party gifts 20"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="description"
            name="description"
            margin="dense"
            label="Description"
            placeholder="For our awesome family!"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="secondary">
            Create Event
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Events;
