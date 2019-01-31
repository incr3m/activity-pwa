import React from "react";
import { List } from "immutable";
const ActivityContext = React.createContext();

export function Provider(props) {
  const [list, setList] = React.useState(List([]));

  const value = {
    ...list.toObject(),
    addActivity(activity) {
      setList(oldList => oldList.push(activity));
    }
  };

  React.useEffect(
    () => {
      localStorage.setItem("list", JSON.stringify(list.toObject()));
      // console.log("store", store); //TRACE
    },
    [list]
  );

  return (
    <ActivityContext.Provider value={value}>
      {props.children}
    </ActivityContext.Provider>
  );
}

export default ActivityContext;
