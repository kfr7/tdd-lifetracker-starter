import "./SummaryStat.css"
import * as React from "react"



export default function SummaryStat( {stat, label, substat, type} ) {
  return (
    <div className="summary-stat">
        <div className="card-stats">
            <div className="primary-statistic">
                Primary Stat: {stat} <span className="stat-label">{label}</span>
            </div>
            <div className="substat">
                Secondary Stat: {substat}
            </div>
            {
                type==="perCategory" ?
                <img className="smallTypeImg" src="https://w7.pngwing.com/pngs/750/520/png-transparent-hexagon-category-ppt-element-business-science-and-technology-thumbnail.png" alt="category card image" /> :
                <img className="smallTypeImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffJvZdQ2fUoOEjSWsC7eTGQ3FwIBZf8oPzg&usqp=CAU" alt="daily calories card image" />
            }
        </div>
    </div>
  )
}