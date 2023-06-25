export const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-row justify-between items-center bg-gray-900 text-gray-300">
                <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center">
                        <img src="/logo.png" alt="logo" className="w-10 h-10" />
                        <h1 className="text-2xl font-bold ml-2">Admin</h1>
                    </div>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
