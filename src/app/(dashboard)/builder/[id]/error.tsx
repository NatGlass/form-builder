"use client";

import { useEffect } from "react";

function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {error.message}
    </div>
  );
}

export default Error;
