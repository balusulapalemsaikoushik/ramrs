export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className={
                `w-9
                h-9
                border-5
                border-foreground
                border-l-background-primary
                rounded-full
                animate-spin`
            }></div>
            <p className="mt-5">Loading clues...</p>
        </div>
    )
}
