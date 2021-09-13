import React,{useContext} from 'react'
import { GlobalState } from '../../../globalState'

export default function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.ProductAPI.page
    const [result] = state.ProductAPI.result
    return (
        <div className="load-more">
            {
                result < page*9 ? ""
                : <button onClick={() => setPage(page+1)}>Load more</button>
            }
            
        </div>
    )
}
