import React, { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast.js";

export default function Settings() {
  const { addToast } = useToast();
  const [serverSync, setServerSync] = useState(false);
  const [toastDuration, setToastDuration] = useState(2500);

  useEffect(() => {
    setServerSync(localStorage.getItem("enable_server_sync") === "1");
    const stored = parseInt(localStorage.getItem("toast_duration") || "", 10);
    if (Number.isFinite(stored)) setToastDuration(stored);
  }, []);

  const save = () => {
    if (serverSync) localStorage.setItem("enable_server_sync", "1");
    else localStorage.removeItem("enable_server_sync");

    const dur = Number(toastDuration);
    if (Number.isFinite(dur) && dur >= 500)
      localStorage.setItem("toast_duration", String(dur));
    else localStorage.removeItem("toast_duration");

    addToast("Settings saved", "success");
  };

  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-gray-900 mb-2">Server Sync</h2>
            <p className="text-sm text-gray-600 mb-3">
              Enable optional sync of cart and wishlist to your backend
              endpoints.
            </p>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={serverSync}
                onChange={(e) => setServerSync(e.target.checked)}
              />
              <span>Enable server sync</span>
            </label>
            <p className="mt-2 text-xs text-gray-500">
              Uses POST /api/sync/cart and /api/sync/wishlist.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-gray-900 mb-2">
              Toast Notifications
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Set the default toast duration (milliseconds).
            </p>
            <input
              type="number"
              min={500}
              step={100}
              className="border rounded-md px-3 py-2 w-40"
              value={toastDuration}
              onChange={(e) => setToastDuration(e.target.value)}
            />
            <p className="mt-2 text-xs text-gray-500">
              Minimum 500ms. Leave blank to use default (2500ms).
            </p>
            <div className="mt-3">
              <button
                className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700"
                onClick={() => addToast("This is a test toast")}
              >
                Test toast
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={save}
              className="px-5 py-2.5 rounded-md bg-rose-600 text-white hover:bg-rose-700"
            >
              Save settings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
