import {AppBar, Toolbar, Button} from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import RandomQuestions from "./RandomQuestions";

const useStyles = makeStyles({
    menuButton: {
        background: 'linear-gradient(90deg, rgba(255,218,46,1) 0%, rgba(255,181,70,1) 52%, rgba(238,129,19,1) 100%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#444239',
        fontWeight: 'bold',
        height: 48,
        padding: '0 30px',
    },
    menuTitle: {
        margin: '0 auto',
        color: '#444239'
    },
    titleBar: {
        background: 'linear-gradient(90deg, rgba(250,255,46,1) 0%, rgba(255,181,70,1) 78%, rgba(255,140,73,1) 100%)'
    }
});

function Home() {
    return( <h1>Home</h1>);
}

function Topics() {
    return( <h1>Topic</h1>);
}

function CertainClass() {
    return( <h1>Certain Class</h1>);
}

export default function Header() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const classes = useStyles();
    return(
        <Router>
        <AppBar position="static" className={classes.titleBar}>
            <Toolbar>
                <Button className={classes.menuButton}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}>
                    Menu
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={"/"}>Főoldal</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={"/random"}>Random kérdések</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={"/certainclass"}>Leckeválasztó</Link>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={"/topics"}>Témakörök</Link>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                <Typography variant="h4"
                            component="h1"
                            gutterBottom
                className={classes.menuTitle}>
                    Spanyoltanulás
                </Typography>
            </Toolbar>
        </AppBar>
            <Route exact path={"/"}>
                <Home />
            </Route>
            <Route path={"/random"}>
                <RandomQuestions />
            </Route>
            <Route path={"/certainclass"}>
                <CertainClass />
            </Route>
            <Route path={"/topics"}>
                <Topics />
            </Route>
        </Router>
    )
}