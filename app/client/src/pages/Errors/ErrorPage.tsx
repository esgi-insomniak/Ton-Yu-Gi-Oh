

const ErrorPage = ({ error }: { error: 401 | 403 | 404 | 500 }) => {

    return (
        <div id="error-page" className="flex justify-center items-center h-screen">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p></p>
        </div>
    );
}

export default ErrorPage;