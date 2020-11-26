import React from 'react';
import PropTypes from 'prop-types';
import Btn from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

const Button = withStyles((theme) => ({
  root: {
    fontSize: '1.4rem',
    padding: '1rem 2.4rem',
    textTransform: 'none',
    borderColor: theme.palette.primary.light,
    boxShadow: 'none',
    borderRadius: '3rem',
    minWidth: '13rem',

    '& .MuiButton-label': {
      whiteSpace: 'nowrap',
    },

    '&:hover': {
      boxShadow: 'none',
    },
  },
}))(Btn);

export default Button;

export const ViewMore = ({ text }) => (
  <div
    style={{ display: 'flex', justifyContent: 'center', margin: '1.6rem 0' }}
  >
    <Button startIcon={<ExpandMoreIcon />}>{text}</Button>
  </div>
);

ViewMore.defaultProps = {
  text: 'View More',
};

ViewMore.propTypes = {
  text: PropTypes.string,
};
