"use client";

import { useTransition } from "react";
import { disableDraftMode } from "@/app/actions";
import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const [pending, startTransition] = useTransition();
  const isPresentationTool = useIsPresentationTool();

  // Hide when inside Presentation Tool iframe or when unknown
  if (isPresentationTool === null || isPresentationTool === true) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
    });

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {pending ? (
        <span className="bg-violet text-cream px-4 py-2 rounded text-sm font-heading">
          Disabling draft mode...
        </span>
      ) : (
        <button
          type="button"
          onClick={disable}
          className="bg-violet text-cream px-4 py-2 rounded text-sm font-heading hover:bg-violet/90 transition-colors shadow-lg"
        >
          Disable Draft Mode
        </button>
      )}
    </div>
  );
}
