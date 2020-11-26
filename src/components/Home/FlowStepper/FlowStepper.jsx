/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@common/Button';
import { useAuth } from '../../../context/authContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    flexGrow: 1,
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(4),
  },
  container: {
    // maxWidth: '50rem',
  },
  copy: {
    fontWeight: 700,
    fontSize: '2.4rem',
    lineHeight: '148%',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  mobileStepper: {
    backgroundColor: 'inherit',
    justifyContent: 'center',
    '& .MuiMobileStepper-dots': {
      display: 'none',
    },
  },
  inputsContainer: {
    marginBottom: '2rem',
    '& > *': {
      marginBottom: '2rem',
    },
  },
  label: {
    marginBottom: '1rem',
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    fontSize: '2rem',
  },
  hide: {
    display: 'none',
  },
}));

const FlowStepper = () => {
  const [userData, setUserData] = useState({
    title: '',
    name: '',
    email: '',
    password: '',
  });

  const {
    emailExists,
    checkExistingEmail,
    handleLogin,
    handleRegister,
  } = useAuth();

  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleChange = (event) => {
    event.persist();

    setUserData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEmailChange = (event) => {
    event.persist();
    checkExistingEmail(event.target.value);
    handleChange(event);
  };

  /* ========== Inputs ============= */

  const emailInput = (
    <>
      <label htmlFor="email" className={classes.label}>
        Your Email
      </label>
      <TextField
        id="email"
        label=""
        name="email"
        value={userData.email}
        variant="outlined"
        placeholder="olivia@email.com"
        type="email"
        onChange={handleEmailChange}
        fullWidth
      />
    </>
  );

  const passwordInput = (
    <>
      <label htmlFor="password" className={classes.label}>
        and your password
      </label>
      <TextField
        id="password"
        variant="outlined"
        name="password"
        value={userData.password}
        type="password"
        placeholder="*********"
        onChange={handleChange}
        fullWidth
      />
    </>
  );

  const userNameInput = (
    <>
      <label htmlFor="userName" className={classes.label}>
        Lastly, We&apos;ll need Your name...
      </label>
      <TextField
        id="userName"
        label=""
        name="name"
        value={userData.name}
        variant="outlined"
        placeholder="Olivia Guxxi"
        onChange={handleChange}
        fullWidth
      />
    </>
  );

  const groupNameInput = (
    <>
      <label htmlFor="groupName" className={classes.label}>
        Give your group a name
      </label>
      <TextField
        id="groupName"
        name="title"
        value={userData.title}
        variant="outlined"
        placeholder="A-Team Secret Santa"
        onChange={handleChange}
        fullWidth
      />
    </>
  );

  const textComponent = (
    <Typography color="textPrimary" className={classes.copy}>
      Create and manage participants of a Secret gifting party for family,
      friends and colleagues.
    </Typography>
  );

  const flowSteps = [
    {
      component: textComponent,
      buttonText: "Let's gooo!",
    },
    {
      component: (
        <div className={classes.inputsContainer}>
          {emailInput}
          {emailExists.status ? passwordInput : groupNameInput}
        </div>
      ),
      buttonText: 'Continue',
    },
    {
      component: (
        <div className={classes.inputsContainer}>
          {userNameInput}
          {passwordInput}
        </div>
      ),
      buttonText: 'Done!',
    },
  ];

  const maxSteps = flowSteps.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1 && !emailExists.status) {
      handleRegister(userData);
      return null;
    }
    if (emailExists.status) {
      handleLogin(userData);
      return null;
    }
    return setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  return (
    <div className={classes.root}>
      <div className={classes.container}>{flowSteps[activeStep].component}</div>
      <MobileStepper
        className={classes.mobileStepper}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button variant="contained" color="secondary" onClick={handleNext}>
            {flowSteps[activeStep].buttonText}
          </Button>
        }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === 'rtl' ? (
        //       <KeyboardArrowRight />
        //     ) : (
        //       <KeyboardArrowLeft />
        //     )}
        //     Back
        //   </Button>
        // }
      />
    </div>
  );
};

export default FlowStepper;
