export default function Loading() {
    return (
        <div className="min-h-screen p-10 flex flex-col items-center justify-center">
            <div className={
                `w-9
                h-9
                border-5
                border-foreground
                border-l-background-primary
                rounded-full
                animate-spin`
            }></div>
            <p className="mt-5 text-center">Loading clues. This might take a while...</p>
        </div>
    )
}
