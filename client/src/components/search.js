/** @jsx jsx */
import { jsx } from "@emotion/core";

import AddLocation from "./add-location";

function Search({ list, listFn, showAddButton }) {
  const handleChange = event => {
    const searched = event.target.value.toLowerCase();
    listFn(
      list.filter(value => value.name.toLowerCase().indexOf(searched) > -1)
    );
  };

  return (
    <div css={{ display: "flex", justifyContent: "center", margin: "0.5em" }}>
      <input
        aria-label="Search an option"
        type="text"
        name="search"
        id="search"
        placeholder="Search an option"
        css={{
          width: "100%",
          padding: 10,
          border: "none",
          outline: "none",
          borderRadius: "0.5em",
          fontSize: "1em"
        }}
        onChange={handleChange}
      />
      {showAddButton && <AddLocation />}
    </div>
  );
}

export default Search;
