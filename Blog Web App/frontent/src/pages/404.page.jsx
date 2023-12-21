import { Link } from "react-router-dom"
import pagenotfoundimg from "../imgs/404.png"
import fullLogo from "../imgs/full-logo.png"

const PageNotFound = () => {
    return(
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            <img src={pagenotfoundimg} className="select-none border-2 border-grey w-72 aspect-square object-cover rounded" />
            <h1 className="text-4xl font-gelasio leading-7">Page Not Found</h1>
            <p className="text-dark-grey text-xl leading-7 -mt-8">Page does not exist. Please return to <Link to="/" className="text-black underline" >home page</Link> </p>
            <div className="mt-auto">
                <img src={fullLogo} className="h-8 object-contain block select-none mx-auto" />
                <p className="mt-5 text-dark-grey">Stories and knowledge that are never ending </p>
            </div>
        </section>
    )
}
export default PageNotFound