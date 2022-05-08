function Search(props) {
  return (
    <input type="text" value={props.search} onChange={(e) => {props.setSearch(e.target.value)}}/ >
  );
}

export default Search;
