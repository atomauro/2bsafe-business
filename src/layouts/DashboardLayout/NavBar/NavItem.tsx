import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, ListItem, makeStyles } from '@material-ui/core';
import { Users as Icon } from 'react-feather';
import {  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  BarChart as BarChartIcon,
  Calendar as CalendarIcon,
} from 'react-feather';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavItem = ({
  className,
  href,
  icon,
  title,
  ...rest
}: {
  className: string;
  href: string;
  icon: any;
  title: string;
}) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters={true}
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {
          title === 'Alumnos' ?
            (<UsersIcon className={classes.icon} size="20" /> ):
            title === 'Horario' ?
            (<CalendarIcon className={classes.icon} size="20" /> ):
            (<BarChartIcon className={classes.icon} size="20"/>)
        }
        
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
