import { TZDate, tzOffset } from "../../../src/index.ts";

{
  const date = new Date(2022, 2, 13);
  assertEqual(tzOffset("Asia/Singapore", date), 480);
  assertEqual(tzOffset("Asia/Katmandu", date), 345);
}
{
  const date = new TZDate(2022, 2, 13, "Asia/Singapore");
  assertEqual(date.toISOString(), "2022-03-13T00:00:00.000+08:00");
  assertEqual(
    date.toTimeString(),
    "00:00:00 GMT+0800 (Singapore Standard Time)"
  );
}

function assertEqual<Type>(received: Type, expected: Type) {
  if (received === expected) return;
  throw new Error(`Expected "${expected}", but got "${received}"`);
}
