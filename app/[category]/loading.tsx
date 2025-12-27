import Wheel from "../_components/wheel";

export default function Loading() {
    return (
        <div className="min-h-screen p-10 flex flex-col items-center justify-center">
            <Wheel />
            <p className="mt-5 text-center">Loading clues...</p>
        </div>
    );
}
