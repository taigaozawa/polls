const SkeltonCard = () => {
  return (
    <div className="rounded-lg bg-white shadow p-4">
  <div className="animate-pulse flex space-x-4">
    <div className="flex-1 space-y-4 py-1">
      <div className="h-3 bg-slate-200 rounded"></div>
        <div className="grid grid-cols-3">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
</div>
</div>
  );
}

export default SkeltonCard;