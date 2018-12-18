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
import Link from "next/link";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import UserContext from "./UserContext";
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
}

const listItems = [
  {
    icon: <UserIcon />,
    text: "Users"
  },
  {
    icon: <EquipmentIcon />,
    text: "Equipment"
  },
  {
    icon: <LoanIcon />,
    text: "Loans"
  }
];

class ResponsiveDrawer extends React.Component<IDrawerProps, IDrawerState> {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  reroute = () => {
    Router.push("/login");
  };

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          {listItems.map(item => (
            <Link key={item.text} href={item.text.toLowerCase()}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
          <UserContext.Consumer>
            {context =>
              context.id === null ? (
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
                    this.reroute();
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              )
            }
          </UserContext.Consumer>
        </List>
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
              {context => (
                (context.id !== null) && (
                  <Link href="/profile">
                    <IconButton color="inherit">
                      <AccountCircle />
                    </IconButton>
                  </Link>
                )
              )

              }
            </UserContext.Consumer>
            
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
