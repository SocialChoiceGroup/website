import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";
//import HowToVoteIcon from "@material-ui/icons/HowToVote";
import AssignmentIcon from "@material-ui/icons/Assignment";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import AssessmentIcon from "@material-ui/icons/Assessment"
// import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";

const styles = {
  list: {
    width: 250
  },
  colorAlternative: {
    color: "#ffffff"
  },
  item: {
    "&:hover": {
      backgroundColor: "#bdbdbd"
    }
  },
  text: {}
};

class DrawerNav extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem component={Link} to="/" className={classes.item}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" className={classes.text} />
          </ListItem>
          {/* <ListItem
            component={Link}
            to="/demographics"
            className={classes.item}
          >
            <ListItemIcon>
              <HowToVoteIcon />
            </ListItemIcon>
            <ListItemText primary="Vote" />
          </ListItem> */}
          <ListItem
            component={Link}
            to="/meet-the-team"
            className={classes.item}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Meet The Team" />
          </ListItem>
          <ListItem component={Link} to="/rankings" className={classes.item}>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Rankings" />
          </ListItem>
          <ListItem component={Link} to="/results" className={classes.item}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Voting Data" />
          </ListItem>
          <ListItem component={Link} to="/results-and-analysis" className={classes.item}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Results & Analysis" />
          </ListItem>
          <ListItem component={Link} to="/philosophy" className={classes.item}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Lessons From The Project" />
          </ListItem>
          <ListItem
            component={Link}
            to="/privacy-policy"
            className={classes.item}
          >
            <ListItemIcon>
              <VpnLockIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
          onClick={this.toggleDrawer("left", true)}
          style={classes.icon}
          color="alternative"
        >
          <MenuIcon color="alternative" />
        </IconButton>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

DrawerNav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DrawerNav);
