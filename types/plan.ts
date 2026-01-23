// Plan 관련 타입 정의

import { Collection } from "./collection";

export interface Plan {
  plan_id: string;
  title: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  member_count: number;
  collections: Collection[]; // Plan에 종속된 여러 개의 Collection
}
