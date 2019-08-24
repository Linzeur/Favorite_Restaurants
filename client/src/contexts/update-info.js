import React from "react";

const UpdateListContext = React.createContext();

function UpdateListProvider(props) {
  const [updateList, setUpdateList] = React.useState({
    locations: 0,
    favorites: 0
  });

  const value = {
    locations: updateList.locations,
    favorites: updateList.favorites,
    onChange: key => {
      setUpdateList(prevState => {
        return { ...prevState, [key]: prevState[key] + 1 };
      });
    }
  };

  return <UpdateListContext.Provider value={value} {...props} />;
}

export { UpdateListProvider, UpdateListContext };
