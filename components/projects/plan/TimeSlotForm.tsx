"use client";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

type TimeSlotFormValues = {
  day: string;
  start_time: string;
  end_time: string;
  memo: string;
};

interface TimeSlotFormProps {
  showMemo?: boolean;
  values: TimeSlotFormValues;
  onChange: (next: TimeSlotFormValues) => void;
}

const TimeSlotForm = ({
  showMemo = false,
  values,
  onChange,
}: TimeSlotFormProps) => {
  const handleChange =
    (key: keyof TimeSlotFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange({ ...values, [key]: e.target.value });
    };

  return (
    <form className="flex flex-col gap-6">
      {/* 날짜 */}
      <section className="flex flex-col gap-1">
        <Label htmlFor="day" className="text-sm font-medium">
          날짜
        </Label>
        <Input
          type="text"
          id="day"
          placeholder="Input Value"
          value={values.day}
          onChange={handleChange("day")}
        />
      </section>

      {/* 시작 시간 */}
      <section className="flex flex-col gap-1">
        <Label htmlFor="start-time" className="text-sm font-medium">
          시작 시간
        </Label>
        <Input
          type="time"
          id="start-time"
          value={values.start_time}
          onChange={handleChange("start_time")}
        />
      </section>

      {/* 종료 시간 */}
      <section className="flex flex-col gap-1">
        <Label htmlFor="end-time" className="text-sm font-medium">
          종료 시간
        </Label>
        <Input
          type="time"
          id="end-time"
          value={values.end_time}
          onChange={handleChange("end_time")}
        />
      </section>

      {/* 메모 */}
      {showMemo && (
        <section className="flex flex-col gap-1">
          <Label htmlFor="memo" className="text-sm font-medium">
            메모
          </Label>
          <Textarea
            id="memo"
            placeholder="Input Value"
            value={values.memo}
            onChange={handleChange("memo")}
          />
        </section>
      )}
    </form>
  );
};

export default TimeSlotForm;
