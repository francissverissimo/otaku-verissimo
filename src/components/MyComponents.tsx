import { Collapse } from "@mui/material";
import { CaretDown, CaretUp } from "phosphor-react";
import { ClassAttributes, useState } from "react";

type MyDividerProps = ClassAttributes<HTMLDivElement> & {
  className?: string;
};

type SpaceProps = { pxHeight?: number };

export function MyDivider({ className }: MyDividerProps) {
  return <div className={`my-4 bg-zinc-300 ${className} h-[1px]`} />;
}

export function MySpace({ pxHeight }: SpaceProps) {
  return <div style={{ height: pxHeight ? pxHeight : 8 }}></div>;
}

export function MyShadow() {
  return <div className="h-4 w-full shadow" />;
}
