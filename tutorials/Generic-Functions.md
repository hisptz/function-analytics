
## Generic Data Analytics Examples

For every dhis2 instances, there will always exist analytics use cases that are very advanced or non-standard to be directly supported by standard analytics.

The following and the standard analytics use cases that are not supported by analytics

1. Predictors, producing runtime values. By accessing them via api allows function indicator to compute and visualizing preditor at client side, minizing analytics runtime, improve server performance, keep down significant database over long time, and exercise distributed computing where majority of work gets outsourced to client computers from servers)

2. Limiting reporting rates to 100% or spotting reporting rates that would have exceeded 100% (for cases where completeness may exceed 100% e.g. when last month 25 facilities all reported and this month only 24 are supposed to report, so when plotting chart, while this month completeness will be 24/24 last month will be 25/24 due to form un-assignment. limiting 100%, helps keep sanity in face of design limitations of dhis)

3. Dataset and Program Completeness by mandatory or all input fields or by skip logic rules (where completeness will be measured as percentage of cells expecting values against cells that do have them), this is every useful completeness measurement especially for tracker completeness and timeliness

4. Percent of facilities composition by certain criteria, this is organization unit analytics for measuring percentage distribution of facility with given criteria to all facilities. Example use case is percentage facilities with 100% completeness in dataset, I.e. when a facility doesn't have 100% completeness doesn't get counted. This logic is very common, it varies in the criterias used. Most common use case for this, is facility with entire package of tracer commodities, or facilities with half the entire package, or with stockout.

5. Reporting readiness time, Measure of readiness/sharpness of reporting, prior to reporting deadline. Where readiness is measured as number of days remained before deadline to total number of days available for data entry. Where the days from date when dataset was completed devided by total available days to deadline of the dataset, this helps challenge and incentivise sharpness and readiness beyond timeliness of data even further, improving guarantee for fresh and quality figures.