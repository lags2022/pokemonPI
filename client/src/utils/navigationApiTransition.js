import { flushSync } from "react-dom";

export const navigationApiTransition = (navigate,to) => {
  //if it does not support your browser
  if (!document.startViewTransition) {
    navigate(to);
  } else {
    //if it support your browser
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(to);
      });
    });
  }
};
