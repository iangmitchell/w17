
function Header(props){
  return(
    <>
      <div className="block">
        <section className="hero is-info">
         <div className="hero-body">
          <div className="container">
              <h1 className="title" > Increment and Decrement Token</h1> 
              <h2 className="subtitle">Name: {props.name} Symbol:{props.symbol} </h2>
          </div> 
        </div> 
        </section>   
      </div> 
    </>
  )
}
export default Header;
