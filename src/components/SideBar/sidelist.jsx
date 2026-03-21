import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MenuItem,
  MenuList,
  ListItemIcon,
  Paper
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

const useStyles = makeStyles(() => ({
  icons: {
    width: "18px",
    height: "18px",
    opacity: 0.45,
    transition: "opacity 0.2s ease"
  },

  iconsActive: {
    width: "18px",
    height: "18px",
    opacity: 1,
    filter:
      "brightness(0) saturate(100%) invert(47%) sepia(98%) saturate(1500%) hue-rotate(175deg) brightness(103%) contrast(101%)"
  },

  listIcon: {
    minWidth: "16px",
    marginRight: "12px"
  },

  paper: {
    display: "flex",
    minWidth: "100%",
    border: "none",
    backgroundColor: "transparent",
    boxShadow: "none"
  },

  navLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textDecoration: "none"
  },

  menuList: {
    border: "none",
    boxShadow: "none",
    padding: "8px 0",
    width: "100%"
  },

  menuItem: {
    width: "100%",
    borderRadius: "10px !important",
    padding: "10px 14px !important",
    margin: "2px 0 !important",
    minHeight: "44px !important",
    transition: "background-color 0.15s ease !important"
  },

  notification: {
    color: "#555",
    opacity: 0.5
  },

  customBadge: {
    color: "#ffffff",
    backgroundColor: "#03AAFA",
    fontSize: "0.6rem",
    height: "16px",
    minWidth: "16px"
  },

  itemWrapper: {
    width: "100%",
    padding: "0 8px"
  }
}));

const activeItemStyle = {
  backgroundColor: "#e0f2fe",
  borderLeft: "4px solid #03AAFA",
  borderRadius: "10px",
  paddingLeft: "10px"
};

const activeTextStyle = {
  fontSize: "13.5px",
  fontWeight: 600,
  color: "#03AAFA",
  letterSpacing: "0.01em"
};

const inactiveTextStyle = {
  fontSize: "13.5px",
  fontWeight: 400,
  color: "#4a5568",
  letterSpacing: "0.01em"
};

const SideList = ({
  menuItems = [],
  value,
  onStateChange = () => {},
  toggleSlider = () => {},
  style,
  children,
  notificationCount
}) => {
  const classes = useStyles();
  const location = useLocation();

  const isActive = link => link === location.pathname;

  return (
    <Paper className={classes.paper} style={style}>
      <MenuList className={classes.menuList}>
        {menuItems.map(function (item, index) {
          const active = item.link ? isActive(item.link) : false;

          return (
            <div
              key={`menu-item-${index}`}
              className={classes.itemWrapper}
              data-testId={item?.dataTestId}
            >
              {item.link && (
                <NavLink to={item.link} className={classes.navLink}>
                  <MenuItem
                    key={item.link}
                    onClick={() => {
                      toggleSlider();
                      onStateChange(index);
                    }}
                    className={classes.menuItem}
                    style={active ? activeItemStyle : {}}
                    sx={{
                      "&:hover": {
                        backgroundColor: active ? "#cce8fa" : "#f4f9ff"
                      }
                    }}
                  >
                    {item.img && (
                      <ListItemIcon className={classes.listIcon}>
                        {item.name === "Notifications" ? (
                          <Badge
                            badgeContent={notificationCount}
                            color="primary"
                            classes={{ badge: classes.customBadge }}
                          >
                            <img
                              alt={"..."}
                              src={item.img}
                              className={
                                active ? classes.iconsActive : classes.icons
                              }
                            />
                          </Badge>
                        ) : (
                          <img
                            alt={"..."}
                            src={item.img}
                            className={
                              active ? classes.iconsActive : classes.icons
                            }
                          />
                        )}
                      </ListItemIcon>
                    )}
                    <span
                      data-testid={item.name}
                      style={active ? activeTextStyle : inactiveTextStyle}
                    >
                      {item.name}
                    </span>
                  </MenuItem>
                </NavLink>
              )}
              {!item.link && !item.onClick && (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    if (onStateChange !== undefined) onStateChange(item);
                    toggleSlider();
                  }}
                  className={classes.menuItem}
                  sx={{
                    "&:hover": { backgroundColor: "#f4f9ff" }
                  }}
                >
                  {item.img && (
                    <ListItemIcon className={classes.listIcon}>
                      <Badge
                        badgeContent={
                          notificationCount &&
                          (notificationCount > 99 ? "99+" : notificationCount)
                        }
                        color="primary"
                        classes={{ badge: classes.customBadge }}
                      >
                        <NotificationsIcon className={classes.notification} />
                      </Badge>
                    </ListItemIcon>
                  )}
                  <span
                    data-testid={item.name}
                    style={inactiveTextStyle}
                  >
                    {item.name}
                  </span>
                </MenuItem>
              )}
              {!item.link && item.onClick && (
                <MenuItem
                  key={item.name}
                  onClick={() => {
                    if (item.onClick) item.onClick(item);
                    onStateChange(item);
                  }}
                  className={classes.menuItem}
                  sx={{
                    "&:hover": { backgroundColor: "#f4f9ff" }
                  }}
                >
                  {item.img && (
                    <ListItemIcon className={classes.listIcon}>
                      <img
                        alt={"..."}
                        src={item.img}
                        className={classes.icons}
                      />
                    </ListItemIcon>
                  )}
                  <span
                    data-testid={item.name}
                    style={inactiveTextStyle}
                  >
                    {item.name}
                  </span>
                </MenuItem>
              )}
            </div>
          );
        })}
        {children}
      </MenuList>
    </Paper>
  );
};

export default SideList;