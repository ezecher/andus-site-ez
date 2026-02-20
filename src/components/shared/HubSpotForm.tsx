"use client";

import { useEffect, useRef } from "react";

interface HubSpotFormProps {
  formId: string;
  portalId?: string;
  region?: string;
}

/**
 * Embeds a HubSpot form using the newer hs-form-frame approach.
 * Loads the HubSpot embed script once globally, renders a div
 * with data attributes that HubSpot auto-discovers.
 */
export default function HubSpotForm({
  formId,
  portalId = "242514505",
  region = "na2",
}: HubSpotFormProps) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    // Check if the script already exists (from another HubSpotForm instance)
    const existing = document.querySelector(
      `script[src*="hsforms.net/forms/embed/${portalId}"]`
    );

    if (existing) {
      scriptLoaded.current = true;
      return;
    }

    // Load the HubSpot embed script
    const script = document.createElement("script");
    script.src = `https://js-${region}.hsforms.net/forms/embed/${portalId}.js`;
    script.defer = true;
    scriptLoaded.current = true;
    document.head.appendChild(script);
  }, [portalId, region]);

  return (
    <div
      className="hs-form-frame"
      data-region={region}
      data-form-id={formId}
      data-portal-id={portalId}
    />
  );
}
