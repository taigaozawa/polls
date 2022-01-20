const SkeltonCard = () => {
  return (
    <div className="rounded-xl bg-white shadow px-3 py-4">
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-2.5 ">
      <div className="h-4 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-3">
          <div className="h-3 bg-slate-200 rounded col-span-2"></div>
        </div>
      </div>
</div>
</div>
  );
}

export default SkeltonCard;