import React from "react";
import { List } from "immutable";
import nanoid from "nanoid";
const ActivityContext = React.createContext();

export function Provider(props) {
  const [list, setList] = React.useState(
    List(JSON.parse(localStorage.getItem("list") || "[]"))
  );
  const [activeIndex, setActiveIndex] = React.useState();
  const value = {
    list: list.toArray(),
    newActivity: async () => {
      const newAct = { id: nanoid() };
      await setList(oldList => oldList.insert(0, newAct));
      setActiveIndex(newAct.id);
    },
    editActivity(id, activity) {
      setList(oldList => {
        const index = oldList.findIndex(act => act.id === id);
        return oldList.set(index, activity);
      });
    },
    deleteActivity(id) {
      setList(oldList => {
        const index = oldList.findIndex(act => act.id === id);
        return oldList.delete(index);
      });
    },
    reset() {
      setList(List([]));
      setActiveIndex(null);
    },
    activeIndex,
    setActiveIndex
  };

  React.useEffect(
    () => {
      localStorage.setItem("list", JSON.stringify(list.toArray()));
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
