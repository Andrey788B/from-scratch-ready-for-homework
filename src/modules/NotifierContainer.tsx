import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Notifier } from "../components/Notifier";
import { clearNotification, getNotification } from "../store/taskSlice";

export const NotifierContainer = () => {
  const dispatch = useDispatch();
  const notification = useSelector(getNotification);


  const handleNotifierClose = () => {
    dispatch(clearNotification());
  };

  return (
    <Notifier
      open={Boolean(notification.length)}
      task={notification}
      onClose={handleNotifierClose}
    />
  );
};
