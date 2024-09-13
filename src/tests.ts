import { describe, expect, it } from "vitest";
import { eachDayOfInterval, eachHourOfInterval } from "date-fns";
import { tz } from "./tz/index.ts";
import { TZDate } from "./date/index.js";

describe("date-fns integration", () => {
  describe("DST transitions", () => {
    it("skips the DST transitions", () => {
      const interval = {
        start: "2020-03-08T04:00:00.000Z",
        end: "2020-03-08T10:00:00.000Z",
      };

      const hours = [
        "2020-03-08T04:00:00.000Z",
        "2020-03-08T05:00:00.000Z",
        "2020-03-08T06:00:00.000Z",
        "2020-03-08T07:00:00.000Z",
        "2020-03-08T08:00:00.000Z",
        "2020-03-08T09:00:00.000Z",
        "2020-03-08T10:00:00.000Z",
      ];

      const ny = eachHourOfInterval(interval, {
        in: tz("America/New_York"),
      }).map((date) => new Date(+date).toISOString());
      expect(ny).toEqual(hours);

      const sg = eachHourOfInterval(interval, {
        in: tz("Asia/Singapore"),
      }).map((date) => new Date(+date).toISOString());
      expect(sg).toEqual(hours);
    });

    it("doesn't add hour shift on DST transitions", () => {
      const ny = eachDayOfInterval({
        start: new TZDate(2020, 2, 5, "America/New_York"),
        end: new TZDate(2020, 2, 12, "America/New_York"),
      }).map((date) => date.toISOString());
      expect(ny).toEqual([
        "2020-03-05T00:00:00.000-05:00",
        "2020-03-06T00:00:00.000-05:00",
        "2020-03-07T00:00:00.000-05:00",
        "2020-03-08T00:00:00.000-05:00",
        "2020-03-09T00:00:00.000-04:00",
        "2020-03-10T00:00:00.000-04:00",
        "2020-03-11T00:00:00.000-04:00",
        "2020-03-12T00:00:00.000-04:00",
      ]);

      const sg = eachDayOfInterval({
        start: new TZDate(2020, 2, 5, "Asia/Singapore"),
        end: new TZDate(2020, 2, 12, "Asia/Singapore"),
      }).map((date) => date.toISOString());
      expect(sg).toEqual([
        "2020-03-05T00:00:00.000+08:00",
        "2020-03-06T00:00:00.000+08:00",
        "2020-03-07T00:00:00.000+08:00",
        "2020-03-08T00:00:00.000+08:00",
        "2020-03-09T00:00:00.000+08:00",
        "2020-03-10T00:00:00.000+08:00",
        "2020-03-11T00:00:00.000+08:00",
        "2020-03-12T00:00:00.000+08:00",
      ]);
    });
  });
});
