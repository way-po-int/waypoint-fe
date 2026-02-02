interface TimeColumnProps {
  startTime: string;
  endTime: string;
  hideEndTime?: boolean;
}

const TimeColumn = ({
  startTime,
  endTime,
  hideEndTime,
}: TimeColumnProps) => {
  return (
    <div className="relative flex h-full flex-col items-start justify-between pl-10 text-xs font-semibold text-slate-500">
      <span>{startTime}</span>
      {!hideEndTime && <span>{endTime}</span>}
    </div>
  );
};

export default TimeColumn;
