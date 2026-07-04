function Skeleton({ className = "", variant = "default" }) {
  const baseClass = "animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]";
  
  const variants = {
    default: "rounded-lg",
    text: "rounded h-4",
    title: "rounded-lg h-6",
    circle: "rounded-full",
    button: "rounded-xl h-9",
    card: "rounded-xl",
  };

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`} />
  );
}

export default Skeleton;
