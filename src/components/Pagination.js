export default function Pagination({toNextPage, toPrevPage}){
  return (
    <>
      {toPrevPage && <button onClick={toPrevPage}>Previous</button> }
      {toNextPage && <button onClick={toNextPage}>Next</button>}
    </>
  )
}