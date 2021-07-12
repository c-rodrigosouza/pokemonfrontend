import { useEffect, useState } from 'react'
import './style.css'

export default function Pages({ page, maxPages, changePage }) {

  const [pages, setPages] = useState([])
  const [firstPage, setFirstPage] = useState(false)
  const [lastPage, setLastPage] = useState(false)

  useEffect(() => {

    let min = 0
    let max = 0

    if (page <= 5) {
      min = 1
      setFirstPage(false)
    } else {
      min = page - 5
      if (page > 6) {
        setFirstPage(true)
      }
    }

    if (page + 5 > maxPages) {
      max = maxPages - page
    } else {
      max = 5
    }

    if(page < maxPages - 5) {
      setLastPage(true)
    } else {
      setLastPage(false)
    }

    let pageArray = []

    for (let i = min; i <= page + max; i++) {
      if (i === page) {
        pageArray.push({ selected: true, page: i })
      } else {
        pageArray.push({ selected: false, page: i })
      }
    }

    let pageList = pageArray.map(value => <button key={value.page.toString()} className={`page-button ${value.selected ? 'page-button-selected' : ''} `} onClick={() => { changePage(value.page) }}>{value.page}</button>)
    setPages(pageList)
  }, [page, maxPages, changePage])


  return (
    <div className="pages">
      {firstPage ?
        <>
          <button
            className='page-button'
            onClick={() => { changePage(1) }}
          >
            1...
          </button>
        </>
        :
        <></>
      }
      {
        page > 1 ?
          <button
            className='page-button'
            onClick={() => { changePage(page - 1) }}
          >
            Anterior
          </button>
          :
          <></>
      }
      {pages}
      {
        page < maxPages ?
          <button
            className='page-button'
            onClick={() => { changePage(page + 1) }}
          >
            Próximo
          </button>
          :
          <></>
      }
      {lastPage ?
        <>
          <button
            className='page-button'
            onClick={() => { changePage(maxPages) }}
          >
            ...{maxPages}
          </button>
        </>
        :
        <></>
      }
    </div>
  )
}