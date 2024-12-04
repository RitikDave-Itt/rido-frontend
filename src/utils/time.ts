export function formatUTCPlus530(date:Date) {
    const utcDate = new Date(date);
    utcDate.setMinutes(utcDate.getMinutes() + 330);
    return utcDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  