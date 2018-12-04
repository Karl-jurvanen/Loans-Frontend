import React from "react";
import { withStyles, createStyles, withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  CssBaseline
} from "@material-ui/core";
import UserIcon from "@material-ui/icons/AccountBoxOutlined";
import EquipmentIcon from "@material-ui/icons/Devices";
import LoanIcon from "@material-ui/icons/CheckBoxOutlined";

const drawerWidth = 240;

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: "fixed"
    },
    navIconHide: {
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up("md")]: {
        paddingTop: 64
      },

      height: "100%"
    },
    drawer: {
      position: "relative",
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 1,
      minWidth: 0 // So the Typography noWrap works
    },
    list: {
      width: "auto"
    }
  });

interface IDrawerProps {
  page: string;
  classes: {
    root: any;
    appBar: any;
    navIconHide: any;
    toolbar: any;
    drawerPaper: any;
    drawer: any;
    content: any;
    list: any;
  };
  theme: any;
}

interface IDrawerState {
  mobileOpen: boolean;
}

class ResponsiveDrawer extends React.Component<IDrawerProps, IDrawerState> {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {["Users", "Equipment", "Loans"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {
                  {
                    0: <UserIcon />,
                    1: <EquipmentIcon />,
                    2: <LoanIcon />
                  }[index]
                }
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {this.props.page}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {sideList}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              docked: classes.drawer,
              paper: classes.drawerPaper
            }}
          >
            {sideList}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
