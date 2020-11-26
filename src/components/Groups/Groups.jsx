import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PlusIcon from '@material-ui/icons/AddCircleOutline';
import {
  green,
  purple,
  red,
  blue,
  pink,
  indigo,
  cyan,
  teal,
  yellow,
  orange,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import Button from '@common/Button';

import { useGroups } from '../../context/groupsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    // color: theme.palette.primary.dark,
  },
  heading: {
    fontFamily: 'Mountains of Christmas, cursive',
    color: theme.palette.primary.dark,
    fontSize: '6rem',
    fontWeight: 700,
    lineHeight: '135%',
    letterSpacing: '0.06em',
    textAlign: 'center',
    margin: '5rem auto',
  },
  pageWrapper: {
    maxWidth: 740,
    margin: '3rem auto',
  },
  groupList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  groupItem: {
    width: '34rem',
    border: '1px solid #DADADA',
    borderRadius: '0.8rem',
    padding: '1rem',
    marginTop: '3rem',
    color: '#333',
  },
  groupName: {
    fontSize: '2.4rem',
    letterSpacing: '0.06em',
    color: '#666',
  },
  numberTag: {
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3rem',
    height: '3rem',
    fontSize: '2rem',
    borderRadius: '50%',
    backgroundColor: '#fff',
    color: theme.palette.primary.dark,
    fontFamily: 'Mountains of Christmas, cursive',
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
  },
}));

const colors = [
  green[50],
  purple[50],
  red[50],
  orange[50],
  blue[50],
  pink[50],
  indigo[50],
  cyan[50],
  teal[50],
  yellow[50],
];

const Groups = () => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(false);
  const [inputData, setInputData] = useState({
    title: '',
  });

  const { groups, createGroup } = useGroups();

  const handleChange = (event) => {
    event.persist();
    setInputData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createGroup(inputData);
  };

  return (
    <Container>
      <header>
        <Typography variant="h2" className={classes.heading}>
          YOUR GROUPS
        </Typography>
      </header>
      <main className={classes.pageWrapper}>
        <div className={classes.buttonWrapper}>
          <div hidden={showInput}>
            <IconButton onClick={() => setShowInput(true)}>
              <PlusIcon style={{ fontSize: '10rem' }} />
            </IconButton>
          </div>
          <Typography>Add Group</Typography>
        </div>
        <form
          className={classes.inputContainer}
          onSubmit={handleSubmit}
          hidden={!showInput}
        >
          <TextField
            id="title"
            label=""
            name="title"
            value={inputData.title}
            variant="outlined"
            placeholder="Awesome Group"
            onChange={handleChange}
            className={classes.textInput}
            fullWidth
          />
          <Button color="primary" variant="contained" type="submit">
            Create Group
          </Button>
          <Button color="primary" onClick={() => setShowInput(false)}>
            Cancel
          </Button>
        </form>

        <div className={classes.groupList}>
          {groups
            ? groups.map((group, i) => (
                <Link to={`/groups/${group.id}`} key={group.id}>
                  <div
                    className={classes.groupItem}
                    style={{ backgroundColor: colors[i] }}
                  >
                    <Typography className={classes.numberTag}>
                      {group.membersCount}
                    </Typography>
                    <Typography className={classes.groupName}>
                      {group.title}
                    </Typography>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </main>
    </Container>
  );
};

export default Groups;
