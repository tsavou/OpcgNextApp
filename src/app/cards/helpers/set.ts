export function getSetImage(setId: string) {
  const id = String(setId).toLowerCase().replace("-", "");

  return `https://en.onepiece-cardgame.com/images/top/pickupbnr/bnr_products_${id}.png`;
}

export function getSetColor(setId: string) {
  const colors: Record<string, string> = {
    "OP-01": "from-blue-900 to-blue-800",
    "OP-02": "from-red-900 to-red-800",
    "OP-03": "from-cyan-950 to-cyan-800",
    "OP-04": "from-yellow-500 to-yellow-600",
    "OP-05": "from-violet-300 to-violet-200",
    "OP-06": "from-stone-600 to-stone-500",
    "OP-07": "from-yellow-300 to-yellow-200",
    "OP-08": "from-teal-800 to-teal-700",
    "OP-09": "from-gray-900 to-gray-800",
    "OP-10": "from-indigo-900 to-indigo-800",
    "OP-11": "from-pink-900 to-pink-800",
    "OP-12": "from-green-800 to-green-700",
    "OP-13": "from-red-700 to-red-600",

    "EB-01": "from-pink-200 to-pink-100",
    "EB-02": "from-orange-100 to-orange-50",

    "PRB-01": "from-amber-500 to-amber-400",
    "PRB-02": "from-orange-700 to-orange-600",
  };

  return colors[setId] || "from-gray-500 to-gray-600";
}
