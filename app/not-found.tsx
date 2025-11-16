import Link from "next/link";

export default function NotFound() {
    return (
        <div className="page flex justify-center items-center">
            <div className="p-10">
                <h1>404</h1>
                <p className="mt-5">
                    That page doesn&apos;t seem to exist. Go back to <Link className="link" href="/">ramrs</Link>
                </p>
            </div>
        </div>
    );
}
