export default function Banner({ type, children }) {
    return (
        <>
            {type === 'info' && (
                <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-100 fixed w-screen z-10" role="alert">
                    <span className="font-medium">Info alert!</span> {children}
                </div>
            )}
            {type === 'danger' && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 fixed w-screen z-10" role="alert">
                    <span className="font-medium">Danger alert!</span> {children}
                </div>
            )}
            {type === 'success' && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 fixed w-screen z-10" role="alert">
                    <span className="font-medium">Success alert!</span> {children}
                </div>
            )}
            {type === 'warning' && (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 fixed w-screen z-10" role="alert">
                    <span className="font-medium">Warning alert!</span> {children}
                </div>
            )}
        </>
    );
}