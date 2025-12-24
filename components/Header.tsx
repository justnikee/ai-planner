export default function Header() {
    return (
        <header className="bg-zinc-950/30 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-8 sticky top-0 z-10 transition-all duration-300">
            <h2 className="text-zinc-400 font-medium text-sm tracking-wide">DASHBOARD</h2>
            <div className="flex items-center gap-4">
                <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 border border-white/5 hover:border-white/20 transition-all duration-300"></button>
            </div>
        </header>
    );
}
