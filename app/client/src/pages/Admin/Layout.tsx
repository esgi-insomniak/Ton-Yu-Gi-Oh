import { RxHamburgerMenu } from "react-icons/rx";
import { MdAdminPanelSettings, MdOutlineDiscount } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { BiLogOutCircle, BiTransferAlt } from "react-icons/bi";
import { GiLockedFortress } from "react-icons/gi";
import { Link } from "react-router-dom";

export const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {

    const handleCloseDrawer = () => {
        const checkbox = document.getElementById('my-drawer') as HTMLInputElement;
        checkbox.checked = false;
    }

    return (
        <>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="h-full flex justify-center">
                        <div className="w-20 bg-white/10 flex p-3 flex-col justify-between">
                            <div className="space-y-3 flex flex-col">
                                <label htmlFor="my-drawer" className="btn drawer-button mt-3">
                                    <RxHamburgerMenu />
                                </label>
                                <Link to='/admin' className="tooltip tooltip-right btn flex justify-center items-center" data-tip="User">
                                    <MdAdminPanelSettings className="text-white w-5 h-5" />
                                </Link>
                                <Link to='/admin/payement' className="tooltip tooltip-right btn flex justify-center items-center" data-tip="Payement">
                                    <FaCoins className="text-white w-5 h-5" />
                                </Link>
                                <Link to='/admin/exchange' className="tooltip tooltip-right btn flex justify-center items-center" data-tip="Echange">
                                    <BiTransferAlt className="text-white w-5 h-5" />
                                </Link>
                                <Link to='/admin/auth' className="tooltip tooltip-right btn flex justify-center items-center" data-tip="Authentification">
                                    <GiLockedFortress className="text-white w-5 h-5" />
                                </Link>
                                <Link to='/admin/promo' className="tooltip tooltip-right btn flex justify-center items-center" data-tip="Codes promo">
                                    <MdOutlineDiscount className="text-white w-5 h-5" />
                                </Link>
                            </div>
                            <Link to='' className="btn tooltip tooltip-right flex justify-center items-center group" data-tip="Quitter le panneau admin">
                                <BiLogOutCircle className="text-white w-5 h-5 group-hover:text-red-500" />
                            </Link>
                        </div>
                        <div className="w-full h-screen">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        <li><Link to={'/admin'} onClick={handleCloseDrawer}>User</Link></li>
                        <li><Link to={'/admin/payement'} onClick={handleCloseDrawer}>Payement</Link></li>
                        <li><Link to={'/admin/exchange'} onClick={handleCloseDrawer}>Echange</Link></li>
                        <li><Link to={'/admin/auth'} onClick={handleCloseDrawer}>Authentification</Link></li>
                        <li><Link to={'/admin/promo'} onClick={handleCloseDrawer}>Codes promo</Link></li>
                        <li><Link to={'/'} onClick={handleCloseDrawer}>Quitter le panneau admin</Link></li>
                    </ul>
                </div>
            </div >

        </>
    )
}

export const ReportCard = ({ title, value, icon }: { title: string, value?: string, icon: React.ReactNode }) => {
    return (
        <div className="w-72 h-32 bg-white rounded-lg p-4 flex justify-between flex-col">
            <div className="flex items-center space-x-2">
                {icon}
                <h2>{title} :</h2>
            </div>
            <span className="flex justify-end text-7xl">{value}</span>
        </div>
    )
}