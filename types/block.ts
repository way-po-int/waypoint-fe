// Block 관련 타입 정의

export interface TimeSlotBlock {
  block_id: string;
  name: string;
  selected: boolean;
  place_id?: string;
}

export interface TimeSlot {
  time_slot_id: string;
  type: "PLACE" | "FREE";
  day: number;
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  memo: string;
  blocks: TimeSlotBlock[];
}
