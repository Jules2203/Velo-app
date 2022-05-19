function Search(props) {
  return (
    <div className="container">
    <input type="text" className="Search" placeholder="Zoek je station..." value={props.search} onChange={(e) => {props.setSearch(e.target.value)}}/>
    </div>)
}

export default Search;
