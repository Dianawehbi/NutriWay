import { IoBag } from "react-icons/io5";
import Card from '../../components/Card';
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";

export default function Shop() {
    return (
        <div className="bg-gray-100 pt-4 min-h-screen font-serif flex flex-col">
            {/* Fixed Header with High z-index */}
            <div className="fixed rounded-b-2xl  font-serif  bg-white top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
                <div className="flex gap-3 items-center m-2">
                    <Link to={'/Home'}>
                        <IoMdArrowRoundBack />
                    </Link>
                    <span>Shopping</span>
                </div>
                <div className="flex gap-3 items-center m-2 text-black">
                    <IoMdSearch />
                    <Link to={'/UserProfile'}>
                        <CgProfile />
                    </Link>
                    <Link to={'/Card'}>
                        <IoBagOutline />
                    </Link>
                </div>
            </div>

            {/* Push content down so it doesn't overlap */}
            <div className="grid grid-cols-2   gap-y-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:mx-4/12 p-4 items-center m-4 pt-20">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />

            </div>
        </div>

    );
}
