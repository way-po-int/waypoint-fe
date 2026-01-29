"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UseQueryTabOptions<T extends string> {
  key?: string;
  defaultValue: T;
  allowedValues: readonly T[];
  removeWhenDefault?: boolean;
}

const useQueryTab = <T extends string>({
  key = "tab",
  defaultValue,
  allowedValues,
  removeWhenDefault = true,
}: UseQueryTabOptions<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get(key);

  const isAllowed = (v: string | null): v is T =>
    !!v && (allowedValues as readonly string[]).includes(v);

  const tab: T = isAllowed(raw) ? raw : defaultValue;

  const setTab = (next: T) => {
    const sp = new URLSearchParams(searchParams.toString());

    if (removeWhenDefault && next === defaultValue) sp.delete(key);
    else sp.set(key, next);

    const query = sp.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return { tab, setTab };
};

export default useQueryTab;
