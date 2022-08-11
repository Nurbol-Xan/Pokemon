export default function Pagination({toNextPage, toPrevPage}){
  return (
    <>
      <div id="container">	
        <div id="prev" alt="Prev" title="Prev">	
           {toPrevPage && <div className="arrow-left" onClick={toPrevPage}></div> }
        </div>	
        <div id="next" alt="Next" title="Next">
           {toNextPage && <div className="arrow-right" onClick={toNextPage}></div>}
        </div>
      </div>
    </>
  )
}