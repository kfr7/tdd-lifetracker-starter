import "./ProtectedRoute.css"
import * as React from "react"
// use above for all nutrition paths
import { useAuthContext } from  "../../../contexts/auth"



export default function ProtectedRoute( { element } ) {
    const { initialized, user } = useAuthContext()
  return (
        <div className="protected-route">
                <h3 className="protected-element">{element}</h3>
        </div>
  )
}