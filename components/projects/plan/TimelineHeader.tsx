interface TimelineHeaderProps {
  startTime: string;
  endTime: string;
  hideEndTime?: boolean;
  markerVariant?: "first" | "middle" | "last";
  title?: string | null;
}

const TimelineMarkerBlock = ({
  variant,
}: {
  variant?: "first" | "middle" | "last";
}) => {
  if (!variant) return null;

  if (variant === "first") {
    return (
      <div className="flex h-[36px] w-[7px] flex-col items-center">
        <div className="h-[14.5px] w-px opacity-0" />
        <div className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
        <div className="h-[14.5px] w-px bg-[#D9D9D9]" />
      </div>
    );
  }

  if (variant === "last") {
    return (
      <div className="flex h-[36px] w-[7px] flex-col items-center">
        <div className="h-[14.5px] w-px bg-[#D9D9D9]" />
        <div className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
        <div className="h-[14.5px] w-px opacity-0" />
      </div>
    );
  }

  return (
    <div className="flex h-[36px] w-[7px] flex-col items-center">
      <div className="h-[14.5px] w-px bg-[#D9D9D9]" />
      <div className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
      <div className="h-[14.5px] w-px bg-[#D9D9D9]" />
    </div>
  );
};

const TimelineHeader = ({
  startTime,
  markerVariant,
  title,
}: TimelineHeaderProps) => {
  return (
    <div className="flex h-[36px] w-full items-center gap-[16px]">
      <TimelineMarkerBlock variant={markerVariant} />
      <div className="flex h-[20px] items-center gap-[21px] pb-0">
        <span className="h-[20px] w-[39px] text-center align-middle text-sm font-medium leading-4 text-[#000000]">
          {startTime}
        </span>
        {title ? (
          <span className="h-[20px] whitespace-nowrap text-center align-middle text-sm font-medium leading-4 text-[#9CA3AF]">
            {title}
          </span>
        ) : (
          <span className="h-[20px]" />
        )}
      </div>
    </div>
  );
};

export default TimelineHeader;
