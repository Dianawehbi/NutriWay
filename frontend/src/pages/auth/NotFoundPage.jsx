import { Link } from "react-router-dom"

export default function NotFoundPage() {
        return(
            <>
            <p>404 Not Found</p>
            <Link to="/" >Home</Link>
            </>
        )
}