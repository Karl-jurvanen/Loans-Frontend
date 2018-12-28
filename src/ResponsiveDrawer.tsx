import React from "react";
import { withStyles, createStyles, withTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  CssBaseline
} from "@material-ui/core";
import UserIcon from "@material-ui/icons/AccountBoxOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import EquipmentIcon from "@material-ui/icons/Devices";
import LoanIcon from "@material-ui/icons/CheckBoxOutlined";
import Link from "next/link";
import AccountCircle from "@material-ui/icons/AccountCircle";
import UserContext from "./UserContext";
import { reroute } from "./helpers/jwt";
import Router from "next/router";

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
      position: "fixed",
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
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
      alignItems: "auto",
      backgroundColor: theme.palette.background.default,
      paddingBottom: theme.spacing.unit * 1,
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
    grow: any;
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
  linkList: any[];
}

const adminItems = [
  {
    icon: <DashboardIcon />,
    text: "Home",
    link: "/"
  },
  {
    icon: <UserIcon />,
    text: "Users",
    link: "users"
  },
  {
    icon: <EquipmentIcon />,
    text: "Equipment",
    link: "equipment"
  },
  {
    icon: <LoanIcon />,
    text: "Loans",
    link: "loans"

  }
];

const userItems = [
  {
    icon: <DashboardIcon />,
    text: "Home",
    link: "/"
  },
  {
    icon: <EquipmentIcon />,
    text: "Equipment",
    link: "equipment"

  },
  {
    icon: <LoanIcon />,
    text: "Loans",
    link: "loans"
  }
];

class ResponsiveDrawer extends React.Component<IDrawerProps, IDrawerState> {
  state = {
    mobileOpen: false,
    linkList: []
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    let value = this.context;
  }

  render() {
    const { classes } = this.props;
    let list = 1;
    const sideList = (
      <div className={classes.list}>
        <UserContext.Consumer>
          {context => (
            <List>
              {
              // context.id is null if user is not logged in
              // render only login link if not logged in
              // render different links based on loggin in user's admin status
              context.id !== null && ( context.admin
                ? adminItems.map(item => (
                    <Link key={item.text} href={item.link}>
                      <ListItem button>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    </Link>
                  ))
                : userItems.map(item => (
                    <Link key={item.text} href={item.link}>
                      <ListItem button>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    </Link>
                  )))}
              {context.id === null ? (
                <Link href="/login">
                  <ListItem button>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                </Link>
              ) : (
                <ListItem
                  button
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    reroute("/login");
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              )}
            </List>
          )}
        </UserContext.Consumer>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              {this.props.page}
            </Typography>
            <UserContext.Consumer>
              {context =>
                context.id !== null && (
                  <React.Fragment>
                  <Typography color="inherit">{context.name}</Typography>
                  <Link href="/profile">
                    <IconButton color="inherit">
                      <AccountCircle />
                    </IconButton>
                  </Link>
                  </React.Fragment>
                )
              }
            </UserContext.Consumer>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <SwipeableDrawer
            variant="temporary"
            anchor={"left"}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            onOpen={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {sideList}
          </SwipeableDrawer>
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
