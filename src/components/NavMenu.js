import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom'

class NavMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;


    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <IconButton style={style} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={this.handleClose}component={Link} to="/about">About </MenuItem>
          <MenuItem onClick={this.handleClose}component={Link} to="/submit">Submit Your Dog!</MenuItem>
        </Menu>
      </div>
    );
  }
}

const style = {
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

export default NavMenu;